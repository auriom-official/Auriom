import React from 'react';
import './InfoPages.css';

const TrackOrder = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Track Your Order</h1>
        <p>Stay updated on your shipment in real-time. Enter your details below to see where your AURIOM product is.</p>
      </div>
    </div>
    <div className="info-content">
      <div className="info-section">
        <div className="info-card">
          <h3>📦 Enter Order Details</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'14px', marginTop:'16px'}}>
            <input type="text" placeholder="Order ID (e.g. AUR-2026-00123)" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <input type="email" placeholder="Email address used for order" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <button className="btn btn-primary" style={{alignSelf:'flex-start'}}>Track Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TrackOrder;
