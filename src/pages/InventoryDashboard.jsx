import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext'; 

export default function InventoryDashboard() {
  const { logoutAdmin } = useInventory(); 
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🚪 SEPARATE LOGOUT PROCESS: Only triggered by clicking the bottom 'Exit Portal' button
  const handleExitClick = (e) => {
    e.preventDefault();
    logoutAdmin(); // Revokes token authorization memory instantly
    navigate('/'); // Redirects out to the storefront home page
  };

  const linkStyle = ({ isActive }) => ({
    padding: '10px 14px',
    color: isActive ? '#0f172a' : '#94a3b8',
    backgroundColor: isActive ? '#38bdf8' : 'transparent',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  });

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: 'sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      
      <aside style={{ width: isMobile ? '100%' : '260px', backgroundColor: '#1e293b', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>📦 Admin Dashboard</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase' }}>FreshMart Management</div>
        </div>
        
        {/* FIXED: Removed onClick interception entirely. This link now routes straight to your public storefront home page without logging you out. */}
        <Link to="/" style={{ display: 'block', padding: '10px', backgroundColor: '#0f172a', color: '#38bdf8', textDecoration: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>
          🌐 Go to Public Storefront
        </Link>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: '6px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <NavLink to="/admin" style={linkStyle} end>🏠 Global</NavLink>
          <NavLink to="/admin/food-drinks" style={linkStyle}>🥤 Food & Drinks</NavLink>
          <NavLink to="/admin/vegetables" style={linkStyle}>🥦 Vegetables</NavLink>
          <NavLink to="/admin/fruits" style={linkStyle}>🍎 Fruits</NavLink>
          <NavLink to="/admin/groceries" style={linkStyle}>🛒 Groceries</NavLink>
          <NavLink to="/admin/sales" style={linkStyle}>📈 Total Sales Log</NavLink>
          <NavLink to="/admin/settings" style={linkStyle}>🔒 Security Settings</NavLink>
        </div>

        {!isMobile && (
          /* Triggers explicit logout process when clicked */
          <button 
            onClick={handleExitClick} 
            style={{ marginTop: 'auto', padding: '12px', color: '#ef4444', backgroundColor: '#2d3748', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textAlign: 'center', cursor: 'pointer' }}
          >
            🚪 Exit Portal
          </button>
        )}
      </aside>

      <main style={{ flex: 1, padding: isMobile ? '20px' : '40px', overflowY: 'auto', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
    </div>
  );
}
