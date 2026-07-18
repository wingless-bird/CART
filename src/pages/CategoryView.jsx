import React, { useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";
import {
  getProductImage,
  PLACEHOLDER_IMAGE
} from "../utils/imageHelper";

export default function CategoryView({
  title,
  category
}) {

  const {
    inventory,
    addItem,
    updateItem,
    deleteItem,
    salesTotal
  } = useInventory();

  // ==========================================================
  // ADD PRODUCT STATE
  // ==========================================================

  const [newName, setNewName] = useState("");

  const [newGrossAmount, setNewGrossAmount] =
    useState("");

  const [newDiscount, setNewDiscount] =
    useState(0);

  const [newNetAmount, setNewNetAmount] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [newCategory, setNewCategory] =
    useState(
      category === "All"
        ? "Food & Drinks"
        : category
    );

  useEffect(() => {

    setNewCategory(
      category === "All"
        ? "Food & Drinks"
        : category
    );

  }, [category]);

  useEffect(() => {

    const gross =
      Number(newGrossAmount || 0);

    const discount =
      Number(newDiscount || 0);

    const net =
      gross -
      (gross * discount) / 100;

    setNewNetAmount(
      net > 0
        ? net.toFixed(2)
        : ""
    );

  }, [
    newGrossAmount,
    newDiscount
  ]);

  // ==========================================================
  // EDIT PRODUCT STATE
  // ==========================================================

  const [editingId, setEditingId] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editGrossAmount,
    setEditGrossAmount] =
    useState("");

  const [editDiscount,
    setEditDiscount] =
    useState(0);

  const [editNetAmount,
    setEditNetAmount] =
    useState("");

  useEffect(() => {

    const gross =
      Number(editGrossAmount || 0);

    const discount =
      Number(editDiscount || 0);

    const net =
      gross -
      (gross * discount) / 100;

    setEditNetAmount(
      net > 0
        ? net.toFixed(2)
        : ""
    );

  }, [
    editGrossAmount,
    editDiscount
  ]);

  // ==========================================================
  // FILTER PRODUCTS
  // ==========================================================

  const filteredItems =
    category === "All"
      ? inventory
      : inventory.filter(
          (item) =>
            item.category === category
        );

  // ==========================================================
  // CREATE PRODUCT
  // ==========================================================

  const handleCreate = async (e) => {

    e.preventDefault();

    if (
      !newName ||
      !newGrossAmount
    ) {

      return alert(
        "Please fill out all product parameters."
      );

    }

    const gross =
      Number(newGrossAmount);

    const discount =
      Number(newDiscount || 0);

    const net =
      gross -
      (gross * discount) / 100;

    const formData =
      new FormData();

    formData.append(
      "name",
      newName
    );

    formData.append(
      "category",
      newCategory
    );

    formData.append(
      "grossAmount",
      gross
    );

    formData.append(
      "discount",
      discount
    );

    formData.append(
      "netAmount",
      net
    );

    formData.append(
      "price",
      net
    );

    if (imageFile) {

      formData.append(
        "image",
        imageFile
      );

    }

    setIsUploading(true);

    try {

      await addItem(formData);

      setNewName("");
      setNewGrossAmount("");
      setNewDiscount(0);
      setNewNetAmount("");
      setImageFile(null);

      e.target.reset();

    } catch (err) {

      console.error(err);

    } finally {

      setIsUploading(false);

    }

  };

  // ==========================================================
  // START EDIT
  // ==========================================================

  const startEdit = (item) => {

    setEditingId(item.id);

    setEditName(item.name);

    setEditGrossAmount(
      String(
        item.grossAmount ??
        item.price ??
        ""
      )
    );

    setEditDiscount(
      Number(item.discount || 0)
    );

  };

  // ==========================================================
  // SAVE EDIT
  // ==========================================================

  const handleSaveUpdate = async (
    id,
    baseItem
  ) => {

    if (
      !editName ||
      !editGrossAmount
    ) return;

    const gross =
      Number(editGrossAmount);

    const discount =
      Number(editDiscount || 0);

    const net =
      gross -
      (gross * discount) / 100;

    await updateItem({

      ...baseItem,

      id,

      name: editName,

      grossAmount: gross,

      discount,

      netAmount: net,

      price: net

    });

    setEditingId(null);

  };
    // ==========================================================
  // DELETE PRODUCT
  // ==========================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    await deleteItem(id);

  };

  // ==========================================================
  // JSX
  // ==========================================================

  return (

    <div className="admin-category-page">

      <div className="admin-category-header">

        <h2 className="admin-category-title">
          {title}
        </h2>

        <div className="admin-category-sales">
          Total Sales:
          <strong>
            {" "}
            PKR {Number(salesTotal).toFixed(2)}
          </strong>
        </div>

      </div>

      <form
        className="admin-product-form"
        onSubmit={handleCreate}
      >

        <input
          type="text"
          placeholder="Product Name"
          value={newName}
          onChange={(e) =>
            setNewName(e.target.value)
          }
          required
        />

        <select
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
        >

          <option>
            Food & Drinks
          </option>

          <option>
            Vegetables
          </option>

          <option>
            Fruits
          </option>

          <option>
            Groceries
          </option>

        </select>

        <input
          type="number"
          placeholder="Gross Price"
          value={newGrossAmount}
          onChange={(e) =>
            setNewGrossAmount(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Discount %"
          value={newDiscount}
          onChange={(e) =>
            setNewDiscount(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Net Price"
          value={newNetAmount}
          readOnly
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
        />

        <button
          type="submit"
          disabled={isUploading}
        >
          {isUploading
            ? "Uploading..."
            : "Add Product"}
        </button>

      </form>

            <div className="admin-products-table">

        <table>

          <thead>

            <tr>

              <th>Image</th>

              <th>Name</th>

              <th>Category</th>

              <th>Gross</th>

              <th>Discount</th>

              <th>Net</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredItems.map((item) => (

              <tr key={item.id}>

                <td>

                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    className="admin-product-image"
                    onError={(e) => {
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />

                </td>

                <td>

                  {editingId === item.id ? (

                    <input
                      type="text"
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                    />

                  ) : (

                    item.name

                  )}

                </td>

                <td>

                  {item.category}

                </td>

                <td>

                  {editingId === item.id ? (

                    <input
                      type="number"
                      value={editGrossAmount}
                      onChange={(e) =>
                        setEditGrossAmount(
                          e.target.value
                        )
                      }
                    />

                  ) : (

                    Number(
                      item.grossAmount ??
                      item.price ??
                      0
                    ).toFixed(2)

                  )}

                </td>

                <td>

                  {editingId === item.id ? (

                    <input
                      type="number"
                      value={editDiscount}
                      onChange={(e) =>
                        setEditDiscount(
                          e.target.value
                        )
                      }
                    />

                  ) : (

                    `${Number(
                      item.discount || 0
                    )}%`

                  )}

                </td>

                <td>

                  {editingId === item.id

                    ? editNetAmount

                    : Number(
                        item.netAmount ??
                        item.price ??
                        0
                      ).toFixed(2)}

                </td>

                <td>                  {editingId === item.id ? (

                    <>

                      <button
                        className="admin-save-btn"
                        onClick={() =>
                          handleSaveUpdate(
                            item.id,
                            item
                          )
                        }
                      >
                        Save
                      </button>

                      <button
                        className="admin-cancel-btn"
                        onClick={() =>
                          setEditingId(null)
                        }
                      >
                        Cancel
                      </button>

                    </>

                  ) : (

                    <button
                      className="admin-edit-btn"
                      onClick={() =>
                        startEdit(item)
                      }
                    >
                      Edit
                    </button>

                  )}

                  <button
                    className="admin-delete-btn"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
      