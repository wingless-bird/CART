// File: src/components/FeaturedProducts.jsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import {
  getProductImage,
  PLACEHOLDER_IMAGE
} from "../utils/imageHelper";

export default function FeaturedProducts() {

  const {
    inventory,
    cart,
    addToCart
  } = useInventory();

  const featuredProducts = useMemo(() => {

    return inventory.filter(
      (item) => Number(item.discount || 0) > 0
    );

  }, [inventory]);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (

    <section className="featured-products">

      <div className="container">

        <div className="featured-header">

          <h2>
            Featured Deals
          </h2>

          <p>
            Save more with today's discounted fresh products.
          </p>

        </div>

        <div className="featured-grid">

          {featuredProducts.map((product) => {

            const cartItem = cart.find(
              (item) =>
                String(item.id) === String(product.id)
            );

            const grossAmount = Number(
              product.grossAmount ||
              product.price ||
              0
            );

            const discount = Number(
              product.discount || 0
            );

            const netAmount =
              product.netAmount
                ? Number(product.netAmount)
                : grossAmount -
                  (grossAmount * discount) / 100;

            return (

              <article
                key={product.id}
                className="featured-card glass"
              >

                <div className="featured-image">

                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />

                  <span className="featured-discount">
                    {discount}% OFF
                  </span>

                </div>

                <div className="featured-body">

                  <span className="featured-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="featured-prices">

                    <span className="old-price">
                      Rs. {grossAmount.toFixed(0)}
                    </span>

                    <span className="new-price">
                      Rs. {netAmount.toFixed(0)}
                    </span>

                  </div>

                  <div className="featured-buttons">

                    <button
                      className="featured-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      {cartItem
                        ? "Added"
                        : "Add to Cart"}
                    </button>

                    <Link
                      to={`/category/${encodeURIComponent(
                        product.category
                      )}`}
                      className="featured-view-btn"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </article>

            );

          })}

        </div>

      </div>

    </section>

  );

}