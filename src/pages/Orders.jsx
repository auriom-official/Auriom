import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { supabase } from '../supabase';

const Orders = () => {
  const { user } = useData();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .ilike('customer', `%${user.email}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching user orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-page py-section container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="orders-page py-section container" style={{ minHeight: '70vh', textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2 className="section-title">Access Denied</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '15px' }}>Please login to view your order history.</p>
        <Link to="/account" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>Login / Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="orders-page py-section container" style={{ minHeight: '80vh', paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px' }}>
      <h1 className="cart-title" style={{ marginBottom: '8px' }}>My Orders</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
        View and track your previous purchase history.
      </p>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((o) => {
            const isCompleted = o.status === 'Completed';
            const isCancelled = o.status === 'Cancelled';
            const isProcessing = o.status === 'Processing';
            
            let statusColor = 'var(--text-secondary)';
            let statusBg = 'rgba(0,0,0,0.05)';
            
            if (isCompleted) {
              statusColor = 'var(--success)';
              statusBg = 'rgba(16, 185, 129, 0.1)';
            } else if (isCancelled) {
              statusColor = 'red';
              statusBg = 'rgba(239, 68, 68, 0.1)';
            } else if (isProcessing) {
              statusColor = 'var(--primary-purple)';
              statusBg = 'rgba(139, 92, 246, 0.1)';
            }

            return (
              <div 
                key={o.id} 
                onClick={() => navigate(`/order/${o.id}`)}
                style={{ 
                  background: 'var(--glass-bg)', 
                  border: 'var(--glass-border)', 
                  borderRadius: '16px', 
                  padding: '24px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
                className="order-card-item"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Order ID</span>
                    <h3 style={{ fontSize: '16px', margin: '2px 0 0', fontWeight: 800 }}>#{o.id}</h3>
                  </div>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    color: statusColor, 
                    background: statusBg 
                  }}>
                    {o.status}
                  </span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {o.products.split(', ').map((prod, idx) => {
                    const count = prod.split('x ')[0];
                    const name = prod.split('x ')[1] || prod;
                    const itemsCount = o.products.split(', ').length;
                    const estimatedPerItem = parseFloat(o.total) / itemsCount;
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '20px' }}>📦</span>
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{name}</p>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Qty: {count} | ₹{estimatedPerItem.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </div>
                        </div>
                        {idx === 0 && (
                          <div style={{ color: 'var(--text-secondary)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Placed On:</span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: 600 }}>{new Date(o.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Amount:</span>
                    <span style={{ display: 'block', fontSize: '16px', fontWeight: 900 }}>₹{parseFloat(o.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
