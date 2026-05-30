import React from 'react';
import './InfoPages.css';

const ReturnPolicy = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Return Policy</h1>
        <p>We want you to love your AURIOM product. If something isn't right, we make the return process simple and hassle-free.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <div className="info-card" style={{background:'rgba(239,68,68,0.05)', border:'1px solid rgba(239,68,68,0.2)'}}>
          <h3 style={{color:'#DC2626'}}>⚠️ No Refund Policy</h3>
          <p><strong>AURIOM operates a strict No Refund policy.</strong> All sales are final. We do not offer monetary refunds on any products. However, we offer a <strong>2-Day Replacement Guarantee</strong> for products that are defective or damaged upon arrival. Please read below for full details.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>2-Day Replacement Guarantee</h2>
        <p>If you receive a product that is defective, damaged, or not as described, you may request a <strong>replacement</strong> (not a refund) within <strong>2 days</strong> of delivery.</p>
        <h3>Eligible Conditions for Replacement</h3>
        <ul>
          <li>Product received is physically damaged (broken, cracked, bent)</li>
          <li>Product is Dead on Arrival (DOA) — does not power on or function</li>
          <li>Product received is different from what was ordered (wrong item)</li>
          <li>Missing components or accessories from the original box</li>
        </ul>
        <h3>Not Eligible for Replacement</h3>
        <ul>
          <li>Change of mind after purchase</li>
          <li>Product does not match personal preference or expectations</li>
          <li>Damage caused by improper use, dropping, or liquid exposure</li>
          <li>Products with tampered serial numbers or seals</li>
          <li>Requests raised after the 2-day window</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>How to Request a Replacement</h2>
        <div className="info-grid">
          {[
            {num:'01', title:'Document the Issue', desc:'Take clear photos/video of the damaged or defective product and the packaging.'},
            {num:'02', title:'Contact within 2 Days', desc:'Email support@auriom.in with Order ID, your name, and the documentation.'},
            {num:'03', title:'Approval & Pickup', desc:'Our team reviews within 24–48 hrs. If approved, we schedule a free pickup.'},
            {num:'04', title:'Replacement Shipped', desc:'Once we receive the product, a replacement is dispatched within 5–7 business days.'},
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
        <h2>Exchange Policy</h2>
        <p>We do not offer exchanges for a different model or category. Replacement is only for the same product in case of a genuine defect.</p>
      </div>

      <div className="info-section">
        <h2>Contact for Returns</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Email', val:'support@auriom.in'},
            {icon:'📞', title:'Helpline', val:'1800-123-AURIOM (Mon–Sat 9AM–6PM)'},
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

export default ReturnPolicy;
