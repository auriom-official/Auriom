import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { getDailySeed, seededShuffle } from '../utils/shuffle';
import './BestSellers.css';

const BestSellers = () => {
  const { addToCart } = useCart();
  const { products } = useData();

  // Show only bestsellers tagged items on homepage, or fallback to all products
  const filtered = products.filter(p => p.tag && p.tag.toLowerCase().includes('best seller'));
  const pool = filtered.length >= 3 ? filtered : products;

  // Randomize the products daily and limit to top 6
  const displayProducts = React.useMemo(() => {
    if (!pool || pool.length === 0) return [];
    const seed = getDailySeed();
    return seededShuffle(pool, seed).slice(0, 6);
  }, [pool]);

  return (
    <section className="bestsellers-section py-section" id="bestsellers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sale <span style={{ textDecoration: 'underline', color: 'var(--text-primary)' }}>Is Live</span></h2>
          <Link to="/shop" className="view-all">View All Options →</Link>
        </div>

        {/* 3-row Product Grid */}
        <div className="products-grid">
          {displayProducts.map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>

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
                  <span className="star">★</span> {product.rating ?? 0} | {(product.reviews ?? 0).toLocaleString()}
                </div>
                <div className="product-price-row">
                  <span className="price">₹{(product.price ?? 0).toLocaleString()}</span>
                  <span className="original-price">₹{(product.originalPrice ?? 0).toLocaleString()}</span>
                  <span className="discount">{product.discount ?? 0}% off</span>
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
