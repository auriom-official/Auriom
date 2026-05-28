import React from 'react';
import './InfoPages.css';

const PrivacyPolicy = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Legal</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: 1 May 2026. Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>1. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name, email address, phone number, and delivery address when you place an order or create an account.</li>
          <li>Payment information (we do not store card details — processed via PCI-DSS compliant gateways).</li>
          <li>Profile information if you register or sign in with Google.</li>
        </ul>
        <h3>Usage Information</h3>
        <ul>
          <li>Pages visited, time spent, clicks, and browsing behavior on our website.</li>
          <li>Device type, browser type, IP address, and approximate location.</li>
          <li>Cookies and similar tracking technologies.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders.</li>
          <li>To send order confirmations, shipping updates, and delivery notifications.</li>
          <li>To send promotional emails and offers (you may opt out at any time).</li>
          <li>To improve our website, products, and customer service.</li>
          <li>To prevent fraud and ensure account security.</li>
          <li>To comply with legal obligations under Indian law.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>3. Cookies</h2>
        <p>We use essential cookies to operate our website and analytics cookies to understand user behavior. You may disable cookies in your browser settings, though this may affect website functionality.</p>
        <div className="info-grid">
          {[
            {name:'Essential Cookies', desc:'Required for login sessions, cart, and checkout. Cannot be disabled.'},
            {name:'Analytics Cookies', desc:'Help us understand how users interact with our site (via Google Analytics).'},
            {name:'Marketing Cookies', desc:'Used to show you relevant ads on third-party platforms (opt-out available).'},
          ].map(c => (
            <div className="info-card" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>4. Data Sharing</h2>
        <p>We do not sell your personal data. We may share data with:</p>
        <ul>
          <li><strong>Logistics partners</strong> (Delhivery, BlueDart, etc.) to deliver your order.</li>
          <li><strong>Payment gateways</strong> (Razorpay, Paytm) to process transactions.</li>
          <li><strong>Analytics providers</strong> (Google Analytics) under strict data processing agreements.</li>
          <li><strong>Government authorities</strong> when required by law.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>5. Data Security</h2>
        <p>We use industry-standard SSL encryption for all data transmission. Access to customer data is restricted to authorized personnel only. We conduct regular security audits and comply with IT Act 2000 and DPDP Act 2023 requirements.</p>
      </div>

      <div className="info-section">
        <h2>6. Your Rights</h2>
        <ul>
          <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
          <li><strong>Correction:</strong> Ask us to correct inaccurate personal data.</li>
          <li><strong>Deletion:</strong> Request deletion of your account and data (subject to legal retention requirements).</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing emails via the link in any email.</li>
          <li><strong>Data Portability:</strong> Request your data in a machine-readable format.</li>
        </ul>
        <p>To exercise any of these rights, email us at <strong>privacy@auriom.com</strong>.</p>
      </div>

      <div className="info-section">
        <h2>7. Children's Privacy</h2>
        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, contact us immediately.</p>
      </div>

      <div className="info-section">
        <h2>8. Contact</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Privacy Officer', val:'privacy@auriom.com'},
            {icon:'📞', title:'Helpline', val:'1800-123-AURIOM'},
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

export default PrivacyPolicy;
