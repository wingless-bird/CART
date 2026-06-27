import React from 'react';
import Slider from '../components/Slider';
import CategoryBoxes from '../components/CategoryBoxes';

export default function StoreHome() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgba(9, 26, 21, 0.7)',
        paddingBottom: '60px'
      }}
    >
      {/* HERO SLIDER SECTION */}
      <div style={{ padding: '20px 16px 40px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Slider />
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}
      >
        <div
          style={{
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              color: 'black',
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: '800',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            Shop by Category
          </h2>

          <p
            style={{
              marginTop: '12px',
              color: '#dee2e9',
              fontSize: '16px'
            }}
          >
            Fresh groceries delivered to your doorstep
          </p>

          <div
            style={{
              width: '70px',
              height: '4px',
              background: '#6D8B3D',
              margin: '16px auto 0 auto',
              borderRadius: '10px'
            }}
          />
        </div>

        <CategoryBoxes />
      </div>
    </div>
  );
}