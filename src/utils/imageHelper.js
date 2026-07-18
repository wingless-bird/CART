// ==========================================================
// SERVER BASE (matches InventoryContext's API_BASE, minus /api)
// ==========================================================

const SERVER_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ==========================================================
// PLACEHOLDER IMAGE
// ==========================================================

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// ==========================================================
// PRODUCT IMAGE
// ==========================================================

export function getProductImage(product) {

  const imageUrl = product?.image_url;

  if (!imageUrl) {
    return PLACEHOLDER_IMAGE;
  }

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${SERVER_BASE}${imageUrl}`;

}

// ==========================================================
// PRODUCT PRICE
// ==========================================================

export function getProductPricing(product) {

  const grossAmount = Number(
    product?.grossAmount ||
    product?.price ||
    0
  );

  const discount = Number(
    product?.discount || 0
  );

  const netAmount =
    product?.netAmount != null
      ? Number(product.netAmount)
      : grossAmount -
        (grossAmount * discount) / 100;

  return {
    grossAmount,
    discount,
    netAmount
  };

}

// ==========================================================
// FEATURED PRODUCTS
// ==========================================================

export function getFeaturedProducts(inventory = []) {

  return inventory.filter(
    (item) => Number(item.discount || 0) > 0
  );

}

// ==========================================================
// FILTER PRODUCTS BY CATEGORY
// ==========================================================

export function filterProductsByCategory(
  inventory = [],
  category = "All"
) {

  if (category === "All") {
    return inventory;
  }

  return inventory.filter((item) =>

    item.category &&
    item.category.trim().toLowerCase() ===
    category.trim().toLowerCase()

  );

}