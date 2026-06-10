import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css';

const exploreSections = [
  {
    title: 'Explore Bestsellers',
    bg: 'https://tse2.mm.bing.net/th/id/OIP.7f3gFCompEKlNKLlJjLRdwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    link: '/bestsellers',
    cta: 'Shop Bestsellers',
  },
  {
    title: 'New Launches',
    bg: 'https://wallpaperaccess.com/thumb/1771060.jpg',
    link: '/new-launches',
    cta: 'View New Arrivals',
  },
  {
    title: 'Smart Watch Collection',
    bg: 'https://cdn.corenexis.com/files/c/6498362720.jpg',
    link: '/shop?category=Smart Watches',
    cta: 'Explore Watches',
  },
];

const Explore = () => (
  <section className="explore-section py-section" id="explore">
    <div className="container">
      <h2 className="section-title text-center">Explore <span className="text-gradient">AURIOM</span></h2>
      <div className="explore-grid">
        {exploreSections.map((item, i) => (
          <Link to={item.link} className="explore-card" key={i}>
            <img src={item.bg} alt={item.title} className="explore-img" />
            <div className="explore-overlay">
              <h3 className="explore-title">{item.title}</h3>
              <span className="explore-cta">{item.cta} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Explore;
