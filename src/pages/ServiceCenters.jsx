import React from 'react';
import './InfoPages.css';

const ServiceCenters = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Help Center</span>
        <h1>Service Centers</h1>
        <p>Walk into any AURIOM authorized service center for quick diagnosis, repairs, and expert support across India.</p>
      </div>
    </div>
    <div className="info-content">
      <div className="info-section">
        <h2>Find a Center Near You</h2>
        <div className="info-card" style={{marginBottom:'24px'}}>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <input type="text" placeholder="Enter city or pincode" style={{flex:1, minWidth:'200px', padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Service Centers by City</h2>
        {[
          { city:'Mumbai', centers:[
            { name:'AURIOM Service Hub — Andheri', address:'Shop 12, Lokhandwala Complex, Andheri West, Mumbai 400058', phone:'022-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
            { name:'AURIOM Service Hub — Thane', address:'G-14, Viviana Mall, Thane West, Mumbai 400601', phone:'022-4567-8902', hours:'Mon–Sun: 11AM–8PM' },
          ]},
          { city:'Delhi NCR', centers:[
            { name:'AURIOM Service Hub — Connaught Place', address:'A-34, Middle Circle, Connaught Place, New Delhi 110001', phone:'011-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
            { name:'AURIOM Service Hub — Noida', address:'Level 2, Sector 18 Mall, Noida 201301', phone:'0120-4567890', hours:'Mon–Sun: 10AM–8PM' },
          ]},
          { city:'Bangalore', centers:[
            { name:'AURIOM Service Hub — Indiranagar', address:'12th Main, 100 Feet Road, Indiranagar, Bangalore 560038', phone:'080-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
          ]},
          { city:'Chennai', centers:[
            { name:'AURIOM Service Hub — T. Nagar', address:'23, Panagal Park, T. Nagar, Chennai 600017', phone:'044-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
          ]},
          { city:'Hyderabad', centers:[
            { name:'AURIOM Service Hub — Banjara Hills', address:'Road No. 2, Banjara Hills, Hyderabad 500034', phone:'040-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
          ]},
          { city:'Pune', centers:[
            { name:'AURIOM Service Hub — FC Road', address:'411 FC Road, Deccan Gymkhana, Pune 411004', phone:'020-4567-8901', hours:'Mon–Sat: 10AM–7PM' },
          ]},
        ].map(city => (
          <div key={city.city} style={{marginBottom:'32px'}}>
            <h3 style={{fontSize:'var(--font-size-lg)', fontWeight:800, marginBottom:'16px'}}>{city.city}</h3>
            <div className="info-grid">
              {city.centers.map(c => (
                <div className="info-card" key={c.name}>
                  <h3>{c.name}</h3>
                  <p>📍 {c.address}</p>
                  <p>📞 {c.phone}</p>
                  <p>🕐 {c.hours}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="info-section">
        <h2>Can't Visit a Center?</h2>
        <p>We offer <strong>doorstep pickup & drop</strong> service in 50+ cities. Our team picks up your device, gets it repaired at our certified lab, and delivers it back to you within 7–10 working days.</p>
        <div className="info-grid">
          {[
            {icon:'📞', title:'Book Pickup', val:'Call 1800-123-AURIOM'},
            {icon:'📧', title:'Email Us', val:'service@auriom.com'},
            {icon:'💬', title:'WhatsApp', val:'+91 98765 43210'},
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

export default ServiceCenters;
