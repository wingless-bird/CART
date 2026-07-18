// File: src/pages/CategoryProductsView.jsx

import React from "react";
import { useInventory } from "../context/InventoryContext";
import {
  getProductImage,
  PLACEHOLDER_IMAGE
} from "../utils/imageHelper";

export default function CategoryProductsView({
  title,
  category
}) {

  const {
    filteredInventory,
    cart,
    addToCart
  } = useInventory();

  const displayed = filteredInventory.filter((item) => {

    if (category === "All") return true;

    return (
      item.category &&
      item.category.trim().toLowerCase() ===
      category.trim().toLowerCase()
    );

  });

  return (

    <div className="category-products-page">

      <div className="category-products-header">

        <h2 className="category-products-title">
          {title}
        </h2>

        <span className="category-products-count">
          {displayed.length} Items Available
        </span>

      </div>

      {

        displayed.length === 0 ? (

          <p className="category-products-empty">
            No items found matching your filters 🛒
          </p>

        ) : (

          <div className="category-products-grid">

            {

              displayed.map((product) => {

                const cartItem = cart.find(
                  (item) =>
                    String(item.id) ===
                    String(product.id)
                );

                const price = Number(
                  product.price || 0
                );

                return (

                  <div
                    key={product.id}
                    className="product-card"
                  >

                    <div className="product-card-content">

                      <div className="product-card-image-wrapper">

                        <img
                          className="product-card-image"
                          src={getProductImage(product)}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = PLACEHOLDER_IMAGE;
                          }}
                        />

                      </div>

                      <span className="product-card-category">
                        {product.category}
                      </span>

                      <h3 className="product-card-name">
                        {product.name}
                      </h3>

                    </div>

                    <div className="product-card-footer">

                      <div className="product-card-price-row">

                        <span className="product-card-price">
                          PKR {price.toFixed(2)}
                        </span>

                        {

                          cartItem && (

                            <span className="product-card-total">
                              Total: PKR {(price * cartItem.quantity).toFixed(2)}
                            </span>

                          )

                        }

                      </div>

                      <button
                        className={
                          cartItem
                            ? "product-card-btn in-cart"
                            : "product-card-btn"
                        }
                        onClick={() => addToCart(product)}
                      >

                        {

                          cartItem
                            ? `Add More (${cartItem.quantity})`
                            : "Add to Cart"

                        }

                      </button>

                    </div>

                  </div>

                );

              })

            }

          </div>

        )

      }

    </div>

  );

}