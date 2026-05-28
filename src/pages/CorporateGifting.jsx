import React from 'react';
import './InfoPages.css';

const CorporateGifting = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Business</span>
        <h1>Corporate Gifting</h1>
        <p>Impress clients, reward employees, and celebrate milestones with premium AURIOM audio products — customized with your brand.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>Why Choose AURIOM for Corporate Gifts?</h2>
        <div className="info-grid">
          {[
            {icon:'🎁', title:'Premium Quality', desc:'Every recipient will feel valued. Our products are sleek, high-performing, and built to impress.'},
            {icon:'🏷️', title:'Custom Branding', desc:'Add your company logo on packaging, earbuds, or cases. Minimum order of just 50 units.'},
            {icon:'💰', title:'Bulk Discounts', desc:'Save 15–35% on bulk orders. The more you order, the more you save.'},
            {icon:'🚀', title:'Fast Turnaround', desc:'Standard bulk orders dispatched in 7–10 business days. Rush orders available.'},
            {icon:'📦', title:'Custom Packaging', desc:'Elegant gift boxes with custom inserts, printed cards, and branded ribbon.'},
            {icon:'🧾', title:'GST Invoice', desc:'Full GST-compliant invoicing available for seamless business accounting.'},
          ].map(f => (
            <div className="info-card" key={f.title}>
              <div style={{fontSize:'28px', marginBottom:'8px'}}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Popular Corporate Gift Picks</h2>
        <div className="info-grid">
          {[
            {name:'AURIOM Nirvana Ion', cat:'True Wireless Earbuds', price:'From ₹1,299/unit', img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80'},
            {name:'AURIOM Rockerz 450', cat:'Wireless Headphones', price:'From ₹1,499/unit', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80'},
            {name:'AURIOM Wave Call', cat:'Smart Watch', price:'From ₹2,199/unit', img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80'},
            {name:'AURIOM Stone 1200F', cat:'Bluetooth Speaker', price:'From ₹1,799/unit', img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80'},
          ].map(p => (
            <div className="info-card" key={p.name} style={{padding:0, overflow:'hidden'}}>
              <img src={p.img} alt={p.name} style={{width:'100%', height:'160px', objectFit:'cover'}} />
              <div style={{padding:'16px'}}>
                <h3 style={{marginBottom:'4px', marginTop:0}}>{p.name}</h3>
                <p style={{margin:'0 0 6px', fontSize:'12px'}}>{p.cat}</p>
                <p style={{margin:0, fontWeight:800, color:'var(--text-primary)', fontSize:'var(--font-size-sm)'}}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Pricing Tiers</h2>
        <div className="info-grid">
          {[
            {qty:'50–199 units', disc:'15% OFF', badge:'Starter'},
            {qty:'200–499 units', disc:'22% OFF', badge:'Business'},
            {qty:'500–999 units', disc:'28% OFF', badge:'Enterprise'},
            {qty:'1000+ units', disc:'35% OFF', badge:'Premium Partner'},
          ].map(t => (
            <div className="info-card" key={t.badge} style={{textAlign:'center'}}>
              <div style={{background:'rgba(0,0,0,0.06)', borderRadius:'999px', padding:'3px 12px', display:'inline-block', fontSize:'11px', fontWeight:700, marginBottom:'10px'}}>{t.badge}</div>
              <h3 style={{margin:'0 0 6px'}}>{t.qty}</h3>
              <p style={{margin:0, fontSize:'var(--font-size-xl)', fontWeight:900, color:'var(--text-primary)'}}>{t.disc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Get a Quote</h2>
        <div className="info-card">
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', flexWrap:'wrap'}}>
              <input type="text" placeholder="Company Name" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
              <input type="text" placeholder="Contact Person" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            </div>
            <input type="email" placeholder="Business Email" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <input type="tel" placeholder="Phone Number" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none'}} />
            <textarea placeholder="Tell us about your requirement — product type, quantity, budget, delivery timeline..." rows="4" style={{padding:'12px 16px', border:'1px solid var(--border-color)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-family)', fontSize:'var(--font-size-sm)', outline:'none', resize:'vertical'}}></textarea>
            <button className="btn btn-primary" style={{alignSelf:'flex-start'}}>Submit Enquiry</button>
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default CorporateGifting;
