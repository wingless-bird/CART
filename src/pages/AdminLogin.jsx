import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

export default function AdminLogin() {
  const { isAdminLoggedIn, loginAdmin, logoutAdmin, changeAdminPassword } = useInventory();
  const navigate = useNavigate();

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Credentials Change States
  const [newUsername, setNewUsername] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility Toggle State
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const success = await loginAdmin(username, password);
    if (success) {
      navigate('/admin'); 
    } else {
      setLoginError('Invalid administrative username or password combination.');
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      return alert("Passwords do not match or fields are left empty.");
    }
    
    // Pass the new entries directly to the context handler
    const success = await changeAdminPassword(newUsername, newPassword);
    if (success) {
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPassword(false);
    }
  };

  // ==========================================
  // VIEWPORT A: LOGGED IN SECURITY SETTINGS PANEL
  // ==========================================
  if (isAdminLoggedIn) {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: '500px', margin: '60px auto', padding: '30px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>🔒 Security Credentials Manager</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Modify backend gateway usernames, passwords, or terminate active sessions.</p>
        
        <form onSubmit={handlePasswordChangeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Desired New Username</label>
            <input type="text" placeholder="Type new username (e.g. manager)" value={newUsername} onChange={e => setNewUsername(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>New Entry Password</label>
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Confirm New Password</label>
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <input type="checkbox" id="toggle-pass-dashboard" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            <label htmlFor="toggle-pass-dashboard" style={{ fontSize: '13px', color: '#475569', fontWeight: '500', cursor: 'pointer', userSelect: 'none' }}>Show plain-text passwords</label>
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>Commit Credentials Change</button>
        </form>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/admin')} style={{ flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}>Return to Dashboard</button>
          <button onClick={() => { logoutAdmin(); navigate('/'); }} style={{ flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Revoke Token & Logout</button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEWPORT B: UNAUTHENTICATED CHALLENGE WALL
  // ==========================================
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '400px', margin: '100px auto', padding: '30px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '48px' }}>⚙️</span>
        <h2 style={{ margin: '8px 0 0 0', color: '#0f172a', fontWeight: '800' }}>Admin Gateway</h2>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Authentication Required</p>
      </div>

      {loginError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', fontWeight: '500', border: '1px solid #fca5a5' }}>
          ⚠️ {loginError}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>Username</label>
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }} placeholder="Enter admin username" />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }} placeholder="••••••••" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <input type="checkbox" id="toggle-login-pass" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
          <label htmlFor="toggle-login-pass" style={{ fontSize: '13px', color: '#475569', fontWeight: '500', cursor: 'pointer', userSelect: 'none' }}>Show password character text</label>
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '8px', transition: 'background-color 0.2s' }}>
          Verify Credentials & Enter
        </button>
      </form>
    </div>
  );
}
