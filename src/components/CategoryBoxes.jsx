import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_BOXES = [
  { name: "Food & Drinks", path: "/food-drinks", icon: "🥤", img: "/4.jpg" },
  { name: "Vegetables", path: "/vegetables", icon: "🥦", img: "/b1.jpg" },
  { name: "Fruits", path: "/fruits", icon: "🍎", img: "/b3.jpg" },
  { name: "Groceries", path: "/groceries", icon: "🛒", img: "/5.jpg" }
];

export default function CategoryBoxes() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? '14px' : '24px',
        padding: isMobile ? '12px' : '0'
      }}
    >
      {CATEGORY_BOXES.map((box, index) => (
        <Link
          key={index}
          to={box.path}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundImage: `linear-gradient(to bottom, rgba(47,93,52,0.25), rgba(47,93,52,0.82)), url(${box.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            padding: isMobile ? '20px 10px' : '32px 16px',
            height: isMobile ? '150px' : '180px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-6px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <span style={{ fontSize: isMobile ? '34px' : '44px' }}>
            {box.icon}
          </span>

          <div style={{ textAlign: 'center' }}>
            <h4
              style={{
                margin: 0,
                fontSize: isMobile ? '15px' : '18px',
                color: '#fff',
                fontWeight: '700'
              }}
            >
              {box.name}
            </h4>

            <p
              style={{
                marginTop: '6px',
                fontSize: isMobile ? '10px' : '12px',
                color: '#d9f99d',
                fontWeight: '600',
                letterSpacing: '0.05em'
              }}
            >
              Explore →
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}