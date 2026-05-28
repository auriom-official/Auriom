import React from 'react';
import './InfoPages.css';

const Warranty = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Warranty & Support</h1>
        <p>AURIOM stands behind every product we make. Our comprehensive warranty program ensures peace of mind with every purchase.</p>
      </div>
    </div>
    <div className="info-content">
      <div className="info-section">
        <h2>Warranty Coverage</h2>
        <div className="info-grid">
          {[
            {icon:'🛡️', title:'True Wireless Earbuds', val:'1 Year Manufacturer Warranty'},
            {icon:'🎧', title:'Wireless Headphones', val:'1 Year Manufacturer Warranty'},
            {icon:'⌚', title:'Smart Watches', val:'1 Year Manufacturer Warranty'},
            {icon:'🔊', title:'Wireless Speakers', val:'1 Year Manufacturer Warranty'},
            {icon:'🎙️', title:'Neckbands', val:'1 Year Manufacturer Warranty'},
            {icon:'🔋', title:'Accessories', val:'6 Months Warranty'},
          ].map(w => (
            <div className="info-card" key={w.title}>
              <div style={{fontSize:'28px', marginBottom:'8px'}}>{w.icon}</div>
              <h3>{w.title}</h3>
              <p style={{fontWeight:'700', color:'var(--text-primary)'}}>{w.val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>What is Covered</h2>
        <ul>
          <li>Manufacturing defects in materials and workmanship</li>
          <li>Hardware failures not caused by user damage</li>
          <li>Battery defects (capacity drops below 70% within warranty period)</li>
          <li>Driver failures, connectivity issues, and charging port defects</li>
          <li>Speaker or microphone failures under normal use</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>What is NOT Covered</h2>
        <ul>
          <li>Physical damage caused by drops, impacts, or crushing</li>
          <li>Water or liquid damage (beyond rated IPX rating)</li>
          <li>Damage caused by unauthorized modifications or repair</li>
          <li>Cosmetic damage — scratches, dents, broken plastic on ports</li>
          <li>Products with removed or altered serial numbers</li>
          <li>Lost or stolen products</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>How to Claim Warranty</h2>
        <div className="info-grid">
          {[
            {num:'01', title:'Register Product', desc:'Visit auriom.com/register and register your product within 15 days of purchase.'},
            {num:'02', title:'Raise a Ticket', desc:'Contact our support with your order ID and describe the issue clearly with photos/video.'},
            {num:'03', title:'Ship the Product', desc:'We will provide a prepaid shipping label. Send the product to our service center.'},
            {num:'04', title:'Get it Fixed', desc:'We repair or replace your product within 10–15 business days and ship it back free.'},
          ].map(s => (
            <div className="info-card" key={s.num}>
              <div style={{fontSize:'var(--font-size-xxl)', fontWeight:900, color:'var(--border-color)', marginBottom:'8px'}}>{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Contact Support</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Email', val:'warranty@auriom.com'},
            {icon:'📞', title:'Helpline', val:'1800-123-AURIOM'},
            {icon:'🏢', title:'Service Centers', val:'Available in 50+ cities across India'},
          ].map(c => (
            <div className="info-contact-block" key={c.title}>
              <div className="icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Warranty;
