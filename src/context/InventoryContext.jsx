import React,{
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const InventoryContext = createContext();

const API_BASE =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`;

export function InventoryProvider({ children }) {

  // ==========================================================
  // STATE
  // ==========================================================

  const [inventory, setInventory] = useState([]);

  const [salesRecords, setSalesRecords] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState([]);

  // JWT Session State — token lives in localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => !!localStorage.getItem("adminToken")
  );

  // Kept so AdminLogin.jsx's existing authLoading checks still work —
  // there's nothing async to wait on with Bearer auth, so this
  // resolves immediately.
  const [authLoading, setAuthLoading] = useState(false);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchInventory();

    fetchSalesRecords();

  }, []);

  // ==========================================================
  // AUTH HEADER HELPER
  // ==========================================================

  const authHeader = () => {

    const token = localStorage.getItem("adminToken");

    return token
      ? { Authorization: `Bearer ${token}` }
      : {};

  };

  // ==========================================================
  // FETCH INVENTORY
  // ==========================================================

  const fetchInventory = async () => {

    try {

      const response = await fetch(
        `${API_BASE}/products`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setInventory(data);

    } catch (error) {

      console.error(
        "Inventory Fetch Error:",
        error
      );

    }

  };

  // ==========================================================
  // ADD PRODUCT
  // ==========================================================

  const addItem = async (formData) => {

    try {

      const response = await fetch(
        `${API_BASE}/products`,
        {
          method: "POST",

          headers: {
            ...authHeader()
          },

          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();

      setInventory((prev) => [
        ...prev,
        data
      ]);

    } catch (error) {

      console.error(
        "Add Product Error:",
        error
      );

    }

  };

  // ==========================================================
  // UPDATE PRODUCT
  // ==========================================================

  const updateItem = async (item) => {

    try {

      const response = await fetch(
        `${API_BASE}/products/${item.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            ...authHeader()
          },

          body: JSON.stringify(item)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updated = await response.json();

      setInventory((prev) =>

        prev.map((product) =>

          product.id === updated.id
            ? updated
            : product

        )

      );

    } catch (error) {

      console.error(
        "Update Product Error:",
        error
      );

    }

  };

  // ==========================================================
  // DELETE PRODUCT
  // ==========================================================

  const deleteItem = async (id) => {

    try {

      const response = await fetch(
        `${API_BASE}/products/${id}`,
        {
          method: "DELETE",

          headers: {
            ...authHeader()
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setInventory((prev) =>

        prev.filter(
          (item) => item.id !== id
        )

      );

    } catch (error) {

      console.error(
        "Delete Product Error:",
        error
      );

    }

  };

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const addToCart = (item) => {

    const grossAmount = Number(
      item.grossAmount || item.price || 0
    );

    const discount = Number(
      item.discount || 0
    );

    const netAmount = Number(
      item.netAmount ||
      grossAmount -
      (grossAmount * discount) / 100
    );

    const cartItem = {

      ...item,

      grossAmount,

      discount,

      netAmount,

      price: netAmount

    };

    setCart((prev) => {

      const existing = prev.find(
        (product) => product.id === cartItem.id
      );

      if (existing) {

        return prev.map((product) =>

          product.id === cartItem.id
            ? {
                ...product,
                quantity: product.quantity + 1
              }
            : product

        );

      }

      return [

        ...prev,

        {
          ...cartItem,
          quantity: 1
        }

      ];

    });

  };

  // ==========================================================
  // UPDATE CART QUANTITY
  // ==========================================================

  const updateCartQuantity = (id, amount) => {

    setCart((prev) =>

      prev
        .map((item) =>

          item.id === id

            ? item.quantity + amount > 0

              ? {
                  ...item,
                  quantity: item.quantity + amount
                }

              : null

            : item

        )

        .filter(Boolean)

    );

  };

  // ==========================================================
  // REMOVE FROM CART
  // ==========================================================

  const removeFromCart = (id) => {

    setCart((prev) =>

      prev.filter(
        (item) => item.id !== id
      )

    );

  };

  // ==========================================================
  // FETCH SALES RECORDS
  // ==========================================================

  const fetchSalesRecords = async () => {

    try {

      const response = await fetch(
        `${API_BASE}/sales`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch sales records"
        );
      }

      const data = await response.json();

      setSalesRecords(data);

    } catch (error) {

      console.error(
        "Sales Fetch Error:",
        error
      );

      setSalesRecords([]);

    }

  };

  // ==========================================================
  // PROCESS CHECKOUT
  // ==========================================================

  const processCheckout = async () => {

    if (cart.length === 0) return;

    try {

      const payload = {

        items: cart,

        amount: cart.reduce(
          (total, item) =>
            total +
            Number(item.price) * item.quantity,
          0
        ),

        items_count: cart.reduce(
          (total, item) =>
            total + item.quantity,
          0
        )

      };

      const response = await fetch(
        `${API_BASE}/sales`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Checkout failed"
        );
      }

      setSalesRecords((prev) => [
        ...prev,
        data
      ]);

      setCart([]);

      alert("Checkout Successful!");

    } catch (error) {

      console.error(
        "Checkout Error:",
        error
      );

      alert(error.message);

    }

  };

  // ==========================================================
  // ADMIN LOGIN
  // ==========================================================

  const loginAdmin = async (
    username,
    password
  ) => {

    try {

      const response = await fetch(
        `${API_BASE}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        return false;

      }

      localStorage.setItem("adminToken", data.token);

      setIsAdminLoggedIn(true);

      return true;

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      return false;

    }

  };

  // ==========================================================
  // ADMIN LOGOUT
  // ==========================================================

  const logoutAdmin = () => {

    localStorage.removeItem("adminToken");

    setIsAdminLoggedIn(false);

  };

  // ==========================================================
  // CHANGE ADMIN CREDENTIALS
  // ==========================================================

  const changeAdminPassword = async (
    username,
    password
  ) => {

    if (!username || !password) {

      alert(
        "Username and password required."
      );

      return false;

    }

    try {

      const response = await fetch(
        `${API_BASE}/auth/change-credentials`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            ...authHeader()
          },

          body: JSON.stringify({
            newUsername: username,
            newPassword: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data.message ||
          "Failed to update credentials."
        );

        return false;

      }

      alert(
        "Admin credentials updated successfully."
      );

      return true;

    } catch (error) {

      console.error(
        "Credential Update Error:",
        error
      );

      alert("Something went wrong.");

      return false;

    }

  };

  // ==========================================================
  // FILTERED INVENTORY
  // ==========================================================

  const filteredInventory = useMemo(() => {

    const query = searchQuery.trim().toLowerCase();

    if (!query) return inventory;

    return inventory.filter((item) => {

      const name = (item.name || "").toLowerCase();
      const category = (item.category || "").toLowerCase();

      return (
        name.includes(query) ||
        category.includes(query)
      );

    });

  }, [inventory, searchQuery]);

  // ==========================================================
  // CONTEXT PROVIDER
  // ==========================================================

  return (

    <InventoryContext.Provider
      value={{

        inventory,

        filteredInventory,

        salesRecords,

        salesTotal: salesRecords.reduce(
          (total, record) =>
            total + Number(record.amount || 0),
          0
        ),

        cart,

        searchQuery,

        setSearchQuery,

        addItem,

        updateItem,

        deleteItem,

        addToCart,

        updateCartQuantity,

        removeFromCart,

        processCheckout,

        isAdminLoggedIn,

        authLoading,

        loginAdmin,

        logoutAdmin,

        changeAdminPassword

      }}
    >

      {children}

    </InventoryContext.Provider>

  );

}

// ==========================================================
// CUSTOM HOOK
// ==========================================================

export const useInventory = () =>
  useContext(InventoryContext);