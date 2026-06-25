import React, { useState, useEffect } from 'react';

const SLIDES = [
  { id: 1, title: "🚀 Flash Sale: 20% Off!", text: "Get the freshest organic products delivered directly to your doorstep today.", img: "/1.jpg" },
  { id: 2, title: "🥦 Farm Fresh Vegetables", text: "100% certified organic greens sourced directly from local eco-farms.", img: "/2.jpg" },
  { id: 3, title: "🍓 Sweet Summer Fruits", text: "Packed with vitamins. Enjoy our handpicked seasonal fruit bundles.", img: "/3.jpg" }
];

export default function Slider() {
  const [idx, setIdx] = useState(0);
  const [height, setHeight] = useState(window.innerWidth < 768 ? '280px' : '500px');

  useEffect(() => {
    const handleResize = () => setHeight(window.innerWidth < 768 ? '280px' : '500px');
    window.addEventListener('resize', handleResize);
    const t = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 5000);
    return () => { clearInterval(t); window.removeEventListener('resize', handleResize); };
  }, []);

  const s = SLIDES[idx];

  return (
    <div style={{ position: 'relative', width: '100%', height: height, backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', padding: window.innerWidth < 768 ? '30px' : '60px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'background-image 0.8s ease-in-out', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: window.innerWidth < 768 ? '24px' : '42px', color: '#fff', fontWeight: '800', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>{s.title}</h2>
      <p style={{ margin: '0 0 16px 0', fontSize: window.innerWidth < 768 ? '14px' : '18px', color: '#f8fafc', maxWidth: '600px', lineHeight: '1.5', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{s.text}</p>
      <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: idx === i ? '#fff' : 'transparent', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
}
