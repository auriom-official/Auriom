import React from 'react';

const Orders = () => {
  return (
    <div className="orders-page py-section container" style={{minHeight: '70vh', textAlign: 'center', paddingTop: '100px'}}>
      <h2 className="section-title">My Orders</h2>
      <p style={{color: 'var(--text-secondary)', marginTop: '20px'}}>You have no active orders.</p>
      <a href="/shop" className="btn btn-primary" style={{marginTop: '30px'}}>Start Shopping</a>
    </div>
  );
};

export default Orders;
