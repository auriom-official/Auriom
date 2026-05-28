import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const slides = [
  {
    id: 1,
    title: 'AUDIO',
    highlight: 'NIRVANA.',
    subtitle: 'Experience studio-grade sound with the next generation of AURIOM wireless technology.',
    badge: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Shop Now',
    link: '/shop',
  },
  {
    id: 2,
    title: 'KNOCKOUT',
    highlight: 'SALE.',
    subtitle: 'Deals of up to 80% off on premium earbuds, headphones & more. Limited time only!',
    badge: 'Mega Sale',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Grab Deals',
    link: '/shop',
  },
  {
    id: 3,
    title: 'SMART',
    highlight: 'WATCHES.',
    subtitle: 'Track fitness, make calls, and conquer your day. Starting from just ₹1,399.',
    badge: 'Trending',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Explore Watches',
    link: '/shop?category=Smart Watches',
  },
  {
    id: 4,
    title: 'GAMING',
    highlight: 'UNLEASHED.',
    subtitle: 'Ultra-low 50ms latency earbuds built for gamers. Dominate every match.',
    badge: 'Gaming Edition',
    img: 'https://images.unsplash.com/photo-1631867726798-47e8ed1e3e03?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Shop Gaming',
    link: '/shop',
  },
  {
    id: 5,
    title: 'PARTY',
    highlight: 'SPEAKERS.',
    subtitle: 'Crank up the volume with powerful wireless speakers. IPX7 rated for any weather.',
    badge: 'Party Mode',
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Shop Speakers',
    link: '/shop?category=Speakers',
  },
  {
    id: 6,
    title: 'WIRELESS',
    highlight: 'FREEDOM.',
    subtitle: 'Neckbands with up to 30 hours playback and ASAP™ fast charge technology.',
    badge: 'Best Value',
    img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Shop Neckbands',
    link: '/shop?category=Neckbands',
  },
  {
    id: 7,
    title: 'PREMIUM',
    highlight: 'HEADPHONES.',
    subtitle: 'Over-ear headphones with ANC, 50mm drivers, and 24 hours of non-stop playback.',
    badge: 'Premium Audio',
    img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Shop Headphones',
    link: '/shop?category=Headphones',
  },
  {
    id: 8,
    title: 'CORPORATE',
    highlight: 'GIFTING.',
    subtitle: 'Customize AURIOM products with your brand logo. Bulk orders at special prices.',
    badge: 'For Business',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1920&h=800',
    cta: 'Get Quote',
    link: '/contact',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setCurrent(index);

  return (
    <section className="hero-wrapper">
      <div className="hero">
        <div className="hero-slider">
        {slides.map((slide, index) => (
          <div className={`hero-slide ${index === current ? 'active' : ''}`} key={slide.id}>
            <Link to={slide.link} style={{ display: 'block', width: '100%', height: '100%' }}>
              <img src={slide.img} alt={slide.title} className="hero-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
          </div>
        ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
