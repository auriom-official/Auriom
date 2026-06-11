import React from 'react';
import './InfoPages.css';

const newsItems = [
  { date:'June 10, 2026', tag:'Launch', title:'AURIOM Zero — The Future of Wearables is Here', body:'Say goodbye to clunky gadgets. We are thrilled to unveil AURIOM Zero, our minimalist smart ring that tracks everything from your vitals to your productivity flows seamlessly without you even noticing it. Welcome to invisible tech.', img:'https://images.unsplash.com/photo-1599577180575-8025ab7a8f89?w=600&q=80' },
  { date:'May 28, 2026', tag:'Milestone', title:'Bootstrapped & Profitable: 100K Active Users!', body:'What started in a small dorm room is now a community of over 100,000 active users. We haven\'t taken a single dime of VC money, which means we answer only to YOU. Thank you for believing in our crazy vision.', img:'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=600&q=80' },
  { date:'Apr 15, 2026', tag:'Culture', title:'Why We Banned Meetings on Wednesdays', body:'We’re building fast, and context-switching is the enemy of innovation. Read about our experiment with "No-Meeting Wednesdays" and how it boosted our engineering team\'s shipping speed by 40%.', img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
  { date:'Feb 10, 2026', tag:'Partnership', title:'AURIOM x EcoDrive: Going 100% Carbon Neutral', body:'Innovation shouldn\'t cost the Earth. We\'ve partnered with EcoDrive to ensure every AURIOM product shipped is 100% carbon neutral. Because the future we’re building needs to be green.', img:'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80' },
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
