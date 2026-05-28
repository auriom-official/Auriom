import React from 'react';
import './TrustBadges.css';

const badges = [
  { icon: '🛡️', title: '1 Year Warranty', desc: 'On all products' },
  { icon: '🧾', title: 'GST Billing', desc: 'For business orders' },
  { icon: '🚚', title: 'Free Express Delivery', desc: 'On orders above ₹499' },
  { icon: '🔄', title: '7-Day Replacement', desc: 'Easy returns' },
];

const TrustBadges = () => (
  <section className="trust-badges">
    <div className="container">
      <div className="trust-grid">
        {badges.map((b, i) => (
          <div className="trust-item" key={i}>
            <span className="trust-icon">{b.icon}</span>
            <div>
              <p className="trust-title">{b.title}</p>
              <p className="trust-desc">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
