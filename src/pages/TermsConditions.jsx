import React from 'react';
import './InfoPages.css';

const TermsConditions = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Legal</span>
        <h1>Terms & Conditions</h1>
        <p>Last updated: 1 May 2026. Please read these terms carefully before using our website or purchasing our products.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the AURIOM website (auriom.com), mobile application, or purchasing any AURIOM product, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.</p>
        <p>AURIOM reserves the right to update these terms at any time. Continued use of our website after such changes constitutes acceptance of the revised terms.</p>
      </div>

      <div className="info-section">
        <h2>2. Products & Pricing</h2>
        <p>All product descriptions, images, and specifications are provided in good faith. AURIOM reserves the right to modify product specifications without notice. Prices are listed in Indian Rupees (INR) and are inclusive of GST unless stated otherwise.</p>
        <p>We reserve the right to change prices at any time. In the event of a pricing error, AURIOM may cancel or modify your order and will notify you accordingly.</p>
      </div>

      <div className="info-section">
        <h2>3. Orders & Payments</h2>
        <ul>
          <li>All orders are subject to availability and acceptance by AURIOM.</li>
          <li>Payment must be made in full at the time of order placement.</li>
          <li>We accept UPI, Credit/Debit cards, Net Banking, and select Buy Now Pay Later options.</li>
          <li>Order confirmation does not guarantee product availability. In case of unavailability, a full refund will be issued within 5–7 business days.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>4. No Refund Policy</h2>
        <p><strong>All sales are final.</strong> AURIOM does not offer monetary refunds on any purchases. However, we provide a <strong>2-Day Replacement Guarantee</strong> for defective or damaged products. Please refer to our <a href="/return-policy" style={{color:'var(--primary-purple)', fontWeight:700}}>Return Policy</a> for complete details.</p>
      </div>

      <div className="info-section">
        <h2>5. Intellectual Property</h2>
        <p>All content on this website — including logos, product names, designs, text, images, and software — is the exclusive property of AURIOM or its licensors and is protected under applicable Indian and international intellectual property laws.</p>
        <p>You may not reproduce, distribute, or create derivative works from any content on this website without explicit written permission from AURIOM.</p>
      </div>

      <div className="info-section">
        <h2>6. User Accounts</h2>
        <ul>
          <li>You must be at least 18 years old to create an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>AURIOM reserves the right to terminate accounts for any violation of these terms.</li>
          <li>You agree to provide accurate information and keep it up to date.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>7. Limitation of Liability</h2>
        <p>AURIOM shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or services. Our total liability to you shall not exceed the purchase price of the product giving rise to the claim.</p>
      </div>

      <div className="info-section">
        <h2>8. Governing Law</h2>
        <p>These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India.</p>
      </div>

      <div className="info-section">
        <h2>9. Contact</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Legal Queries', val:'legal@auriom.com'},
            {icon:'🏢', title:'Registered Office', val:'AURIOM Technologies Pvt. Ltd., Tech Park, Whitefield, Bangalore 560066'},
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

export default TermsConditions;
