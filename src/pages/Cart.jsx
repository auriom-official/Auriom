import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();
  const { coupons } = useData();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 99;
  
  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.status === 'Active');
    
    if (coupon) {
      if (coupon.expiry && new Date(coupon.expiry) < new Date()) {
        setCouponError('This coupon has expired.');
        setDiscount(0);
        setCouponApplied(false);
        return;
      }

      if (coupon.min_order_value && subtotal < parseFloat(coupon.min_order_value)) {
        setCouponError(`Minimum order value for this coupon is ₹${coupon.min_order_value}.`);
        setDiscount(0);
        setCouponApplied(false);
        return;
      }
      
      let discountAmt = 0;
      const discountValStr = coupon.discount.toString().trim();
      
      if (discountValStr.endsWith('%')) {
        const percent = parseFloat(discountValStr.replace('%', ''));
        discountAmt = subtotal * (percent / 100);
      } else {
        const flatVal = parseFloat(discountValStr.replace(/[^0-9.]/g, ''));
        discountAmt = Math.min(flatVal, subtotal);
      }
      
      setDiscount(discountAmt);
      setCouponApplied(true);
      setCouponError('');
      
      localStorage.setItem('auriom_discount_amt', discountAmt.toString());
      localStorage.setItem('auriom_applied_coupon', coupon.code);
    } else {
      setCouponError('Invalid or expired coupon code.');
      setDiscount(0);
      setCouponApplied(false);
      localStorage.removeItem('auriom_discount_amt');
      localStorage.removeItem('auriom_applied_coupon');
    }
  };

  // Re-evaluate coupon when subtotal changes or on initial load
  useEffect(() => {
    const savedCouponCode = localStorage.getItem('auriom_applied_coupon');
    if (savedCouponCode && coupons.length > 0) {
      const coupon = coupons.find(c => c.code.toUpperCase() === savedCouponCode.toUpperCase() && c.status === 'Active');
      if (coupon) {
        if (coupon.expiry && new Date(coupon.expiry) < new Date()) {
          setDiscount(0);
          setCouponApplied(false);
          setCouponCode('');
          localStorage.removeItem('auriom_discount_amt');
          localStorage.removeItem('auriom_applied_coupon');
        } else if (coupon.min_order_value && subtotal < parseFloat(coupon.min_order_value)) {
          // No longer valid due to subtotal drop
          setDiscount(0);
          setCouponApplied(false);
          setCouponCode('');
          setCouponError(`Minimum order value for ${coupon.code} is ₹${coupon.min_order_value}.`);
          localStorage.removeItem('auriom_discount_amt');
          localStorage.removeItem('auriom_applied_coupon');
        } else {
          // Still valid, recalculate discount in case subtotal changed
          let discountAmt = 0;
          const discountValStr = coupon.discount.toString().trim();
          
          if (discountValStr.endsWith('%')) {
            const percent = parseFloat(discountValStr.replace('%', ''));
            discountAmt = subtotal * (percent / 100);
          } else {
            const flatVal = parseFloat(discountValStr.replace(/[^0-9.]/g, ''));
            discountAmt = Math.min(flatVal, subtotal);
          }
          
          setDiscount(discountAmt);
          setCouponApplied(true);
          setCouponCode(coupon.code);
          // Only clear error if it was a min order error from previous check
          if (couponError.includes('Minimum order value')) {
            setCouponError('');
          }
          localStorage.setItem('auriom_discount_amt', discountAmt.toString());
        }
      } else {
        setDiscount(0);
        setCouponApplied(false);
        setCouponCode('');
        localStorage.removeItem('auriom_discount_amt');
        localStorage.removeItem('auriom_applied_coupon');
      }
    } else if (cartCount === 0 || subtotal === 0) {
      setDiscount(0);
      setCouponApplied(false);
      localStorage.removeItem('auriom_discount_amt');
      localStorage.removeItem('auriom_applied_coupon');
    }
  }, [subtotal, coupons]);

  const total = subtotal + shipping - discount;

  if (cartCount === 0) {
    return (
      <main className="cart-page apple-transition">
        <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div className="empty-cart-icon">🛒</div>
          <h1 className="cart-title">Your cart is empty</h1>
          <p className="cart-subtitle">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px' }}>Start Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page apple-transition">
      <div className="container">
        <h1 className="cart-title">Your Cart ({cartCount})</h1>
        
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-container">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-item-img-link">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                </Link>
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                  
                  <div className="cart-item-actions">
                    <div className="cart-qty-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-wrapper">
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-shipping">Free</span> : `₹${shipping}`}</span>
              </div>
              {shipping === 0 && (
                <div className="shipping-notice">
                  ✓ Free shipping applied to this order
                </div>
              )}
              
              {/* Coupon Section */}
              <div className="cart-coupon-section" style={{marginTop: '20px', marginBottom: '20px'}}>
                <div className="coupon-input-group" style={{display: 'flex', gap: '8px'}}>
                  <input 
                    type="text" 
                    placeholder="Enter code (e.g. WELCOME10)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    style={{flex: 1, padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)'}}
                  />
                  <button className="btn" style={{background: 'var(--border-color)', color: 'var(--text-primary)'}} onClick={handleApplyCoupon} disabled={couponApplied}>
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponError && <p style={{color: 'var(--danger)', fontSize: '12px', marginTop: '8px'}}>{couponError}</p>}
                {couponApplied && <p style={{color: 'var(--success)', fontSize: '12px', marginTop: '8px'}}>Coupon applied successfully!</p>}
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount-row" style={{color: 'var(--success)', fontWeight: '500'}}>
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}

              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <button className="btn btn-primary w-100 checkout-btn" onClick={() => navigate('/checkout/address')}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              
              <div className="payment-methods">
                <p>100% Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
