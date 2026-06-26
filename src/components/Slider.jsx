import React, { useState, useEffect } from 'react';

const SLIDES = [
  { id: 1, title: "🚀 Flash Sale: 20% Off!", text: "Get the freshest organic products delivered directly to your doorstep today.", img: "/1.jpg" },
  { id: 2, title: "🥦 Farm Fresh Vegetables", text: "100% certified organic greens sourced directly from local eco-farms.", img: "/2.jpg" },
  { id: 3, title: "🍓 Sweet Summer Fruits", text: "Packed with vitamins. Enjoy our handpicked seasonal fruit bundles.", img: "/3.jpg" }
];

export default function Slider() {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const t = setInterval(() => {
      setIdx(p => (p + 1) % SLIDES.length);
    }, 5000);

    return () => {
      clearInterval(t);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const s = SLIDES[idx];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '280px' : '520px',
        backgroundImage: `linear-gradient(135deg, rgba(37, 18, 84, 0.4) 0%, rgba(5, 2, 12, 0.8) 100%), url(${s.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '24px',
        padding: isMobile ? '30px' : '60px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid rgba(147, 51, 234, 0.25)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}
    >
      <h2
        style={{
          margin: '0 0 16px 0',
          fontSize: isMobile ? '28px' : '48px',
          color: '#fff',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 20px rgba(147, 51, 234, 0.6)'
        }}
      >
        {s.title}
      </h2>

      <p
        style={{
          margin: '0 0 32px 0',
          fontSize: isMobile ? '14px' : '18px',
          color: '#d1cee3',
          maxWidth: '640px',
          lineHeight: '1.6',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}
      >
        {s.text}
      </p>

      {/* Updated Tiny Minimal Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '14px' : '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: isMobile ? '6px' : '10px'
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: idx === i ? (isMobile ? '8px' : '20px') : '8px',
              height: '8px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: idx === i ? '#A7C957' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}