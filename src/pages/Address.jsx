import React from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '600px', paddingTop: '100px', paddingBottom: '60px' }}>
        <h2 style={{ marginBottom: '24px' }}>Shipping Address</h2>
        <form onSubmit={e => { e.preventDefault(); navigate('/checkout/payment'); }}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Address Line 1</label>
            <input type="text" className="form-input" required />
          </div>
          <div className="form-row-2col" style={{ marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">PIN Code</label>
              <input type="text" className="form-input" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '16px' }}>Continue to Payment</button>
        </form>
      </div>
    </div>
  );
};
export default Address;
