import React from 'react';
import { useInventory } from '../context/InventoryContext';

export default function CategoryProductsView({ title, category }) {
  const { inventory, cart, addToCart, searchQuery } = useInventory();

  const displayed = inventory
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.name.toLowerCase().includes((searchQuery || '').toLowerCase()));

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(147, 51, 234, 0.25)', paddingBottom: '16px', marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#fff', textShadow: '0 0 15px rgba(0, 242, 255, 0.4)' }}>{title}</h2>
        <span style={{ backgroundColor: 'rgba(0, 242, 255, 0.12)', color: '#00f2ff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', border: '1px solid rgba(0, 242, 255, 0.25)' }}>
          {displayed.length} Items Available
        </span>
      </div>

      {displayed.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#8b87a3' }}>No items found matching your filters 🛒</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '28px' }}>
          {displayed.map(p => {
            const inCart = cart.find(i => parseInt(i.id, 10) === parseInt(p.id, 10));
            const price = parseFloat(p.price || 0);

            return (
              <div key={p.id} className="product-card" style={{ background: 'linear-gradient(135deg, rgba(25, 12, 58, 0.5) 0%, rgba(13, 6, 32, 0.8) 100%)', border: '1px solid rgba(147, 51, 234, 0.25)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* 🌟 FIXED: Swapped out the old emoji text field block for a crisp HTML <img> tag mapping to item.image_url */}
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden' }}>
                    <img 
                      src={p.image_url || 'https://placeholder.com'} 
                      alt={p.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <span style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#d8b4fe', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(147, 51, 234, 0.2)' }}>{p.category}</span>
                  <h3 style={{ margin: '14px 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#fff' }}>{p.name}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '22px', fontWeight: '800', color: '#00f2ff', textShadow: '0 0 10px rgba(0, 242, 255, 0.3)' }}>PKR {price.toFixed(2)}</span>
                    {inCart && <span style={{ fontSize: '12px', color: '#8b87a3' }}>Total: PKR {(price * inCart.quantity).toFixed(2)}</span>}
                  </div>

                  <button 
                    onClick={() => addToCart(p)} 
                    style={{ 
                      backgroundColor: inCart ? 'rgba(147, 51, 234, 0.15)' : '#00f2ff', 
                      color: inCart ? '#00f2ff' : '#0d0620', 
                      border: inCart ? '1px solid rgba(0, 242, 255, 0.4)' : 'none', 
                      padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' 
                    }}
                  >
                    {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
