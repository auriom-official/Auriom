import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopHeader.css';

const messages = [
  "Get Extra 5% Off On Prepaid Orders | Code: AURIOM5",
  "Free Express Delivery on all orders above ₹499",
  "New Launch: AURIOM Nirvana Ion with 120hrs playback!"
];

const TopHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-header">
      <p className="apple-transition" key={currentIndex}>
        {messages[currentIndex]} | <Link to="/shop"><strong>Shop Now</strong></Link>
      </p>
    </div>
  );
};

export default TopHeader;
