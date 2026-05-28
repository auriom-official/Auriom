import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './BestSellers.css';

const tabs = ['All Deals', 'True Wireless', 'Headphones', 'Smart Watches', 'Speakers', 'Neckbands'];

const BestSellers = () => {
  const [activeTab, setActiveTab] = useState('All Deals');
  const { addToCart } = useCart();

  const filtered = activeTab === 'All Deals'
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <section className="bestsellers-section py-section" id="bestsellers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sale <span style={{ textDecoration: 'underline', color: 'var(--text-primary)' }}>Is Live</span></h2>
          <Link to="/shop" className="view-all">View All →</Link>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab}</button>
          ))}
        </div>

        {/* 3-row Product Grid */}
        <div className="products-grid">
          {filtered.map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              {product.tag && <div className="product-tag">{product.tag}</div>}
              <div className="product-playback">{product.playback}</div>
              <div className="product-img-wrapper">
                <img src={product.img} alt={product.name} className="product-img" loading="lazy" />
                <button 
                  className="quick-add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={20} color="white" />
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-rating">
                  <span className="star">★</span> {product.rating} | {product.reviews.toLocaleString()}
                </div>
                <div className="product-price-row">
                  <span className="price">₹{product.price.toLocaleString()}</span>
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="discount">{product.discount}% off</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
