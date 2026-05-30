import React from 'react';
import './TrustBadges.css';

const badges = [
  { icon: '⚡', title: 'Certified Smart Gadgets', desc: 'Premium quality gear' },
  { icon: '🔒', title: 'Secure SSL Checkout', desc: '100% safe payments' },
  { icon: '🚚', title: 'Free Express Delivery', desc: 'On orders above ₹499' },
  { icon: '🔄', title: '2 Days Return Policy', desc: 'Hassle-free replacement' },
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
