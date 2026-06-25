import React from 'react';
import Slider from '../components/Slider';
import CategoryBoxes from '../components/CategoryBoxes';

export default function StoreHome() {
  return (
    <div style={{ backgroundColor: '#3d356b', minHeight: '80vh', paddingBottom: '60px' }}>
      {/* Hero Section Banner */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 0 20px' }}>
        <Slider />
      </div>

      {/* Main Entry Boxes Grid */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <h2 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', marginBottom: '24px', fontFamily: 'sans-serif' }}>Shop by Category</h2>
        <CategoryBoxes />
      </div>
    </div>
  );
}
