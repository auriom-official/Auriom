import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css';

const exploreSections = [
  {
    title: 'Explore Bestsellers',
    bg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800&h=400',
    link: '/bestsellers',
    cta: 'Shop Bestsellers',
  },
  {
    title: 'New Launches',
    bg: 'https://images.unsplash.com/photo-1631867726798-47e8ed1e3e03?auto=format&fit=crop&q=80&w=800&h=400',
    link: '/new-launches',
    cta: 'View New Arrivals',
  },
  {
    title: 'Smart Watch Collection',
    bg: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800&h=400',
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
