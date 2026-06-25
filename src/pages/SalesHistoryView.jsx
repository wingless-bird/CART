import React from 'react';
import { useInventory } from '../context/InventoryContext';

export default function SalesHistoryView() {
  const { salesRecords, salesTotal } = useInventory();

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: '700' }}>Live Sales Audit Engine</h2>

      {/* METRIC SUM CARD PANEL WRAPPER */}
      <div style={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>Total Cumulative Gross Revenue</span>
          <h3 style={{ margin: 0, fontSize: '36px', color: '#38bdf8', fontWeight: '800', marginTop: '4px' }}>${(salesTotal || 0).toFixed(2)}</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>Processed Orders</span>
          <h3 style={{ margin: 0, fontSize: '36px', color: '#a7f3d0', fontWeight: '800', marginTop: '4px' }}>{salesRecords.length}</h3>
        </div>
      </div>

      {/* LOG DATA GRID SHEET */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflowX: 'auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Invoice Ref ID</th>
              <th style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Date & Timestamp</th>
              <th style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Items Checked Out</th>
              <th style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'right' }}>Settled Total</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                  No retail sales tickets recorded yet. Complete customer orders from the storefront to generate logs!
                </td>
              </tr>
            ) : (
              salesRecords.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: '#64748b', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    #TX-{record.id}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: '#334155' }}>
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: '#334155' }}>
                    <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      {record.items_count} units
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '16px', fontWeight: '700', color: '#16a34a', textAlign: 'right' }}>
                    +${parseFloat(record.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
