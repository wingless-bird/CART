import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); 

  // 🔐 AUTH STATE: Remember login session across browser tab reloads
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  useEffect(() => {
    fetchInventory();
    fetchSalesRecords();
  }, []);

  // ==========================================
  // 📦 PRODUCT INVENTORY CRUD LOGIC
  // ==========================================

  // 1. READ PRODUCTS: Pull all inventory rows immediately on mount
  const fetchInventory = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error("Error fetching inventory:", error.message);
      return;
    }
    console.log("📥 Live Supabase Inventory Payload:", data);
    if (data) setInventory(data);
  };

  // 2. CREATE PRODUCT: Let Supabase manage incremental IDs automatically
  const addItem = async (newItem) => {
    const { data, error } = await supabase.from('products').insert([newItem]).select();
    if (error) {
      console.error("Error adding item:", error.message);
      return;
    }
    // FIX: Pull out the first item object safely from response array payload
    if (data && data.length > 0) {
      setInventory((prev) => [...prev, data[0]]);
    }
  };

  // 3. UPDATE PRODUCT: Force ID matching parameter evaluation as a clean integer
  const updateItem = async (updatedItem) => {
    const numericId = parseInt(updatedItem.id, 10);
    const { error } = await supabase.from('products')
      .update({
        name: updatedItem.name,
        category: updatedItem.category,
        price: parseFloat(updatedItem.price),
        icon: updatedItem.icon
      })
      .eq('id', numericId);

    if (error) {
      console.error("Error updating item:", error.message);
    } else {
      setInventory((prev) => prev.map(i => i.id === numericId ? updatedItem : i));
    }
  };

  // 4. DELETE PRODUCT: Force numerical cleaning before making network queries
  const deleteItem = async (id) => {
    const numericId = parseInt(id, 10);
    const { error } = await supabase.from('products').delete().eq('id', numericId);
    
    if (error) {
      console.error("Error deleting item:", error.message);
    } else {
      setInventory((prev) => prev.filter(i => i.id !== numericId));
    }
  };

  // ==========================================
  // 🛒 CUSTOMER SHOPPING CART LOGIC
  // ==========================================

  // Only add item once, increment quantity if it already exists
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Adjust quantity up or down directly from the cart layout
  const updateCartQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) 
    );
  };

  // Remove an item entirely from the checkout basket
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ==========================================
  // 📈 CLOUD SALES TRANSACTIONS LOGIC
  // ==========================================

  const fetchSalesRecords = async () => {
    const { data, error } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
    if (error) console.error("Error fetching sales history records:", error.message);
    if (data) setSalesRecords(data);
  };

  const processCheckout = async (orderAmount) => {
    if (cart.length === 0) return alert("Your cart is empty!");
    
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const newInvoiceRow = {
      amount: parseFloat(orderAmount),
      items_count: totalItemsCount
    };

    const { data, error } = await supabase.from('sales').insert([newInvoiceRow]).select();
    if (error) {
      console.error("Failed to commit checkout trace log upstream:", error.message);
      return;
    }

    if (data && data.length > 0) {
      setSalesRecords((prev) => [data[0], ...prev]);
    }
    setCart([]);
    alert("Transaction completed successfully and synchronized to cloud!");
  };

  const runningSalesTotal = salesRecords.reduce((sum, record) => sum + parseFloat(record.amount || 0), 0);

  // ==========================================
  // 🔐 SECURE ADMIN AUTHENTICATION UTILITIES
  // ==========================================

  // 1. Login verification function checking records matching cloud credentials
  const loginAdmin = async (username, password) => {
    const { data, error } = await supabase
      .from('admin_auth')
      .select('*')
      .eq('username', username.trim())
      .eq('password', password);

    if (error) {
      console.error("Auth server connection error:", error.message);
      return false;
    }

    if (data && data.length > 0) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  // 2. Clear token tracking structures from internal machine local memory
  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
  };

  // 3. 🔐 FIXED: Force overwrites both columns on row ID #1 instantly
  const changeAdminPassword = async (newUsername, newPassword) => {
    const cleanUsername = newUsername.trim() || 'admin';

    const { data, error } = await supabase
      .from('admin_auth')
      .update({ 
        username: cleanUsername, 
        password: newPassword 
      })
      .eq('id', 1) // 👈 Direct Primary Key link removes all query blocks
      .select();

    if (error) {
      console.error("Failed to update security credentials:", error.message);
      alert(`Database Error: ${error.message}`);
      return false;
    }

    alert("Administrative username and password updated successfully in the cloud!");
    return true;
  };

  return (
    <InventoryContext.Provider value={{ 
      inventory, salesRecords, salesTotal: runningSalesTotal, searchQuery, setSearchQuery, 
      addItem, updateItem, deleteItem, addToCart, cart, updateCartQuantity, removeFromCart, processCheckout,
      isAdminLoggedIn, loginAdmin, logoutAdmin, changeAdminPassword 
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
