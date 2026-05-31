import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Headphones, Music, Watch, Activity, Speaker } from 'lucide-react';
import './QuickCategories.css';

const categories = [
  { id: 1, name: 'Best Sellers', path: '/bestsellers', icon: Flame, color: '#ff4d4f' },
  { id: 2, name: 'Latest', path: '/new-launches', icon: Zap, color: '#faad14' },
  { id: 3, name: 'True Wireless', path: '/shop?category=True Wireless', icon: Headphones, color: '#1890ff' },
  { id: 4, name: 'Headphones', path: '/shop?category=Headphones', icon: Music, color: '#eb2f96' },
  { id: 5, name: 'Smart Watches', path: '/shop?category=Smart Watches', icon: Watch, color: '#52c41a' },
  { id: 6, name: 'Neckbands', path: '/shop?category=Neckbands', icon: Activity, color: '#722ed1' },
  { id: 7, name: 'Speakers', path: '/shop?category=Speakers', icon: Speaker, color: '#13c2c2' },
];

const QuickCategories = () => {
  return (
    <div className="quick-categories">
      <div className="container">
        <div className="quick-categories-scroll">
          {categories.map(cat => {
            const IconComponent = cat.icon;
            return (
              <Link to={cat.path} key={cat.id} className="quick-cat-item">
                <div className="quick-cat-icon">
                  <IconComponent size={22} strokeWidth={2} style={{ color: cat.color }} />
                </div>
                <span className="quick-cat-name">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickCategories;
