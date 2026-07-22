import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/store/Navbar";
import Footer from "../components/store/Footer";
import CartDrawer from "../components/CartDrawer";

export default function StoreLayout() {

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (

    <div className="store-app">

      <div className="announcement-bar">
        🚚 Free Delivery over 2000 PKR &nbsp;•&nbsp; Mon – Sat &nbsp;•&nbsp; Next Day Delivery
      </div>

      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main className="store-content">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

    </div>

  );

}