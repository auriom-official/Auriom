import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './Shop.css';

const allCategories = ['All', ...new Set(products.map(p => p.category))];
const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState('Popular');
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    let list = category === 'All' ? [...products] : products.filter(p => p.category === category);
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <main className="shop-page apple-transition">
      <div className="container">
        <div className="shop-header">
          <h1 className="shop-title">Shop All Products</h1>
          <p className="shop-count">{filtered.length} products</p>
        </div>

        <div className="shop-controls">
          <div className="shop-filters">
            {allCategories.map(c => (
              <button
                key={c}
                className={`filter-tab ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>
          <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
            {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="shop-grid">
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
    </main>
  );
};

export default Shop;
