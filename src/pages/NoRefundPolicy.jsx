import React from 'react';
import './InfoPages.css';

const NoRefundPolicy = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Legal</span>
        <h1>No Refund Policy</h1>
        <p>Last updated: 1 May 2026. Please read this policy carefully before placing an order with AURIOM.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <div className="info-card" style={{background:'rgba(239,68,68,0.05)', border:'1px solid rgba(239,68,68,0.2)'}}>
          <h3 style={{color:'#DC2626', marginTop:0}}>⚠️ All Sales Are Final</h3>
          <p><strong>AURIOM does not offer monetary refunds under any circumstances.</strong> Once an order is placed and payment is received, it cannot be cancelled for a refund. This policy applies to all products sold on our website, app, and authorized retail partners.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Why We Have This Policy</h2>
        <p>Our no-refund policy allows us to:</p>
        <ul>
          <li>Keep our prices as low and competitive as possible for all customers.</li>
          <li>Reduce waste from returned products that cannot be resold.</li>
          <li>Maintain a sustainable business model while offering best-in-class warranties.</li>
          <li>Protect against fraudulent return claims that raise costs for honest buyers.</li>
        </ul>
        <p>Instead of refunds, we offer a comprehensive <strong>7-Day Replacement Guarantee</strong> and a <strong>1-Year Manufacturer Warranty</strong>, which provide far greater protection than a simple return window.</p>
      </div>

      <div className="info-section">
        <h2>What We Offer Instead of Refunds</h2>
        <div className="info-grid">
          {[
            {icon:'🔄', title:'7-Day Replacement', desc:'If your product is defective or damaged on arrival, we will replace it at no cost within 7 days of delivery.'},
            {icon:'🛡️', title:'1-Year Warranty', desc:'Manufacturing defects are covered for a full year. We repair or replace — free of charge.'},
            {icon:'🏪', title:'Service Centers', desc:'50+ service centers across India provide free diagnosis, repair, and assistance during the warranty period.'},
          ].map(f => (
            <div className="info-card" key={f.title}>
              <div style={{fontSize:'32px', marginBottom:'10px'}}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Situations NOT Covered for Replacement or Refund</h2>
        <ul>
          <li>Change of mind after purchase</li>
          <li>Product doesn't meet personal expectations or preferences</li>
          <li>Compatibility issues with third-party devices not mentioned in specs</li>
          <li>Damage due to improper use, drops, or liquid exposure</li>
          <li>Requests raised after the 7-day replacement window</li>
          <li>Products purchased from unauthorized sellers or third-party resellers</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Pre-Shipment Cancellation</h2>
        <p>Orders may be cancelled <strong>only before they are dispatched from our warehouse</strong>. If your order has already been shipped, cancellation is not possible. To attempt a pre-shipment cancellation, contact us immediately at <strong>orders@auriom.com</strong> with your Order ID.</p>
        <p>Even for successful pre-shipment cancellations, the amount will be credited as <strong>AURIOM Store Credit</strong> (valid for 12 months) and not as a monetary refund to your bank account or card.</p>
      </div>

      <div className="info-section">
        <h2>Exceptions</h2>
        <p>The only exception to this policy is in cases where AURIOM is legally obligated to issue a refund under applicable Indian consumer protection laws (Consumer Protection Act, 2019). In such cases, we will comply fully with the legal directive.</p>
      </div>

      <div className="info-section">
        <h2>Disputes</h2>
        <p>If you believe this policy has been applied incorrectly to your case, you may escalate to our Grievance Officer:</p>
        <div className="info-grid">
          {[
            {icon:'👤', title:'Grievance Officer', val:'Ms. Priya Kaur'},
            {icon:'📧', title:'Email', val:'grievance@auriom.com'},
            {icon:'⏱️', title:'Response Time', val:'Within 48 working hours'},
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

export default NoRefundPolicy;
