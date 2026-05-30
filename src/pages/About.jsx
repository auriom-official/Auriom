import React from 'react';
import './InfoPages.css';

const AboutPage = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Our Story</span>
        <h1>About AURIOM</h1>
        <p>We started with a simple belief: smart technology should empower daily living. Today, we are India's fastest growing premium tech &amp; smart gadgets brand.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>Our Story</h2>
        <p>From a very young age, our founder was deeply fascinated by technology and the power of entrepreneurship. Driven by a constant excitement for innovative smart gadgets and the vision of building products from the ground up, he pursued this passion relentlessly. After gaining profound experience in the tech sector and launching multiple successful ventures, he sought to create a brand that could make cutting-edge innovation a standard for every consumer. The ultimate culmination of this visionary journey was AURIOM — a leading smart gadgets brand designed to elevate your everyday lifestyle with futuristic electronics.</p>
        <p>Today, AURIOM serves a rapidly growing community of active gadget enthusiasts, providing them with top-tier gadgets engineered to excel in everyday situations — whether you're working, traveling, playing, or staying healthy.</p>
      </div>

      <div className="info-section">
        <h2>Our Mission</h2>
        <div className="info-card">
          <h3>🎯 Empower Daily Lives through Intelligent Technology</h3>
          <p>Our mission is to integrate next-generation smart technology seamlessly into daily lifestyles. We strive to design and deliver high-performance, durable, and intuitive gadgets that foster productivity, connection, and growth — ensuring that premium, future-ready innovation is within everyone's reach.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Our Numbers</h2>
        <div className="info-grid">
          {[
            {num:'55k+', label:'Happy Customers'},
            {num:'4.8★', label:'Average Rating'},
            {num:'Lakhs+', label:'Revenue Generated'},
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
          {icon:'⚡', title:'Uncompromising Quality', desc:'We believe that premium engineering is non-negotiable. Every gadget undergoes rigorous testing to guarantee unmatched durability and performance.'},
          {icon:'🔬', title:'Human-Centric Design', desc:'Technology must serve a real purpose. We obsess over ergonomic form factors, seamless user experience, and aesthetic excellence.'},
          {icon:'🤝', title:'Customer Obsession', desc:'Our community is our compass. We stand by our commitments with clear policies, responsive assistance, and honest tech specifications.'},
          {icon:'🚀', title:'Future-Ready Innovation', desc:'We build for tomorrow. Our team is dedicated to exploring new technological frontiers, keeping our product ecosystem ahead of the curve.'},
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
            {name:'Govinda Yadav', role:'Co-Founder & CEO', bg:'#E8F4FD'},
            {name:'Unknown', role:'Co-Founder', bg:'#FDE8F4'},
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
