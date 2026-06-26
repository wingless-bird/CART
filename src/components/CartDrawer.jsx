import React from 'react';
import { useInventory } from '../context/InventoryContext';

const styles = {
  backdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end', fontFamily: 'sans-serif' },
  drawer: { width: '400px', height: '100%', backgroundColor: '#fff', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', padding: '24px', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' },
  itemList: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  itemRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' },
  qtyBtn: { width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  footer: { borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '20px' },
  billRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#475569', fontSize: '14px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '18px', color: '#0f172a', margin: '12px 0 20px 0' },
  checkoutBtn: { width: '100%', padding: '14px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }
};

export default function CartDrawer({ isOpen, onClose }) {
  const { cart = [], updateCartQuantity, removeFromCart, processCheckout } = useInventory() || {};

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price || 0) * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 100.00 : 0;
  const tax = subtotal * 0.19;
  const grandTotal = subtotal + deliveryFee + tax;

  const handlePaymentSubmit = async () => {
    if (processCheckout) {
      await processCheckout(grandTotal, onClose);
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <header style={styles.header}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>🛍️ Review Order</h2>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </header>

        <div style={styles.itemList}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>Your shopping cart basket is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.itemRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* 🌟 FIXED: Swapped out the raw text emoji element block for a miniature <img> thumbnail avatar map */}
                  <img 
                    src={item.image_url || 'https://placeholder.com'} 
                    alt={item.name} 
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }} 
                  />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{item.name}</h4>
                    <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                      PKR {parseFloat(item.price || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateCartQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                  <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', marginLeft: '6px' }}
                    title="Remove Item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.billRow}><span>Items Subtotal:</span><span>PKR {subtotal.toFixed(2)}</span></div>
            <div style={styles.billRow}><span>Estimated Tax (19%):</span><span>PKR {tax.toFixed(2)}</span></div>
            <div style={styles.billRow}><span>Flat Delivery Fee:</span><span>PKR {deliveryFee.toFixed(2)}</span></div>
            <div style={styles.totalRow}><span>Total Bill:</span><span>PKR {grandTotal.toFixed(2)}</span></div>
            
            <button onClick={handlePaymentSubmit} style={styles.checkoutBtn}>
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
