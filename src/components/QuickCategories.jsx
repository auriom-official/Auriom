import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';
import './QuickCategories.css';

const QuickCategories = () => {
  const { categories } = useData();

  const staticCats = [
    { id: 'static-1', name: 'Best Sellers', path: '/bestsellers', icon: Flame, color: '#ff4d4f' },
    { id: 'static-2', name: 'Latest', path: '/new-launches', icon: Zap, color: '#faad14' },
  ];

  return (
    <div className="quick-categories">
      <div className="container">
        <div className="quick-categories-scroll">
          {staticCats.map(cat => {
            const IconComponent = cat.icon;
            return (
              <Link to={cat.path} key={cat.id} className="quick-cat-item">
                <div className="quick-cat-icon" style={{ background: 'var(--glass-bg)' }}>
                  <IconComponent size={22} strokeWidth={2} style={{ color: cat.color }} />
                </div>
                <span className="quick-cat-name">{cat.name}</span>
              </Link>
            );
          })}
          
          {categories.map((cat, index) => (
            <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.id || index} className="quick-cat-item">
              <div className="quick-cat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
                 <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <span className="quick-cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickCategories;
