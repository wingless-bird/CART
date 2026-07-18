import React from "react";
import { useInventory } from "../context/InventoryContext";

export default function SalesHistoryView() {
  const { salesRecords, salesTotal } = useInventory();

  return (
    <div className="sales-page">
      <h2 className="sales-title">📊 Live Sales Audit Engine</h2>

      {/* Summary cards */}
      <div className="sales-summary-grid">
        <div className="sales-stat-card">
          <span className="sales-stat-label">
            Total Cumulative Gross Revenue
          </span>
          <h3 className="sales-stat-value sales-stat-revenue">
            PKR {(salesTotal || 0).toFixed(2)}
          </h3>
        </div>

        <div className="sales-stat-card">
          <span className="sales-stat-label">Processed Orders</span>
          <h3 className="sales-stat-value sales-stat-orders">
            {salesRecords.length}
          </h3>
        </div>
      </div>

      {/* Log data */}
      <div className="sales-table-card">
        {salesRecords.length === 0 ? (
          <div className="sales-empty">
            No retail sales tickets recorded yet. Complete customer orders
            from the storefront to generate logs!
          </div>
        ) : (
          <>
            {/* Mobile: stacked cards (shown below 768px) */}
            <div className="sales-cards">
              {salesRecords.map((record) => (
                <div key={record._id} className="sales-record-card">
                  <div className="sales-record-top">
                    <span className="sales-record-id">#TX-{record._id}</span>
                    <span className="sales-record-amount">
                      +PKR {parseFloat(record.amount || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="sales-record-date">
                    {new Date(record.created_at).toLocaleString()}
                  </div>

                  <span className="sales-record-items">
                    {record.items_count} units
                  </span>
                </div>
              ))}
            </div>

            {/* Tablet/Desktop: real table (shown from 768px up) */}
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Invoice Ref ID</th>
                  <th>Date & Timestamp</th>
                  <th>Items Checked Out</th>
                  <th className="sales-table-right">Settled Total</th>
                </tr>
              </thead>

              <tbody>
                {salesRecords.map((record) => (
                  <tr key={record._id}>
                    <td className="sales-invoice-id">#TX-{record._id}</td>
                    <td>{new Date(record.created_at).toLocaleString()}</td>
                    <td>
                      <span className="sales-items-badge">
                        {record.items_count} units
                      </span>
                    </td>
                    <td className="sales-table-right sales-total">
                      +PKR {parseFloat(record.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}