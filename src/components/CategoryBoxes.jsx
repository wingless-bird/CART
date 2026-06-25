import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_BOXES = [
  { name: "Food & Drinks", path: "/food-drinks", icon: "🥤", img: "/4.jpg", color: "#60a5fa" },
  { name: "Vegetables", path: "/vegetables", icon: "🥦", img: "/b1.jpg", color: "#4ade80" },
  { name: "Fruits", path: "/fruits", icon: "🍎", img: "/b3.jpg", color: "#f87171" },
  { name: "Groceries", path: "/groceries", icon: "🛒", img: "/5.jpg", color: "#fbbf24" }
];

export default function CategoryBoxes() {
  return (
    // Height doubled to 160px per card with high-contrast text layout
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
      {CATEGORY_BOXES.map((box, index) => (
        <Link 
          key={index} 
          to={box.path} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            // Blends a protective dark overlay with your custom public background image
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.85)), url(${box.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px', 
            padding: '36px 28px', 
            height: '160px',
            boxSizing: 'border-box',
            textDecoration: 'none', 
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)';
          }}
        >
          {/* Icons enlarged to stand out against background images */}
          <span style={{ fontSize: '48px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>{box.icon}</span>
          <div>
            <h4 style={{ margin: 0, fontSize: '22px', color: '#fff', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{box.name}</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: box.color, fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Explore section →</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
