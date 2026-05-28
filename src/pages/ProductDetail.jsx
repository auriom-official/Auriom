import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return (
      <main className="container py-section" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '80px' }}>
        <h1>Product not found</h1>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Shop</Link>
      </main>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="product-detail-page apple-transition">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </div>

        <div className="pd-grid">
          {/* Image Section */}
          <div className="pd-image-section">
            <div className="pd-main-image">
              <img src={product.img} alt={product.name} />
            </div>
          </div>

          {/* Info Section */}
          <div className="pd-info-section">
            {product.tag && <span className="pd-tag">{product.tag}</span>}
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-rating">
              <span className="pd-stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price.toLocaleString()}</span>
              <span className="pd-original">₹{product.originalPrice.toLocaleString()}</span>
              <span className="pd-discount">{product.discount}% OFF</span>
            </div>
            <p className="pd-tax">Inclusive of all taxes</p>

            {/* Colors */}
            <div className="pd-colors">
              <p className="pd-label">Color</p>
              <div className="pd-color-options">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`pd-color-swatch ${i === selectedColor ? 'active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pd-qty-row">
              <p className="pd-label">Quantity</p>
              <div className="pd-qty-control">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button 
                className="btn btn-primary w-100"
                onClick={() => addToCart(product, qty)}
              >
                Add to Cart
              </button>
              <button 
                className="btn btn-accent w-100"
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/checkout/address');
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="pd-features">
              <p className="pd-label">Key Features</p>
              <div className="pd-feature-tags">
                {product.features.map((f, i) => (
                  <span key={i} className="pd-feature-tag">{f}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pd-description">
              <p className="pd-label">Description</p>
              <p className="pd-desc-text">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pd-related py-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="pd-related-grid">
              {related.map(rp => (
                <Link to={`/product/${rp.id}`} className="product-card" key={rp.id}>
                  <div className="product-img-wrapper">
                    <img src={rp.img} alt={rp.name} className="product-img" loading="lazy" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{rp.name}</h3>
                    <div className="product-price-row">
                      <span className="price">₹{rp.price.toLocaleString()}</span>
                      <span className="discount">{rp.discount}% off</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
