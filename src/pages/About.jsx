import React from 'react';
import './InfoPages.css';
import govindaImg from '../../assets/people/govinda.png';


const AboutPage = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <h1>About AURIOM</h1>
        <p>We started with a simple belief: smart technology should empower daily living. Today, we are India's fastest growing premium tech &amp; smart gadgets brand.</p>
      </div>
    </div>
    <div className="info-content">

      <div className="info-section">
        <h2>Our Story</h2>
        <p>AURIOM wasn't born in a boardroom; it was born out of a genuine frustration with the status quo. Our founder, an avid tech enthusiast and serial entrepreneur, realized that the smart gadget market was polarized: either you paid exorbitant prices for premium design, or settled for cheap, uninspired plastic that broke in a month. Driven by an obsession with hardware innovation, they set out to bridge this gap.</p>
        <p>We started in a small workshop with a simple vision: democratize premium technology. After hundreds of prototypes, sleepless nights, and direct feedback from early adopters, AURIOM launched its first flagship product. The response was overwhelming. Today, AURIOM is more than just a brand; it's a movement of tech-forward thinkers who demand more from their devices. From wireless audio to smart wearables, our products are meticulously crafted to blend seamlessly into your life while delivering uncompromising performance.</p>
      </div>

      <div className="info-section">
        <h2>Our Mission</h2>
        <div className="info-card">
          <h3>🎯 Empower Daily Lives through Intelligent Technology</h3>
          <p>Our mission is simple yet profound: to make the future accessible today. We believe that cutting-edge technology shouldn't be a luxury reserved for the few, but a standard enjoyed by the many. We are committed to pushing the boundaries of what's possible, engineering intelligent, beautiful, and highly functional gadgets that elevate every aspect of your daily routine. At AURIOM, we don't just build products; we engineer experiences that inspire.</p>
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
            {name:'Govinda Yadav', role:'Co-Founder & CEO', bg:'#E8F4FD', img: govindaImg},
            {name:'Unknown', role:'Co-Founder', bg:'#FDE8F4'},
          ].map(p => (
            <div className="info-card" key={p.name} style={{textAlign:'center'}}>
              <div style={{width:80, height:80, borderRadius:'50%', background:p.bg, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
                {p.img ? (
                  <img src={p.img} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                ) : (
                  <span style={{fontSize:'28px', fontWeight:900, color:'var(--text-primary)'}}>{p.name.charAt(0)}</span>
                )}
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
