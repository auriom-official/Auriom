import React from 'react';
import './InfoPages.css';

const posts = [
  { date:'June 05, 2026', tag:'Engineering', title:'Building a Custom DSP from Scratch: The AURIOM Way', body:'Most brands use off-the-shelf audio chips. We decided that wasn\'t good enough for our community. Here is an inside look at how our tiny engineering team built a custom Digital Signal Processor that outperforms the industry giants.', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', read:'12 min read' },
  { date:'May 20, 2026', tag:'Design', title:'The Death of the "Gamer" Aesthetic', body:'Neon lights and aggressive angles are out. We discuss our design philosophy: "Tech that blends in." Learn why we obsess over matte finishes, tactile feedback, and organic shapes that look good in both a boardroom and a coffee shop.', img:'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80', read:'6 min read' },
  { date:'Apr 25, 2026', tag:'Founder Diary', title:'Failing Fast: The Prototype That Almost Broke Us', body:'We talk a lot about our successes, but today we’re sharing a failure. The "AURIOM Nexus" was supposed to be our flagship, but we scrapped it a week before production. Here’s why walking away was the hardest, but best decision we made.', img:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', read:'8 min read' },
  { date:'Mar 12, 2026', tag:'Community', title:'How Our Discord Channel Designed Our Latest Feature', body:'We didn\'t hire a pricey consulting firm to tell us what to build next. We just asked you. A deep dive into how our open-source community directly influenced the ANC 4.0 firmware update.', img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', read:'5 min read' },
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
