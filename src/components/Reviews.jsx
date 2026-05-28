import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Reviews.css';

const reviewData = [
  { id: 1, name: 'Priya Sharma', rating: 5, product: 'AURIOM Nirvana Ion', text: 'Absolutely love these earbuds! The bass is incredible and the battery life lasts me the entire week. Best purchase I\'ve made this year.', date: 'May 2026' },
  { id: 2, name: 'Rahul Verma', rating: 5, product: 'AURIOM Wave Call', text: 'The BT calling feature is crystal clear. My colleagues on Zoom calls can\'t believe I\'m using a smartwatch mic. Amazing value for money!', date: 'May 2026' },
  { id: 3, name: 'Anita Desai', rating: 4, product: 'AURIOM Rockerz 450', text: 'Super comfortable for long listening sessions. I wear these 8 hours a day while working from home. Sound quality is top notch.', date: 'Apr 2026' },
  { id: 4, name: 'Vikram Singh', rating: 5, product: 'AURIOM Immortal 121', text: 'As a mobile gamer, the low latency mode is a game changer. No audio delay at all! RGB lights are a cool bonus.', date: 'Apr 2026' },
  { id: 5, name: 'Sneha Patel', rating: 5, product: 'AURIOM Stone 1200F', text: 'Took this speaker to a pool party and it survived being splashed multiple times. Sound is loud and clear. Highly recommend!', date: 'Mar 2026' },
  { id: 6, name: 'Arjun Nair', rating: 4, product: 'AURIOM Wave Fury', text: 'The 30-hour battery on this neckband is no joke. I charge it once a week. Magnetic earbuds are very convenient.', date: 'Mar 2026' },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewData.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewData.length) % reviewData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = reviewData[currentIndex];

  return (
    <section className="reviews-section py-section" id="reviews">
      <div className="container">
        <h2 className="section-title text-center">What Our Customers Say</h2>
        <p className="reviews-subtitle text-center">Trusted by millions of audiophiles across India</p>
        
        <div className="reviews-slider-container">
          <div className="review-card slider-mode">
            <div className="review-stars">{'★'.repeat(activeReview.rating)}{'☆'.repeat(5 - activeReview.rating)}</div>
            <p className="review-text">"{activeReview.text}"</p>
            <div className="review-meta">
              <div className="review-avatar">{activeReview.name.charAt(0)}</div>
              <div>
                <p className="review-name">{activeReview.name}</p>
                <p className="review-product">{activeReview.product} • {activeReview.date}</p>
              </div>
            </div>
          </div>
          
          <div className="slider-controls">
            <button onClick={prevReview} className="slider-btn" aria-label="Previous Review">
              <ChevronLeft size={24} />
            </button>
            <span className="slider-indicator">{currentIndex + 1} / {reviewData.length}</span>
            <button onClick={nextReview} className="slider-btn" aria-label="Next Review">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
