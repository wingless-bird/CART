import React from 'react';
import Slider from '../components/Slider';
import CategoryBoxes from '../components/CategoryBoxes';

export default function StoreHome() {
  return (
    <div style={{ minHeight: '90vh', paddingBottom: '80px' }}>
      
      {/* GLOWING HERO CAROUSEL BLOCK CONTAINER */}
      <div style={{ padding: '20px 0 50px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Slider />
        </div>
      </div>

      {/* METAVERSE-BRANDED DIRECTORY TITLE SECTIONS */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto' }}>
        <div style={{ marginBottom: '36px', textAlign: 'center' }}>
          <h2 style={{ 
            color: '#ffffff', 
            fontSize: '36px', 
            fontWeight: '800', 
            margin: '0 0 8px 0', 
            letterSpacing: '-0.02em',
            textShadow: '0 0 20px rgba(0, 242, 255, 0.4)' // Electric Cyan Glow
          }}>
            Shop by Category
          </h2>
          <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, #9333ea, #00f2ff)', margin: '14px auto 0 auto', borderRadius: '2px' }} />
        </div>
        
        <CategoryBoxes />
      </div>
    </div>
  );
}
