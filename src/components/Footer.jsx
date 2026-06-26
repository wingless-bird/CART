import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  footer: { backgroundColor: '#0f172a', color: '#94a3b8', padding: '60px 40px 30px 40px', fontFamily: 'sans-serif', marginTop: 'auto' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' },
  column: { flex: '1 1 200px' },
  heading: { color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  text: { fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { marginBottom: '12px' },
  link: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' },
  socialGroup: { display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' },
  socialCircle: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '16px', transition: 'background 0.2s' },
  bottomBar: { maxWidth: '1200px', margin: '40px auto 0 auto', paddingTop: '24px', borderTop: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', gap: '16px' }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleToggleHover = (e, color) => e.target.style.color = color;
  const handleSocialHover = (e, bg) => e.target.style.backgroundColor = bg;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* COLUMN 1: ABOUT US & EXTENDED SOCIAL MEDIA */}
        <div style={styles.column}>
          <h4 style={styles.heading}>🛒 About Us</h4>
          <p style={styles.text}>Sourcing the finest global live database catalog items right to your local neighborhood doorstep with absolute care, handling, and logistics sustainability.</p>
          <div style={styles.socialGroup}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialCircle} onMouseEnter={(e) => handleSocialHover(e, '#3b5998')} onMouseLeave={(e) => handleSocialHover(e, '#1e293b')}>📘</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialCircle} onMouseEnter={(e) => handleSocialHover(e, '#e1306c')} onMouseLeave={(e) => handleSocialHover(e, '#1e293b')}>📸</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialCircle} onMouseEnter={(e) => handleSocialHover(e, '#1da1f2')} onMouseLeave={(e) => handleSocialHover(e, '#1e293b')}>🐦</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialCircle} onMouseEnter={(e) => handleSocialHover(e, '#0077b5')} onMouseLeave={(e) => handleSocialHover(e, '#1e293b')}>💼</a>
          </div>
        </div>

        {/* COLUMN 2: OUR STORY */}
        <div style={styles.column}>
          <h4 style={styles.heading}>🌱 Our Story</h4>
          <p style={styles.text}>What began as an eco-conscious agrarian collective has evolved into a robust network, connecting organic field nurseries directly with local urban centers.</p>
        </div>

        {/* COLUMN 3: QUICK SHOP */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Shop</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/food-drinks" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>🥤 Food & Drinks</Link></li>
            <li style={styles.listItem}><Link to="/vegetables" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>🥦 Fresh Vegetables</Link></li>
            <li style={styles.listItem}><Link to="/fruits" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>🍎 Organic Fruits</Link></li>
            <li style={styles.listItem}><Link to="/groceries" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>🛒 Daily Groceries</Link></li>
          </ul>
        </div>

        {/* COLUMN 4: VISIT OUR STORES */}
        <div style={styles.column}>
          <h4 style={styles.heading}>🏢 Visit Our Stores</h4>
          <p style={{ ...styles.text, marginBottom: '8px' }}><strong>Rawalpindi Hub:</strong> Civic Centre, Phase 4, Bahria Town</p>
          <p style={styles.text}><strong>Islamabad Outlet:</strong> Block B, F-10 Markaz</p>
        </div>

        {/* COLUMN 5: CONTACT INFO */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact Us</h4>
          <ul style={styles.list}>
            <li style={{ ...styles.listItem, fontSize: '14px' }}>📍 123 Eco Farm Road, Rawalpindi</li>
            <li style={{ ...styles.listItem, fontSize: '14px' }}>📞 +92 (51) 555-0199</li>
            <li style={{ ...styles.listItem, fontSize: '14px' }}>✉️ support@freshmart.com</li>
            <li style={{ ...styles.listItem, fontSize: '13px', marginTop: '10px', color: '#64748b' }}>⏰ Mon - Sat: 9 AM - 9 PM</li>
          </ul>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <div>© {currentYear} FreshMart Ltd. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#about" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>About Farm</a>
          <a href="#privacy" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>Privacy Policy</a>
          <a href="#terms" style={styles.link} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#94a3b8')}>Terms</a>
          <Link to="/admin" style={{ color: '#64748b', textDecoration: 'none' }} onMouseEnter={(e) => handleToggleHover(e, '#38bdf8')} onMouseLeave={(e) => handleToggleHover(e, '#64748b')}>Staff Portal Login ⚙️</Link>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
