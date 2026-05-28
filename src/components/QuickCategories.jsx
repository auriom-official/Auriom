import React from 'react';
import { Link } from 'react-router-dom';
import './QuickCategories.css';

const categories = [
  { id: 1, name: 'Best Sellers', icon: '🔥' },
  { id: 2, name: 'True Wireless', icon: '🎧' },
  { id: 3, name: 'Headphones', icon: '📻' },
  { id: 4, name: 'Smart Watches', icon: '⌚' },
  { id: 5, name: 'Neckbands', icon: '📿' },
  { id: 6, name: 'Speakers', icon: '🔊' },
];

const QuickCategories = () => {
  return (
    <div className="quick-categories">
      <div className="container">
        <div className="quick-categories-scroll">
          {categories.map(cat => (
            <Link to={`/shop?category=${cat.name}`} key={cat.id} className="quick-cat-item">
              <div className="quick-cat-icon">{cat.icon}</div>
              <span className="quick-cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickCategories;
