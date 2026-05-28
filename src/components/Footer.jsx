import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">AURIOM</h2>
            <p className="footer-desc">
              Subscribe to our email alerts to be the first to know about new product drops and exclusive offers.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" className="newsletter-input" />
              <button className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h3 className="footer-heading">Shop</h3>
            <ul className="footer-links">
              <li><Link to="/shop?category=True Wireless Earbuds">True Wireless Earbuds</Link></li>
              <li><Link to="/shop?category=Wireless Headphones">Wireless Headphones</Link></li>
              <li><Link to="/shop?category=Smart Watches">Smart Watches</Link></li>
              <li><Link to="/shop?category=Wireless Speakers">Wireless Speakers</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><Link to="/warranty">Warranty & Support</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/service-centers">Service Centers</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about">About AURIOM</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/blog">Read Our Blog</Link></li>
              <li><Link to="/corporate-gifting">Corporate Gifting</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links-wrapper">
            <div className="social-links">
              <a href="https://facebook.com/auriom.official" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
              <a href="https://instagram.com/auriom.official" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>

          </div>
          <div className="footer-legal">
            <p>&copy; {new Date().getFullYear()} AURIOM. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
