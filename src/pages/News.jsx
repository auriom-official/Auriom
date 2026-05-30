import React from 'react';
import './InfoPages.css';

const newsItems = [
  { date:'May 20, 2026', tag:'Product Launch', title:'AURIOM Nirvana Ion 2 — Redefining 150-Hour Battery Life', body:'We are thrilled to announce the AURIOM Nirvana Ion 2, our most ambitious TWS yet. With 150 hours of total playback, ANC 3.0, and Spatial Audio, it sets a new benchmark for the industry.', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' },
  { date:'Apr 12, 2026', tag:'Award', title:'AURIOM wins "Best Gadget Brand of the Year" at Tech India Awards 2026', body:'Competing against international heavyweights, AURIOM was recognized for its exceptional product quality, customer satisfaction scores, and disruptive technology innovation.', img:'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80' },
  { date:'Mar 05, 2026', tag:'Expansion', title:'AURIOM Opens 50 New Exclusive Experience Stores Across India', body:'From Leh to Kanyakumari, AURIOM is bringing its products closer to you. Visit your nearest Experience Store for demos, personalized recommendations, and instant service.', img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
  { date:'Feb 14, 2026', tag:'Milestone', title:'AURIOM crosses 50k Happy Customers — A Thank You from our Founders', body:'Fifty thousand. A milestone that means the world to us. We thank each and every one of our 55k+ active customers who believed in our vision, and we promise to keep delivering next-gen gadget experiences every single day.', img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80' },
];

const News = () => (
  <div className="info-page apple-transition">
    <div className="info-hero">
      <div className="container">
        <span className="info-hero-label">Newsroom</span>
        <h1>AURIOM in the News</h1>
        <p>Latest press releases, product announcements, and milestones from the AURIOM universe.</p>
      </div>
    </div>
    <div className="info-content">
      <div style={{display:'flex', flexDirection:'column', gap:'32px'}}>
        {newsItems.map((n,i) => (
          <div key={i} className="info-card" style={{padding:0, overflow:'hidden'}}>
            <img src={n.img} alt={n.title} style={{width:'100%', height:'220px', objectFit:'cover'}} />
            <div style={{padding:'24px'}}>
              <div style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'12px'}}>
                <span style={{background:'rgba(0,0,0,0.07)', padding:'3px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700, color:'var(--text-primary)'}}>{n.tag}</span>
                <span style={{fontSize:'12px', color:'var(--text-secondary)'}}>{n.date}</span>
              </div>
              <h3 style={{fontSize:'var(--font-size-lg)', fontWeight:800, marginBottom:'10px'}}>{n.title}</h3>
              <p style={{lineHeight:1.7}}>{n.body}</p>
              <button className="btn btn-outline" style={{marginTop:'16px'}}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default News;
