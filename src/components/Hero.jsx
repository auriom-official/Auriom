import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Hero.css';

const fallbackSlides = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1920&h=800',
    link: '/shop',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1920&h=800',
    link: '/shop',
  }
];

const Hero = () => {
  const { banners } = useData();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Map database banners or use fallback
  const slides = (banners && banners.length > 0) ? banners.map(b => ({
    id: b.id,
    img: b.img,
    link: b.category ? `/shop?category=${encodeURIComponent(b.category)}` : '/shop',
    title: b.category || 'Shop Now'
  })) : fallbackSlides;

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (slides.length <= 1) return; // don't slide if only 1 banner
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
  }, [slides.length]);

  useEffect(() => {
    startAutoSlide();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoSlide]);

  const goTo = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  const goNext = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrent(prev => (prev + 1) % slides.length);
    startAutoSlide();
  }, [startAutoSlide, slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  }, [startAutoSlide, slides.length]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const SWIPE_THRESHOLD = 50;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();   // swipe left → next
      else goPrev();            // swipe right → prev
    }
  };

  return (
    <section className="hero-wrapper">
      <div
        className="hero"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hero-slider">
        {slides.map((slide, index) => (
          <div className={`hero-slide ${index === current ? 'active' : ''}`} key={slide.id}>
            <Link to={slide.link} style={{ display: 'block', width: '100%', height: '100%' }}>
              <img src={slide.img} alt={slide.title || 'AURIOM Banner'} className="hero-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
          </div>
        ))}
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
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
      )}
    </section>
  );
};

export default Hero;

