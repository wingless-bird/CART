import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";

const NAV_LINKS = [
  {
    label: "Home",
    to: "/",
    clearSearch: true
  },
  {
    label: "Food & Drinks",
    to: "/food-drinks"
  },
  {
    label: "Vegetables",
    to: "/vegetables"
  },
  {
    label: "Fruits",
    to: "/fruits"
  },
  {
    label: "Groceries",
    to: "/groceries"
  }
];

export default function Navbar({
  onCartOpen
}) {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const {
    cart = [],
    searchQuery = "",
    setSearchQuery
  } = useInventory();

  const totalItems = useMemo(() => {

    return cart.reduce(

      (total, item) =>
        total + (item.quantity || 0),

      0

    );

  }, [cart]);

  const closeMenu = () => {

    setMenuOpen(false);

  };

  const goHome = () => {

    setSearchQuery("");

    closeMenu();

  };

  const handleSearch = (e) => {

    if (
      e.key === "Enter" &&
      searchQuery.trim()
    ) {

      e.preventDefault();

      navigate("/search");

      closeMenu();

    }

  };

  return (

    <header className="navbar">

      <div className="container navbar-container">

        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen((open) => !open)
          }
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <Link
          to="/"
          className="logo"
          onClick={goHome}
        >
          Fresh<span>Mart</span>
        </Link>

        <nav
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
        >

          {NAV_LINKS.map((link) => (

            <Link
              key={link.to}
              to={link.to}
              onClick={
                link.clearSearch
                  ? goHome
                  : closeMenu
              }
            >
              {link.label}
            </Link>

          ))}

        </nav>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            onKeyDown={handleSearch}
          />

        </div>

        <div className="nav-actions">

          <Link
            to="/admin"
            className="desk-btn"
            onClick={closeMenu}
          >
            Admin
          </Link>

          <button
            className="cart-btn"
            onClick={onCartOpen}
          >
            🛒 {totalItems}
          </button>

        </div>

      </div>

    </header>

  );

}