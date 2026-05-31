import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const OrderConfirmed = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'AUR-UNKNOWN';

  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '600px', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
        <h2 style={{ marginBottom: '16px' }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Thank you for your purchase. Your order ID is <strong>#{orderId}</strong>. 
          We'll send you an email with the tracking details shortly.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to={`/track-order?orderId=${orderId}`} className="btn btn-primary">Track Order</Link>
          <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmed;
