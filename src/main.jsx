import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import StoreLayout from './pages/StoreLayout';
import StoreHome from './pages/StoreHome';
import CategoryProductsView from './pages/CategoryProductsView';
import InventoryDashboard from './pages/InventoryDashboard';
import CategoryView from './pages/CategoryView';
import SalesHistoryView from './pages/SalesHistoryView'; 
import AdminLogin from './pages/AdminLogin';

// 🔒 ROUTE GUARD LAYER: Safe conditional redirection
function AdminRouteGuard({ children }) {
  const { isAdminLoggedIn } = useInventory();
  // If not authenticated, instantly redirect to the standalone public login page
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
}

const router = createBrowserRouter([
  {
    // ==========================================
    // 🛒 CUSTOMER STOREFRONT PORTAL
    // ==========================================
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <StoreHome /> },
      { path: "food-drinks", element: <CategoryProductsView title="Fresh Food & Drinks" category="Food & Drinks" /> },
      { path: "vegetables", element: <CategoryProductsView title="Organic Vegetables" category="Vegetables" /> },
      { path: "fruits", element: <CategoryProductsView title="Sweet & Fresh Fruits" category="Fruits" /> },
      { path: "groceries", element: <CategoryProductsView title="Daily Groceries" category="Groceries" /> },
    ]
  },
  {
    // ==========================================
    // 🔑 STANDALONE PUBLIC LOGIN ROUTE
    // ==========================================
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    // ==========================================
    // 🔐 SECURED BACK-OFFICE ADMINISTRATIVE AREA
    // ==========================================
    path: "/admin",
    element: <AdminRouteGuard><InventoryDashboard /></AdminRouteGuard>, 
    children: [
      { index: true, element: <CategoryView title="Global Dashboard" category="All" /> },
      { path: "food-drinks", element: <CategoryView title="Food & Drinks" category="Food & Drinks" /> },
      { path: "vegetables", element: <CategoryView title="Vegetables" category="Vegetables" /> },
      { path: "fruits", element: <CategoryView title="Fruits" category="Fruits" /> },
      { path: "groceries", element: <CategoryView title="Groceries" category="Groceries" /> },
      { path: "sales", element: <SalesHistoryView /> },
      { path: "settings", element: <AdminLogin /> } // Re-used for password edits once inside
    ]
  },
  {
    path: "*",
    element: <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}><h2>404: Page Not Found</h2></div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryProvider>
      <RouterProvider router={router} />
    </InventoryProvider>
  </React.StrictMode>
);
