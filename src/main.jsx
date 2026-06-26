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

function AdminRouteGuard({ children }) {
  const { isAdminLoggedIn } = useInventory();
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
}

const router = createBrowserRouter([
  {
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
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: <AdminRouteGuard><InventoryDashboard /></AdminRouteGuard>, 
    children: [
      { index: true, element: <CategoryView title="Global Dashboard" category="All" /> },
      { path: "food-drinks", element: <CategoryView title="Food & Drinks" category="Food & Drinks" /> },
      { path: "vegetables", element: <CategoryView title="Vegetables" category="Vegetables" /> },
      { path: "fruits", element: <CategoryView title="Fruits" category="Fruits" /> },
      { path: "groceries", element: <CategoryView title="Groceries" category="Groceries" /> },
      { path: "sales", element: <SalesHistoryView /> },
      { path: "settings", element: <AdminLogin /> }
    ]
  },
  {
    path: "*",
    element: <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}><h2>404: Page Not Found</h2></div>
  }
]);

/* 📱 MOBILE-FIRST MASTER INJECTION LAYER */
if (typeof document !== 'undefined') {
  // 1. Force explicit responsive viewport constraints to prevent mobile browser layout zooming anomalies
  let metaViewport = document.querySelector('meta[name="viewport"]');
  if (!metaViewport) {
    metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    document.head.appendChild(metaViewport);
  }
  metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no';

  // 2. Inject global mobile-first core resets and fluid structural overrides directly into the document root head
  const mobileStyles = document.createElement('style');
  mobileStyles.innerHTML = `
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    html, body { 
      width: 100%; 
      max-width: 100%; 
      overflow-x: hidden; 
      margin: 0; 
      padding: 0; 
      -webkit-font-smoothing: antialiased; 
      touch-action: manipulation;
    }
    /* Mobile-first scaling grid adjustments for cards and sliders across cellular breaks */
    @media (max-width: 768px) {
      main { padding: 16px 12px !important; }
      h1 { font-size: calc(1.5rem + 1vw) !important; }
      h2 { font-size: calc(1.3rem + 1vw) !important; }
      h3 { font-size: calc(1.1rem + 1vw) !important; }
      p, span, input, button, select, td, th { font-size: 14px !important; }
      
      /* Enforce full wide container expansion across tight screen widths */
      div, section, header, nav, footer, aside, table { 
        max-width: 100% !important; 
        box-sizing: border-box !important;
      }
      
      /* Scale buttons to match finger tap size target dimensions for accessibility comfort */
      button, input, select, a { 
        min-height: 44px !important; 
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      /* Fluid flexbox wraps to optimize stacked rows for slim orientation aspect ratios */
      div[style*="display: flex"], div[style*="display:flex"] {
        flex-wrap: wrap !important;
      }
      
      /* Force tables to render horizontal scroll mechanisms smoothly for clear row column checks */
      div[style*="overflowX: auto"], div[style*="overflow-x: auto"], table {
        -webkit-overflow-scrolling: touch !important;
        display: block !important;
        width: 100% !important;
      }
    }
  `;
  document.head.appendChild(mobileStyles);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryProvider>
      <RouterProvider router={router} />
    </InventoryProvider>
  </React.StrictMode>
);
