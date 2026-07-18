import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_BOXES = [
  {
    name: "Food & Drinks",
    path: "/food-drinks",
    icon: "🥤",
    category: "Food & Drinks"
  },
  {
    name: "Vegetables",
    path: "/vegetables",
    icon: "🥦",
    category: "Vegetables"
  },
  {
    name: "Fruits",
    path: "/fruits",
    icon: "🍎",
    category: "Fruits"
  },
  {
    name: "Groceries",
    path: "/groceries",
    icon: "🛒",
    category: "Groceries"
  }
];

export default function CategoryBoxes() {
  return (
    <section className="category-grid">
      {CATEGORY_BOXES.map((box) => (
        <Link
          key={box.path}
          to={box.path}
          state={{
            category: box.category
          }}
          className="category-card"
        >
          <div className="category-content">
            <span className="category-icon">
              {box.icon}
            </span>

            <h4>
              {box.name}
            </h4>

            <p>
              View Products →
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}