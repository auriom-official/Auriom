import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

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
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
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
