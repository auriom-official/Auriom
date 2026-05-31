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
        <h2>Disclaimer of Liability</h2>
        <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Please note: AURIOM acts solely as an authorized retailer and reseller of the products listed on our platform. We do not manufacture these items and therefore do not provide direct warranty coverage or repairs.
        </p>
        <p>
          All warranty claims, repairs, and technical support requests must be directed to the respective brand's authorized service centers. AURIOM is not responsible for fulfilling warranty obligations or arranging repairs on behalf of the manufacturer.
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
