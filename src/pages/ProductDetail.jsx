import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useData();
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Touch swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const fsStartX = useRef(0);
  const fsEndX = useRef(0);

  // Media query for mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (loading) {
    return <div style={{paddingTop: '100px', textAlign: 'center'}}>Loading Product...</div>;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <main className="container py-section" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '80px' }}>
        <h1>Product not found</h1>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Shop</Link>
      </main>
    );
  }

  // Build images array
  const images = [product.img, product.img2, product.img3, product.img4].filter(Boolean);

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Parse colors and features safely
  const colors = Array.isArray(product.colors) 
    ? product.colors 
    : (product.colors && typeof product.colors === 'string' ? product.colors.split(',').map(c => c.trim()) : []);

  const features = Array.isArray(product.features) 
    ? product.features 
    : (product.features && typeof product.features === 'string' ? product.features.split(',').map(f => f.trim()) : []);

  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;
  const starsCount = Math.min(5, Math.max(0, Math.round(rating)));

  // Image navigation
  const goToImg = (idx) => setCurrentImg(idx);
  const nextImg = () => setCurrentImg(prev => (prev + 1) % images.length);
  const prevImg = () => setCurrentImg(prev => (prev - 1 + images.length) % images.length);

  // Gallery touch handlers (mobile carousel)
  const handleGalleryTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const handleGalleryTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleGalleryTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImg();
      else prevImg();
    }
  };

  // Fullscreen touch handlers
  const handleFsTouchStart = (e) => {
    fsStartX.current = e.touches[0].clientX;
    fsEndX.current = e.touches[0].clientX;
  };
  const handleFsTouchMove = (e) => {
    fsEndX.current = e.touches[0].clientX;
  };
  const handleFsTouchEnd = () => {
    const diff = fsStartX.current - fsEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImg();
      else prevImg();
    }
  };

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
            {/* Mobile: Swipeable carousel (visible only on mobile) */}
            <div className="pd-mobile-gallery">
              <div
                className="pd-swipe-area"
                onTouchStart={handleGalleryTouchStart}
                onTouchMove={handleGalleryTouchMove}
                onTouchEnd={handleGalleryTouchEnd}
                onClick={() => setFullscreen(true)}
              >
                <img src={images[currentImg]} alt={`${product.name} - ${currentImg + 1}`} className="pd-gallery-img" />
              </div>
              {images.length > 1 && (
                <div className="pd-gallery-dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`pd-dot ${i === currentImg ? 'active' : ''}`}
                      onClick={() => goToImg(i)}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: Left vertical thumbnail strip + Right Main image (visible only on desktop) */}
            <div className="pd-desktop-gallery">
              {images.length > 1 && (
                <div className="pd-thumbnail-strip">
                  {images.map((imgUrl, i) => (
                    <button
                      key={i}
                      className={`pd-thumb ${i === currentImg ? 'active' : ''}`}
                      onMouseEnter={() => goToImg(i)}
                      onClick={() => {
                        goToImg(i);
                        setFullscreen(true);
                      }}
                      aria-label={`View thumbnail ${i + 1}`}
                    >
                      <img src={imgUrl} alt={`${product.name} thumb ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
              <div className="pd-main-image" onClick={() => setFullscreen(true)} style={{ cursor: 'zoom-in' }}>
                <img src={images[currentImg]} alt={product.name} />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pd-info-section">
            {product.tag && <span className="pd-tag">{product.tag}</span>}
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-rating">
              <span className="pd-stars">{'★'.repeat(starsCount)}{'☆'.repeat(5 - starsCount)}</span>
              <span>{rating} ({reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{(product.price ?? 0).toLocaleString()}</span>
              <span className="pd-original">₹{(product.originalPrice ?? 0).toLocaleString()}</span>
              <span className="pd-discount">{product.discount ?? 0}% OFF</span>
            </div>
            <p className="pd-tax">Inclusive of all taxes</p>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="pd-colors">
                <p className="pd-label">Color</p>
                <div className="pd-color-options">
                  {colors.map((c, i) => (
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
            )}

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
            {features.length > 0 && (
              <div className="pd-features">
                <p className="pd-label">Key Features</p>
                <div className="pd-feature-tags">
                  {features.map((f, i) => (
                    <span key={i} className="pd-feature-tag">{f}</span>
                  ))}
                </div>
              </div>
            )}

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
                      <span className="price">₹{(rp.price ?? 0).toLocaleString()}</span>
                      <span className="discount">{rp.discount ?? 0}% off</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fullscreen Image Viewer (Mobile only) */}
      {fullscreen && (
        <div
          className="pd-fullscreen-overlay"
          onTouchStart={handleFsTouchStart}
          onTouchMove={handleFsTouchMove}
          onTouchEnd={handleFsTouchEnd}
        >
          <button className="pd-fs-close" onClick={() => setFullscreen(false)}>✕</button>
          <img src={images[currentImg]} alt={product.name} className="pd-fs-image" />
          <div className="pd-fs-counter">{currentImg + 1} / {images.length}</div>
          {images.length > 1 && (
            <div className="pd-gallery-dots pd-fs-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`pd-dot ${i === currentImg ? 'active' : ''}`}
                  onClick={() => goToImg(i)}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
