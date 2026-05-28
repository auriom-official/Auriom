import React from 'react';
import './InfoPages.css';

const TrackOrder = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Track Your Order</h1>
        <p>Stay updated on your shipment in real-time. Enter your details below to see where your AURIOM product is.</p>
      </div>
    </div>
    <div className="info-content">
      <div className="info-section">
        <div className="info-card">
          <h3>📦 Enter Order Details</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'14px', marginTop:'16px'}}>
            <input type="text" placeholder="Order ID (e.g. AUR-2026-00123)" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <input type="email" placeholder="Email address used for order" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <button className="btn btn-primary" style={{alignSelf:'flex-start'}}>Track Order</button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Understanding Your Order Status</h2>
        <div className="info-grid">
          {[
            {icon:'✅', title:'Order Confirmed', desc:'We have received your order and payment. You will receive a confirmation email shortly.'},
            {icon:'🏭', title:'Processing', desc:'Your item is being picked, quality checked, and packed at our warehouse.'},
            {icon:'🚚', title:'Shipped', desc:'Your order is on its way! A tracking link has been sent to your registered email.'},
            {icon:'📬', title:'Out for Delivery', desc:'Your package is with the delivery partner and will arrive today.'},
            {icon:'🎉', title:'Delivered', desc:'Your AURIOM product has been delivered. Enjoy your new device!'},
          ].map(s => (
            <div className="info-card" key={s.title}>
              <div style={{fontSize:'28px', marginBottom:'8px'}}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Delivery Timelines</h2>
        <p>AURIOM partners with top logistics providers to ensure fast and reliable delivery across India.</p>
        <ul>
          <li><strong>Metro Cities</strong> (Mumbai, Delhi, Bangalore, etc.): 1–3 business days</li>
          <li><strong>Tier-2 Cities:</strong> 3–5 business days</li>
          <li><strong>Remote Areas & Tier-3:</strong> 5–7 business days</li>
          <li>Orders placed before 2:00 PM IST are processed the same day.</li>
          <li>Free express delivery on orders above ₹999.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Need More Help?</h2>
        <div className="info-grid">
          {[
            {icon:'📧', title:'Email Support', val:'support@auriom.com'},
            {icon:'📞', title:'Call Us', val:'1800-123-AURIOM (Mon–Sat, 9AM–6PM)'},
            {icon:'💬', title:'Live Chat', val:'Available on website 10AM–8PM IST'},
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

export default TrackOrder;
