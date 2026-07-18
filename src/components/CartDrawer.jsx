import React, { useMemo } from "react";
import { useInventory } from "../context/InventoryContext";
import {
  getProductImage,
  PLACEHOLDER_IMAGE
} from "../utils/imageHelper";

const TAX_RATE = 0.19;
const DELIVERY_FEE = 200;
const CURRENCY = "PKR";

export default function CartDrawer({
  isOpen,
  onClose
}) {

  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    processCheckout
  } = useInventory();

  const {
    subtotal,
    tax,
    deliveryFee,
    grandTotal
  } = useMemo(() => {

    const subtotal = cart.reduce(

      (total, item) =>
        total +
        Number(item.price || 0) *
        item.quantity,

      0

    );

    const tax = subtotal * TAX_RATE;

    const deliveryFee =
      cart.length > 0
        ? DELIVERY_FEE
        : 0;

    return {

      subtotal,

      tax,

      deliveryFee,

      grandTotal:
        subtotal +
        tax +
        deliveryFee

    };

  }, [cart]);

  const handlePaymentSubmit = async () => {

    await processCheckout();

    onClose();

  };

  if (!isOpen) return null;

  return (

    <div
      className="cart-backdrop"
      onClick={onClose}
    >

      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >

        <header className="cart-header">

          <h2 className="cart-title">
            🛍️ Review Order
          </h2>

          <button
            className="cart-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </header>

        <div className="cart-item-list">

          {

            cart.length === 0 ? (

              <p className="cart-empty">
                Your shopping cart basket is empty.
              </p>

            ) : (

              cart.map((item) => (

                <div
                  key={item.id}
                  className="cart-item-row"
                >

                  <div className="cart-item-info">

                    <img
                      className="cart-item-image"
                      src={getProductImage(item)}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          PLACEHOLDER_IMAGE;
                      }}
                    />

                    <div>

                      <h4 className="cart-item-name">
                        {item.name}
                      </h4>

                      <span className="cart-item-price">
                        {CURRENCY} {Number(item.price).toFixed(2)}
                      </span>

                    </div>

                  </div>

                  <div className="cart-item-actions">

                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          -1
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          1
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="cart-remove-btn"
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </div>

              ))

            )

          }

        </div>

        {

          cart.length > 0 && (

            <div className="cart-footer">

              <div className="cart-bill-row">

                <span>
                  Items Subtotal:
                </span>

                <span>
                  {CURRENCY} {subtotal.toFixed(2)}
                </span>

              </div>

              <div className="cart-bill-row">

                <span>
                  Estimated Tax (19%):
                </span>

                <span>
                  {CURRENCY} {tax.toFixed(2)}
                </span>

              </div>

              <div className="cart-bill-row">

                <span>
                  Delivery Fee:
                </span>

                <span>
                  {CURRENCY} {deliveryFee.toFixed(2)}
                </span>

              </div>

              <div className="cart-total-row">

                <span>
                  Total Bill:
                </span>

                <span>
                  {CURRENCY} {grandTotal.toFixed(2)}
                </span>

              </div>

              <button
                className="cart-checkout-btn"
                onClick={handlePaymentSubmit}
              >
                Proceed to Secure Checkout
              </button>

            </div>

          )

        }

      </div>

    </div>

  );

}