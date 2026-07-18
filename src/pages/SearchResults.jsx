import React from "react";
import { useInventory } from "../context/InventoryContext";
import {
  getProductImage,
  PLACEHOLDER_IMAGE
} from "../utils/imageHelper";

export default function SearchResults() {

  const {
    filteredInventory,
    searchQuery,
    addToCart,
    cart
  } = useInventory();

  const query = searchQuery.trim();

  // ==========================================================
  // EMPTY SEARCH
  // ==========================================================

  if (!query) {

    return (

      <div className="search-empty-page">

        <div className="search-icon">
          🔍
        </div>

        <h2 className="search-empty-title">
          Search Products
        </h2>

        <p className="search-empty-text">
          Start typing in the search box to find products.
        </p>

        <p className="search-suggestions">
          Try searching for:
          <br />
          🍎 Fruits
          <br />
          🥦 Vegetables
          <br />
          🥤 Juice
          <br />
          🍞 Bread
        </p>

      </div>

    );

  }

  // ==========================================================
  // SEARCH RESULTS
  // ==========================================================

  return (

    <div className="category-products-page">

      <h2 className="search-results-title">
        Search Results for "{query}"
      </h2>

      {filteredInventory.length === 0 ? (

        <div className="search-no-results">

          <div className="search-icon">
            😕
          </div>

          <h3 className="search-no-results-title">
            No products found
          </h3>

          <p className="search-no-results-text">
            We couldn't find anything matching "{query}".
          </p>

        </div>

      ) : (

        <div className="category-products-grid">

          {filteredInventory.map((product) => {

            const cartItem = cart.find(
              (item) =>
                String(item.id) === String(product.id)
            );

            return (

              <div
                key={product.id}
                className="product-card"
              >

                <img
                  className="product-card-image"
                  src={getProductImage(product)}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />

                <span className="product-card-category">
                  {product.category}
                </span>

                <h3 className="product-card-name">
                  {product.name}
                </h3>

                <strong className="product-card-price">
                  PKR {Number(product.price).toFixed(2)}
                </strong>

                <button
                  className={
                    cartItem
                      ? "product-card-btn in-cart"
                      : "product-card-btn"
                  }
                  onClick={() => addToCart(product)}
                >
                  {cartItem
                    ? `Add More (${cartItem.quantity})`
                    : "Add to Cart"}
                </button>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}