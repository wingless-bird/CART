import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import InventoryDashboard from './pages/InventoryDashboard';
import CategoryView from './pages/CategoryView';

const router = createBrowserRouter([
  {
    // The base dashboard layout contains the sidebar
    path: "/",
    element: <InventoryDashboard />, 
    children: [
      {
        // Default view shows all live database items
        index: true, 
        element: <CategoryView title="Global Dashboard" category="All" />
      },
      {
        path: "food-drinks",
        element: <CategoryView title="Food & Drinks" category="Food & Drinks" />
      },
      {
        path: "vegetables",
        element: <CategoryView title="Vegetables" category="Vegetables" />
      },
      {
        path: "fruits",
        element: <CategoryView title="Fruits" category="Fruits" />
      },
      {
        // Catch-all 404 route for misspelled paths inside the layout
        path: "*",
        element: <div style={{ padding: '20px', color: '#ef4444' }}><h3>404: Page Not Found</h3></div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
