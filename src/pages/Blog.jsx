import React from 'react';
import './InfoPages.css';

const posts = [
  { date:'May 25, 2026', tag:'Guide', title:'True Wireless vs Neckband: Which Should You Buy in 2026?', body:'With so many options in the market, choosing between TWS earbuds and neckbands can be overwhelming. We break down the pros and cons of each for different lifestyles — gym-goers, office workers, and commuters.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', read:'8 min read' },
  { date:'May 15, 2026', tag:'Tips', title:'10 Tips to Get the Best Sound from Your AURIOM Earbuds', body:'Out-of-box experience is great, but with these 10 tips — from EQ tuning to ear tip selection — you can take your listening to the next level and squeeze every ounce of quality from your device.', img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', read:'5 min read' },
  { date:'Apr 30, 2026', tag:'Technology', title:'What is ANC (Active Noise Cancellation) and How Does AURIOM Do It?', body:'ANC is more than just blocking noise. We dive deep into the hybrid ANC technology powering our premium lineup, how it uses microphones and DSP chips, and why AURIOM\'s implementation stands out.', img:'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80', read:'10 min read' },
  { date:'Apr 10, 2026', tag:'Lifestyle', title:'The Perfect Work-From-Home Audio Setup Under ₹5000', body:'Building a complete audio workspace doesn\'t have to break the bank. We curate the best AURIOM products to build an incredible WFH setup — headphones, earbuds, and speakers — all under ₹5000.', img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80', read:'6 min read' },
];

const Blog = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Blog</span>
        <h1>Read Our Blog</h1>
        <p>Audio tips, product deep dives, buying guides, and lifestyle stories from the AURIOM team.</p>
      </div>
    </div>
    <div className="info-content">
      <div style={{display:'flex', flexDirection:'column', gap:'32px'}}>
        {posts.map((p, i) => (
          <div key={i} className="info-card" style={{padding:0, overflow:'hidden', display:'flex', flexWrap:'wrap'}}>
            <img src={p.img} alt={p.title} style={{width:'100%', maxWidth:'320px', objectFit:'cover', minHeight:'220px'}} />
            <div style={{flex:1, padding:'28px', minWidth:'240px'}}>
              <div style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{background:'rgba(0,0,0,0.07)', padding:'3px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700, color:'var(--text-primary)'}}>{p.tag}</span>
                <span style={{fontSize:'12px', color:'var(--text-secondary)'}}>{p.date} · {p.read}</span>
              </div>
              <h3 style={{fontSize:'var(--font-size-lg)', fontWeight:800, marginBottom:'10px', lineHeight:1.3}}>{p.title}</h3>
              <p style={{lineHeight:1.7}}>{p.body}</p>
              <button className="btn btn-outline" style={{marginTop:'16px'}}>Read Article</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
