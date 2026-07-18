import React, {
  useState,
  useEffect
} from "react";

import {
  NavLink,
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";

import { useInventory } from "../context/InventoryContext";

const NAV_ITEMS = [
  {
    to: "/admin",
    end: true,
    icon: "🏠",
    label: "Global"
  },
  {
    to: "/admin/food-drinks",
    icon: "🥤",
    label: "Food & Drinks"
  },
  {
    to: "/admin/vegetables",
    icon: "🥦",
    label: "Vegetables"
  },
  {
    to: "/admin/fruits",
    icon: "🍎",
    label: "Fruits"
  },
  {
    to: "/admin/groceries",
    icon: "🛒",
    label: "Groceries"
  },
  {
    to: "/admin/sales",
    icon: "📈",
    label: "Total Sales Log"
  },
  {
    to: "/admin/settings",
    icon: "🔒",
    label: "Security Settings"
  }
];

export default function InventoryDashboard() {

  const { logoutAdmin } = useInventory();

  const navigate = useNavigate();

  const [isMobile, setIsMobile] =
    useState(false);

  const [isNavOpen, setIsNavOpen] =
    useState(false);

  useEffect(() => {

    const handleResize = () => {

      const mobile =
        window.innerWidth < 768;

      setIsMobile(mobile);

      if (!mobile) {

        setIsNavOpen(false);

      }

    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>

      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  const handleExitClick = (e) => {

    e.preventDefault();

    logoutAdmin();

    navigate("/");

  };

  const handleNavClick = () => {

    if (isMobile) {

      setIsNavOpen(false);

    }

  };

  return (

    <div className="admin-dashboard">

      <aside className="admin-sidebar">

        <div className="admin-sidebar-top">

          <div className="admin-sidebar-header">

            <div className="admin-dashboard-title">
              📦 Admin Dashboard
            </div>

            <div className="admin-dashboard-subtitle">
              FreshMart Management
            </div>

          </div>

          {

            isMobile && (

              <button
                type="button"
                className="admin-menu-toggle"
                onClick={() =>
                  setIsNavOpen(
                    (prev) => !prev
                  )
                }
                aria-expanded={isNavOpen}
                aria-label="Toggle admin menu"
              >

                {isNavOpen ? "✕" : "☰"}

              </button>

            )

          }

        </div>

        <div
          className={`admin-sidebar-body ${
            isMobile
              ? isNavOpen
                ? "open"
                : "collapsed"
              : ""
          }`}
        >

          <Link
            to="/"
            className="admin-storefront-link"
            onClick={handleNavClick}
          >

            🌐 Go to Public Storefront

          </Link>

          <div className="admin-sidebar-nav">

            {

              NAV_ITEMS.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `admin-nav-link ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }
                >

                  {item.icon} {item.label}

                </NavLink>

              ))

            }

          </div>

          <button
            className="admin-exit-btn"
            onClick={handleExitClick}
          >

            🚪 Exit Portal

          </button>

        </div>

      </aside>

      <main className="admin-main-content">

        <Outlet />

      </main>

    </div>

  );

}