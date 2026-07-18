import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { InventoryProvider } from "./context/InventoryContext";
import { router } from "./App";

import "./Styles/app.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <InventoryProvider>

      <RouterProvider router={router}/>

    </InventoryProvider>

  </React.StrictMode>

);