import { createBrowserRouter, Navigate } from "react-router-dom";

import { useInventory } from "./context/InventoryContext";

import StoreLayout from "./pages/StoreLayout";
import StoreHome from "./pages/StoreHome";
import CategoryProductsView from "./pages/CategoryProductsView";
import SearchResults from "./pages/SearchResults";
import AdminLogin from "./pages/AdminLogin";
import InventoryDashboard from "./pages/InventoryDashboard";
import CategoryView from "./pages/CategoryView";
import SalesHistoryView from "./pages/SalesHistoryView";

// ==========================================================
// PROTECTED ROUTE
// Waits for JWT session check before redirecting.
// ==========================================================

function ProtectedRoute({ children }) {

  const {
    isAdminLoggedIn,
    authLoading
  } = useInventory();

  // Wait until /auth/me finishes
  if (authLoading) {

    return (

      <div className="admin-loading-screen">

        <h2>
          Checking session...
        </h2>

      </div>

    );

  }

  if (!isAdminLoggedIn) {

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );

  }

  return children;

}
// ==========================================================
// ROUTER
// ==========================================================

export const router = createBrowserRouter([

  // ------------------------------------------------------
  // STOREFRONT
  // ------------------------------------------------------
  {
    path: "/",
    element: <StoreLayout />,
    children: [

      {
        index: true,
        element: <StoreHome />
      },

      {
        path: "food-drinks",
        element: (
          <CategoryProductsView
            title="Food & Drinks"
            category="Food & Drinks"
          />
        )
      },

      {
        path: "vegetables",
        element: (
          <CategoryProductsView
            title="Vegetables"
            category="Vegetables"
          />
        )
      },

      {
        path: "fruits",
        element: (
          <CategoryProductsView
            title="Fruits"
            category="Fruits"
          />
        )
      },

      {
        path: "groceries",
        element: (
          <CategoryProductsView
            title="Groceries"
            category="Groceries"
          />
        )
      },

      {
        path: "search",
        element: <SearchResults />
      },

      {
        path: "admin-login",
        element: <AdminLogin />
      }

    ]
  },

  // ------------------------------------------------------
  // ADMIN (Protected)
  // ------------------------------------------------------
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <InventoryDashboard />
      </ProtectedRoute>
    ),
    children: [

      {
        index: true,
        element: (
          <CategoryView
            title="Global Inventory"
            category="All"
          />
        )
      },

      {
        path: "food-drinks",
        element: (
          <CategoryView
            title="Food & Drinks"
            category="Food & Drinks"
          />
        )
      },

      {
        path: "vegetables",
        element: (
          <CategoryView
            title="Vegetables"
            category="Vegetables"
          />
        )
      },

      {
        path: "fruits",
        element: (
          <CategoryView
            title="Fruits"
            category="Fruits"
          />
        )
      },

      {
        path: "groceries",
        element: (
          <CategoryView
            title="Groceries"
            category="Groceries"
          />
        )
      },

      {
        path: "sales",
        element: <SalesHistoryView />
      },

      {
        path: "settings",
        element: <AdminLogin />
      }

    ]
  },

    // ------------------------------------------------------
  // FALLBACK
  // ------------------------------------------------------
  {
    path: "*",
    element: <Navigate to="/" replace />
  }

]);