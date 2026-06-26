import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_BOXES = [
  { name: "Food & Drinks", path: "/food-drinks", icon: "🥤", img: "/4.jpg", color: "#00f2ff" },
  { name: "Vegetables", path: "/vegetables", icon: "🥦", img: "/b1.jpg", color: "#39ff14" },
  { name: "Fruits", path: "/fruits", icon: "🍎", img: "/b3.jpg", color: "#ff007f" },
  { name: "Groceries", path: "/groceries", icon: "🛒", img: "/5.jpg", color: "#ffea00" }
];

export default function CategoryBoxes() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      overflowX: 'auto',
      paddingBottom: '16px'
    }}>
      {CATEGORY_BOXES.map((box, index) => (
        <Link 
          key={index} 
          to={box.path} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px', 
            // 🌟 Gradient Overlays pulling dark luxury look straight from the image
            backgroundImage: `linear-gradient(to bottom, rgba(37, 18, 84, 0.3) 0%, rgba(13, 6, 32, 0.9) 100%), url(${box.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px', 
            padding: '32px 16px', 
            height: '180px',
            minWidth: '220px',
            boxSizing: 'border-box',
            textDecoration: 'none', 
            border: '1px solid rgba(147, 51, 234, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = box.color;
            e.currentTarget.style.boxShadow = `0 15px 30px ${box.color}25, 0 0 15px ${box.color}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.2)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
          }}
        >
          <span style={{ fontSize: '44px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>{box.icon}</span>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '18px', color: '#fff', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{box.name}</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: box.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore section →</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
