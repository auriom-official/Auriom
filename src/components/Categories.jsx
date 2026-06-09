import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Categories.css';

const Categories = () => {
  const { categories } = useData();

  return (
    <section className="categories-section py-section" id="categories">
      <div className="container">
        <h2 className="section-title text-center">Shop by Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
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
