import React from 'react';
import { useInventory } from '../context/InventoryContext';

export default function CategoryProductsView({ title, category }) {
  const { inventory, addToCart } = useInventory();

  // Strict structural filtering matching database strings exactly
  const displayedProducts = category === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === category);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      {/* SECTION HEADER BLOCK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>{title}</h2>
        <span style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
          {displayedProducts.length} Items Available
        </span>
      </div>

      {/* RENDER GRID RESPONSIVELY */}
      {displayedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🛒</span>
          <h3 style={{ margin: '0 0 8px 0', color: '#475569' }}>Awaiting Stock Drop</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>No items found under "{category}". Jump over to the Admin Panel to seed inventory!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {displayedProducts.map((product) => (
            <div 
              key={product.id} 
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                padding: '20px', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)';
              }}
            >
              {/* PRODUCT IMAGE & INFO CHASSIS */}
              <div>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
                  {product.icon || '📦'}
                </div>
                <span style={{ display: 'inline-block', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px', marginBottom: '8px' }}>
                  {product.category}
                </span>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{product.name}</h3>
              </div>

              {/* ACTION / PRICING PANEL FOOTER */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>
                  ${parseFloat(product.price || 0).toFixed(2)}
                </span>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    fontSize: '13px', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
