import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Package, ShieldCheck, Truck, CheckCircle, Search, ArrowLeft } from 'lucide-react';
import './InfoPages.css';

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const oId = searchParams.get('orderId');
    if (oId) {
      setOrderIdInput(oId);
      // Auto trigger fetch if they have prefilled order ID (we don't strictly require email for shortcut link if they came from order confirmation, but it provides good convenience!)
      fetchTrackingDetails(oId, '');
    }
  }, [searchParams]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      setError('Please enter a valid Order ID.');
      return;
    }
    fetchTrackingDetails(orderIdInput.trim(), emailInput.trim());
  };

  const fetchTrackingDetails = async (orderId, email) => {
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (fetchErr) throw fetchErr;
      if (!data) {
        setError('Order ID not found. Please double-check your Order ID.');
        return;
      }

      // If email is provided, perform a security validation to match
      if (email && !data.customer.toLowerCase().includes(email.toLowerCase())) {
        setError('Security check failed: The entered email does not match this Order ID.');
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while tracking the order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isPending = order && order.status === 'Pending';
  const isProcessing = order && order.status === 'Processing';
  const isCompleted = order && order.status === 'Completed';
  const isCancelled = order && order.status === 'Cancelled';

  return (
    <div className="info-page apple-transition">
      <div className="info-hero">
        <div className="container">
          <h1>Track Your Order</h1>
          <p>Stay updated on your shipment in real-time. Enter your details below to see where your AURIOM product is.</p>
        </div>
      </div>
      <div className="info-content">
        <div className="info-section">
          
          {/* Tracking Lookup Form */}
          {!order && (
            <div className="info-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={20} /> Enter Order Details
              </h3>
              
              {error && <div style={{ color: 'red', marginTop: '16px', padding: '10px', background: 'rgba(255, 0, 0, 0.05)', borderRadius: '8px', fontSize: '13px' }}>{error}</div>}

              <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Order ID <span style={{ color: 'red' }}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g. AUR-123456789" 
                    value={orderIdInput} 
                    onChange={e => setOrderIdInput(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email address (Optional)</label>
                  <input 
                    type="email" 
                    placeholder="e.g. you@example.com" 
                    value={emailInput} 
                    onChange={e => setEmailInput(e.target.value)} 
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '14px' }}
                >
                  {loading ? 'Searching...' : 'Track Order'}
                </button>
              </form>
            </div>
          )}

          {/* Tracking Results Card */}
          {order && (
            <div className="info-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <button onClick={() => setOrder(null)} className="form-link" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer', color: 'var(--primary-purple)' }}>
                  <ArrowLeft size={16} /> Track another order
                </button>
                <Link to={`/order/${order.id}`} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>View Full Details</Link>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Order Tracking Result</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0', fontSize: '13px' }}>
                  Order ID: <strong>#{order.id}</strong> | Status: <strong style={{ color: isCompleted ? 'var(--success)' : isCancelled ? 'red' : 'var(--primary-purple)' }}>{order.status}</strong>
                </p>
              </div>

              {/* Status Indicator Map */}
              {isCancelled ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '12px', color: 'red', marginBottom: '24px' }}>
                  <span style={{ fontSize: '24px' }}>❌</span>
                  <div>
                    <strong style={{ display: 'block' }}>Order Cancelled</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>This order has been cancelled. Please contact customer support.</span>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    
                    {/* Timeline Line */}
                    <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '3px', background: isCompleted ? 'var(--primary-purple)' : isProcessing ? 'linear-gradient(to right, var(--primary-purple) 50%, var(--border-color) 50%)' : 'var(--border-color)', zIndex: 0 }}></div>

                    {/* Placed */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                        <Package size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700 }}>Placed</span>
                    </div>

                    {/* Processing */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isProcessing || isCompleted ? 'var(--text-primary)' : 'transparent', color: isProcessing || isCompleted ? 'var(--bg-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', border: isProcessing || isCompleted ? 'none' : '1px solid var(--border-color)' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: isProcessing || isCompleted ? 700 : 400, color: isProcessing || isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Processing</span>
                    </div>

                    {/* Shipped */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isCompleted ? 'var(--text-primary)' : 'transparent', color: isCompleted ? 'var(--bg-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', border: isCompleted ? 'none' : '1px solid var(--border-color)' }}>
                        <Truck size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: isCompleted ? 700 : 400, color: isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Shipped</span>
                    </div>

                    {/* Delivered */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isCompleted ? 'var(--text-primary)' : 'transparent', color: isCompleted ? 'var(--bg-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', border: isCompleted ? 'none' : '1px solid var(--border-color)' }}>
                        <CheckCircle size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: isCompleted ? 700 : 400, color: isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Delivered</span>
                    </div>

                  </div>
                </div>
              )}

              {/* Order Info Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Customer:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{order.customer.split(' (')[0]}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Date Placed:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{new Date(order.created_at).toLocaleDateString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Products:</span>
                  <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{order.products}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Order Value:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹{parseFloat(order.total).toLocaleString()}</strong>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
