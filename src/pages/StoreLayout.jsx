import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import Footer from '../components/Footer';

export default function StoreLayout() {
  const { searchQuery, setSearchQuery, cart, processCheckout, removeFromCart } = useInventory(); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cartSubtotal = (cart || []).reduce((sum, item) => sum + (item.price || 0), 0);

  const handleOrderCheckout = () => {
    processCheckout(cartSubtotal);
    setIsCartOpen(false);
    alert('🎉 Order Placed Successfully! Your items have been processed.');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      
      <header style={{ backgroundColor: '#0f172a', padding: isMobile ? '16px 20px' : '16px 40px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
          
          {/* FIXED: Emoji completely replaced with logo image pulling from public/image/logo.avif */}
          <Link to="/" style={{ color: '#38bdf8', fontSize: '22px', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/logo.avif" 
              alt="FreshMart Logo" 
              style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'inline-block' }} 
            />
            FreshMart
          </Link>

          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setIsCartOpen(!isCartOpen)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span style={{ fontSize: '24px' }}>🛍️</span>
                {cart.length > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '700', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
              </button>
              <Link to="/admin" style={{ fontSize: '22px', textDecoration: 'none' }}>⚙️</Link>
            </div>
          )}
        </div>
        
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '16px', width: isMobile ? '100%' : 'auto', marginLeft: isMobile ? '0' : '24px' }}>
          <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0, width: isMobile ? '100%' : 'auto' }}>
            <li><NavLink to="/food-drinks" style={({ isActive }) => ({ display: 'block', padding: '8px 12px', color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontSize: '13px', borderRadius: '4px', backgroundColor: isActive ? '#1e293b' : 'transparent' })}>Food & Drinks</NavLink></li>
            <li><NavLink to="/vegetables" style={({ isActive }) => ({ display: 'block', padding: '8px 12px', color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontSize: '13px', borderRadius: '4px', backgroundColor: isActive ? '#1e293b' : 'transparent' })}>Vegetables</NavLink></li>
            <li><NavLink to="/fruits" style={({ isActive }) => ({ display: 'block', padding: '8px 12px', color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontSize: '13px', borderRadius: '4px', backgroundColor: isActive ? '#1e293b' : 'transparent' })}>Fruits</NavLink></li>
            <li><NavLink to="/groceries" style={({ isActive }) => ({ display: 'block', padding: '8px 12px', color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontSize: '13px', borderRadius: '4px', backgroundColor: isActive ? '#1e293b' : 'transparent' })}>Groceries</NavLink></li>
          </ul>
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '14px', width: isMobile ? '100%' : '200px', boxSizing: 'border-box', outline: 'none' }} />
        </nav>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            <button onClick={() => setIsCartOpen(!isCartOpen)} style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              <span style={{ fontSize: '24px' }}>🛍️</span>
              {cart.length > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '700', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
            </button>
            <Link to="/admin" style={{ fontSize: '22px', textDecoration: 'none', padding: '6px', backgroundColor: '#334155', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚙️</Link>
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* FIXED SLIDE DRAWER COMPONENT */}
      <div style={{ position: 'fixed', top: 0, right: isCartOpen ? 0 : '-100%', width: isMobile ? '100vw' : '340px', height: '100vh', backgroundColor: '#fff', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', zIndex: 100, transition: 'right 0.3s ease-in-out', display: 'flex', flexDirection: 'column', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '700' }}>Shopping Basket</h3>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cart.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', marginTop: '40px', fontSize: '14px' }}>Your basket is completely empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: 0, color: '#0f172a', fontSize: '14px' }}>{item.name}</h5>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{item.category}</span>
                </div>
                <span style={{ fontWeight: '600', color: '#16a34a', fontSize: '14px', marginRight: '4px' }}>${(item.price || 0).toFixed(2)}</span>
                
                <button 
                  onClick={() => removeFromCart(idx)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', cursor: 'pointer', padding: '4px', transition: 'opacity 0.2s' }}
                  title="Remove Item from Cart"
                  onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>
            <span>Subtotal:</span>
            <span style={{ color: '#16a34a' }}>${cartSubtotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleOrderCheckout}
            disabled={cart.length === 0}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', color: '#fff', backgroundColor: cart.length === 0 ? '#cbd5e1' : '#16a34a', border: 'none', fontSize: '15px', fontWeight: '600', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
