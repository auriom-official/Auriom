import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmed = () => {
  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '600px', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
        <h2 style={{ marginBottom: '16px' }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Thank you for your purchase. Your order ID is <strong>#AUR{Math.floor(Math.random() * 90000) + 10000}</strong>. 
          We'll send you an email with the tracking details shortly.
        </p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
};
export default OrderConfirmed;
