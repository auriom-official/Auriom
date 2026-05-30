import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import './Bestsellers.css';

// Seeded random shuffle
function seededShuffle(array, seed) {
  let m = array.length, t, i;
  let copy = [...array];
  
  const random = () => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  while (m) {
    i = Math.floor(random() * m--);
    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
  }
  return copy;
}

const Bestsellers = () => {
  const { products, loading } = useData();
  const { addToCart } = useCart();

  const shuffledBestsellers = useMemo(() => {
    if (!products) return [];
    
    // Filter for bestsellers (either tags array contains "Best Seller" or fallback to tag string)
    let bestsellers = products.filter(p => {
      if (p.tags && Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase() === 'best seller')) return true;
      return p.tag && p.tag.toLowerCase().includes('best seller');
    });
    if (bestsellers.length < 4) {
      bestsellers = products.slice(0, 12); // fallback
    }

    // Calculate seed based on current 6-hour window
    const currentWindow = Math.floor(Date.now() / (1000 * 60 * 60 * 6));
    
    return seededShuffle(bestsellers, currentWindow);
  }, [products]);

  if (loading) {
    return <div style={{paddingTop: '100px', textAlign: 'center'}}>Loading Bestsellers...</div>;
  }

  return (
    <main className="bestsellers-page apple-transition">
      <div className="bestsellers-hero">
        <div className="container">
          <span className="info-hero-label">Top Rated & Most Loved</span>
          <h1>Our Bestsellers</h1>
          <p>Discover our most popular smart gadgets. The lineup refreshes every 6 hours to surface the hottest deals!</p>
        </div>
      </div>
      
      <div className="container py-section">
        <div className="products-grid">
          {shuffledBestsellers.map(product => (
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
    </main>
  );
};

export default Bestsellers;
