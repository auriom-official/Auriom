import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');

  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '600px', paddingTop: '100px', paddingBottom: '60px' }}>
        <h2 style={{ marginBottom: '24px' }}>Payment Method</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: `1px solid ${method === 'upi' ? 'var(--primary-purple)' : 'var(--border-color)'}`, borderRadius: '12px', cursor: 'pointer' }}>
            <input type="radio" name="payment" checked={method === 'upi'} onChange={() => setMethod('upi')} />
            UPI / Google Pay
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: `1px solid ${method === 'card' ? 'var(--primary-purple)' : 'var(--border-color)'}`, borderRadius: '12px', cursor: 'pointer' }}>
            <input type="radio" name="payment" checked={method === 'card'} onChange={() => setMethod('card')} />
            Credit / Debit Card
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: `1px solid ${method === 'cod' ? 'var(--primary-purple)' : 'var(--border-color)'}`, borderRadius: '12px', cursor: 'pointer' }}>
            <input type="radio" name="payment" checked={method === 'cod'} onChange={() => setMethod('cod')} />
            Cash on Delivery
          </label>
        </div>

        <button onClick={() => navigate('/checkout/success')} className="btn btn-primary w-100">Place Order</button>
      </div>
    </div>
  );
};
export default Payment;
