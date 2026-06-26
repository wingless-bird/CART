import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import CartDrawer from '../components/CartDrawer';
import { Footer } from '../components/Footer';

export default function StoreLayout() {
  const { cart = [], searchQuery = "", setSearchQuery, inventory = [], addToCart } = useInventory() || {};
  const [isCartOpen, setIsCartOpen] = useState(false);

  const results = inventory.filter(p => searchQuery.trim() && p.name?.toLowerCase().includes(searchQuery.toLowerCase().trim()));

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #091a15 0%, #0d261f 100%)', color: '#fff' }}>
      <style>{`
        main h1, main h2, main h3, main h4, main h5, main h6, main strong { color: #fff !important; font-weight: 700; }
        main p, main span, main label, main td { color: rgba(255, 255, 255, 0.7) !important; }
        main input { color: #fff !important; background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-radius: 6px !important; backdrop-filter: blur(4px); }
        .product-card { background: rgba(255, 255, 255, 0.03) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; border-radius: 12px !important; backdrop-filter: blur(6px); transition: all 0.3s ease !important; }
        .product-card:hover { transform: translateY(-6px) !important; border-color: #a3e635 !important; }
        @media (max-width: 768px) { .nav-container { flex-direction: column !important; gap: 16px !important; } .scroll-nav-links { overflow-x: auto !important; width: 100%; } }
      `}</style>

      <nav style={{ backgroundColor: 'rgba(9, 26, 21, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 32px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="nav-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '22px', fontWeight: '800' }} onClick={() => setSearchQuery('')}>🌱 FreshMart</Link>
            
            {/* 🌟 BENCHMARK REDESIGN: Integrated capsule search box structure */}
            <div style={{ 
              position: 'relative', 
              width: '280px', 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden'
            }}>
              <input 
                type="text" 
                placeholder="search..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{ 
                  width: 'calc(100% - 44px)', 
                  padding: '10px 16px', 
                  fontSize: '14px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: '#1e293b', // Dark text color for clear legibility on the new pure white input background
                  borderRadius: '24px 0 0 24px',
                  backdropFilter: 'none'
                }} 
              />
              {/* Vibrant green attached capsule query button holding a high-contrast magnifying icon */}
              <div style={{
                width: '40px',
                height: '36px',
                backgroundColor: '#a3e635',
                borderRadius: '0 20px 20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)'
              }}>
                <span style={{ fontSize: '14px', color: '#091a15', fontWeight: 'bold' }}>🔍</span>
              </div>
            </div>

          </div>
          <div className="scroll-nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['food-drinks', 'vegetables', 'fruits', 'groceries'].map(c => (
              <Link key={c} to={`/${c}`} style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }} onClick={() => setSearchQuery('')} onMouseEnter={(e) => e.target.style.color = '#a3e635'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>{c.replace('-', ' & ')}</Link>
            ))}
            <Link to="/admin" style={{ textDecoration: 'none', fontSize: '12px', fontWeight: '700', padding: '8px 16px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>🛡️ Desk</Link>
            <button onClick={() => setIsCartOpen(true)} style={{ border: 'none', padding: '11px 24px', fontSize: '13px', fontWeight: '700', color: '#091a15', cursor: 'pointer', borderRadius: '24px', backgroundColor: '#a3e635' }}>🛒 Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</button>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '56px 24px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {searchQuery.trim() ? (
          <div>
            <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '32px', fontSize: '26px' }}>Results for "{searchQuery}" ({results.length} found)</h2>
            {results.length === 0 ? <p style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)' }}>No products found.</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '28px' }}>
                {results.map(p => {
                  const inCart = cart.find(i => parseInt(i.id, 10) === parseInt(p.id, 10));
                  return (
                    <div key={p.id} className="product-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
                          <img src={p.image_url || 'https://placeholder.com'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px' }}>{p.category}</span>
                        <h3 style={{ margin: '12px 0 8px 0', fontSize: '18px', color: '#fff' }}>{p.name}</h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#a3e635' }}>PKR {parseFloat(p.price || 0).toFixed(2)}</span>
                        <button onClick={() => addToCart(p)} style={{ backgroundColor: inCart ? 'rgba(255, 255, 255, 0.1)' : '#a3e635', color: inCart ? '#a3e635' : '#091a15', border: inCart ? '1px solid #a3e635' : 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                          {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : <Outlet />}
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
