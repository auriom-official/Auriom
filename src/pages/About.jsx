import React from 'react';
import './InfoPages.css';

const AboutPage = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Our Story</span>
        <h1>About AURIOM</h1>
        <p>We started with a simple belief: premium audio shouldn't cost a fortune. Today, we're India's fastest growing audio & wearables brand.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>Our Story</h2>
        <p>AURIOM was born in 2021 in a small Bangalore garage where three engineers and one designer spent sleepless nights obsessing over the perfect sound signature. Frustrated by products that were either too expensive or too cheap, they set out to build something different — technology that listens back.</p>
        <p>Today, AURIOM serves over <strong>5 million customers</strong> across India and is expanding globally. Our products are designed in India, engineered with world-class components, and built to elevate every listening experience — whether you're gaming, commuting, working out, or simply unwinding.</p>
      </div>

      <div className="info-section">
        <h2>Our Mission</h2>
        <div className="info-card">
          <h3>🎯 Democratize Premium Audio</h3>
          <p>Make world-class sound technology accessible to every Indian, at every price point, without compromise on quality, design, or durability.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Our Numbers</h2>
        <div className="info-grid">
          {[
            {num:'5M+', label:'Happy Customers'},
            {num:'50+', label:'Product Models'},
            {num:'150+', label:'Cities Served'},
            {num:'4.5★', label:'Average Rating'},
            {num:'99.2%', label:'On-Time Delivery'},
            {num:'₹500Cr+', label:'Revenue FY25'},
          ].map(s => (
            <div className="info-card" style={{textAlign:'center'}} key={s.label}>
              <div style={{fontSize:'clamp(1.8rem, 3vw, 2.5rem)', fontWeight:900, color:'var(--text-primary)', marginBottom:'6px'}}>{s.num}</div>
              <p style={{margin:0, fontWeight:600, color:'var(--text-secondary)', fontSize:'var(--font-size-sm)'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>Our Values</h2>
        {[
          {icon:'🎵', title:'Sound First', desc:'Every design decision starts with how it will sound and feel, not how it will look on a spec sheet.'},
          {icon:'🔬', title:'Relentless Innovation', desc:'Our R&D team files over 20 patents annually, pushing the boundaries of audio physics.'},
          {icon:'🌍', title:'India & Beyond', desc:'Proudly Indian, globally aspirational. We celebrate Indian engineering talent and craftsmanship.'},
          {icon:'♻️', title:'Sustainability', desc:'Our packaging is 100% recyclable. We are committed to carbon-neutral operations by 2030.'},
        ].map(v => (
          <div className="info-card" key={v.title} style={{marginBottom:'16px'}}>
            <div style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
              <div style={{fontSize:'28px', flexShrink:0}}>{v.icon}</div>
              <div>
                <h3 style={{marginTop:0, marginBottom:'6px'}}>{v.title}</h3>
                <p style={{margin:0}}>{v.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="info-section">
        <h2>Leadership Team</h2>
        <div className="info-grid">
          {[
            {name:'Aryan Mehta', role:'Co-Founder & CEO', bg:'#E8F4FD'},
            {name:'Priya Kaur', role:'Co-Founder & CTO', bg:'#FDE8F4'},
            {name:'Rohan Das', role:'VP, Product Design', bg:'#E8FDE8'},
            {name:'Sneha Iyer', role:'VP, Marketing', bg:'#FDF4E8'},
          ].map(p => (
            <div className="info-card" key={p.name} style={{textAlign:'center'}}>
              <div style={{width:80, height:80, borderRadius:'50%', background:p.bg, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', fontWeight:900, color:'var(--text-primary)'}}>
                {p.name.charAt(0)}
              </div>
              <h3 style={{marginTop:0, marginBottom:'4px'}}>{p.name}</h3>
              <p style={{margin:0, fontSize:'var(--font-size-xs)'}}>{p.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default AboutPage;
