import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const categoryData = [
  { id: 1, name: 'True Wireless Earbuds', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 2, name: 'Wireless Headphones', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 3, name: 'Smart Watches', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 4, name: 'Wireless Speakers', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 5, name: 'Neckbands', img: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 6, name: 'Party Speakers', img: 'https://images.unsplash.com/photo-1520110120835-c96534a4c984?auto=format&fit=crop&q=80&w=400&h=400' },
];

const Categories = () => {
  return (
    <section className="categories-section py-section" id="categories">
      <div className="container">
        <h2 className="section-title text-center">Shop by Categories</h2>
        <div className="categories-grid">
          {categoryData.map(category => (
            <Link to={`/shop?category=${category.name}`} key={category.id} className="category-card">
              <div className="category-img-wrapper">
                <img src={category.img} alt={category.name} className="category-img" />
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
