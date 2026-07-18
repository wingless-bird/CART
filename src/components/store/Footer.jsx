import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-column">

          <h2 className="footer-logo">
            🌱 Fresh<span>Mart</span>
          </h2>

          <p>
            FreshMart delivers farm-fresh vegetables, fruits,
            beverages and groceries directly to your doorstep
            with premium quality and fast delivery.
          </p>

        </div>

        <div className="footer-column">

          <h3>Shop</h3>

          <Link to="/food-drinks">Food & Drinks</Link>

          <Link to="/vegetables">Vegetables</Link>

          <Link to="/fruits">Fruits</Link>

          <Link to="/groceries">Groceries</Link>

        </div>

        <div className="footer-column">

          <h3>Company</h3>

          <a href="#">About Us</a>

          <a href="#">Privacy Policy</a>

          <a href="#">Terms & Conditions</a>

          <Link to="/admin-login">
            Staff Portal
          </Link>

        </div>

        <div className="footer-column">

          <h3>Contact</h3>

          <p>📍 Rawalpindi, Pakistan</p>

          <p>📞 +92 300 1234567</p>

          <p>✉ support@freshmart.com</p>

          <p>🕘 Mon - Sat | 9:00 AM - 9:00 PM</p>

        </div>

      </div>

      <div className="footer-bottom">

        © {currentYear} FreshMart. All Rights Reserved.

      </div>

    </footer>
  );
}