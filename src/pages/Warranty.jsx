import React from 'react';
import './InfoPages.css';

const Warranty = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Warranty & Support</h1>
        <p>AURIOM is a retail partner for premium electronic brands. Please read our warranty policy below regarding product support and claims.</p>
      </div>
    </div>
    <div className="info-content">
      <div className="info-section">
        <h2>Warranty Policy & Coverage</h2>
        <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
          At AURIOM, we offer a diverse range of products, and the warranty coverage depends on the origin of the item you purchased:
        </p>
        <ul style={{ lineHeight: 1.7, margin: '16px 0', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '12px' }}>
            <strong>AURIOM Original Products:</strong> Products manufactured directly by us carry an official AURIOM warranty. For these items, we provide comprehensive, direct support, repairs, and replacements through our dedicated service channels.
          </li>
          <li>
            <strong>Third-Party Brand Products:</strong> For products from other partner brands sold on our platform, AURIOM acts purely as an authorized reseller. <strong>We do not handle warranty claims or repairs for third-party items.</strong> All technical support, claims, and repair requests for these products must be directed exclusively to the respective brand's authorized service centers.
          </li>
        </ul>
        <p>
          Please ensure you verify whether your product is an AURIOM original or a third-party item before initiating a claim to ensure a smooth resolution process.
        </p>
      </div>

      <div className="info-section">
        <h2>How to Claim Warranty</h2>
        <div className="info-grid">
          {[
            {num:'01', title:'Identify Brand', desc:'Check the brand of your purchased product and locate their official customer support contact.'},
            {num:'02', title:'Prepare Invoice', desc:'Keep your AURIOM invoice handy. You can download it anytime from the Orders section in your account.'},
            {num:'03', title:'Contact Service Center', desc:'Reach out to the brand\'s nearest authorized service center or official support email/helpline.'},
            {num:'04', title:'Follow Brand Process', desc:'Follow the manufacturer\'s instructions for submitting your product for repair or replacement.'},
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
        <h2>Need Invoice Help?</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Email Support', val:'support@auriom.in'},
            {icon:'📄', title:'Invoice Copies', val:'Available in your Account Dashboard'},
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
