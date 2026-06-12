import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { supabase } from '../supabase';
import { ArrowLeft, Download, ShieldCheck, Truck, Package, CheckCircle, HelpCircle } from 'lucide-react';
import './InfoPages.css'; // sharing standard layout styles

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useData();
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (orderErr) throw new Error(orderErr.message);
      if (!orderData) throw new Error('Order not found.');

      setOrder(orderData);

      // Fetch corresponding payment log
      const { data: payData } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', id)
        .maybeSingle();

      if (payData) {
        setPayment(payData);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!order) return;
    
    // Open a printable popup with beautiful invoice styles
    const printWindow = window.open('', '_blank', 'width=800,height=800');
    
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; line-height: 1.5; }
            .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-img { height: 50px; margin-bottom: 10px; }
            .title { font-size: 28px; font-weight: 900; text-align: right; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
            .section-title { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
            .details { font-size: 14px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th { text-align: left; padding: 12px; border-bottom: 2px solid #ddd; font-size: 12px; text-transform: uppercase; color: #666; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
            .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
            .terms-box { font-size: 11px; color: #555; background: #f9f9f9; padding: 16px; border-radius: 8px; }
            .terms-box ul { padding-left: 16px; margin: 8px 0 0 0; }
            .total-section { display: flex; flex-direction: column; align-items: flex-end; font-size: 14px; }
            .total-row { display: flex; width: 250px; justify-content: space-between; margin-bottom: 6px; }
            .grand-total { font-size: 18px; font-weight: 900; border-top: 1px solid #ddd; padding-top: 8px; margin-top: 6px; }
            .signature-box { text-align: right; margin-top: 40px; }
            .signature-img { height: 60px; margin-bottom: 4px; }
            .footer { border-top: 1px solid #eee; margin-top: 40px; padding-top: 20px; font-size: 12px; text-align: center; color: #888; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div>
              <img src="/assets/invoice.png" alt="AURIOM" class="logo-img" onerror="this.outerHTML='<div style=\\'font-size:24px;font-weight:800;\\'>AURIOM</div>'" />
              <p style="font-size: 12px; color: #666; margin: 4px 0 0;">Doomdooma Tinsukia Assam 786151, INDIA</p>
              <p style="font-size: 12px; color: #666; margin: 2px 0 0;">support@auriom.in</p>
            </div>
            <div>
              <div class="title">INVOICE</div>
              <p style="font-size: 14px; font-weight: 600; margin: 4px 0 0;">Order #${order.id}</p>
              <p style="font-size: 12px; color: #666; margin: 2px 0 0;">Date: ${new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div class="grid">
            <div>
              <div class="section-title">Billed To</div>
              <div class="details">
                <strong>${order.customer.split(' (')[0]}</strong><br />
                ${order.address.replace(/, Ph:.*?,/, ',').replace(/^.*?, Ph:.*?,/, '')}<br />
                INDIA
              </div>
            </div>
            <div>
              <div class="section-title">Payment Information</div>
              <div class="details">
                Method: ${payment ? payment.method : 'Online Payment'}<br />
                Txn ID: ${payment ? payment.txn_id : 'N/A'}<br />
                Status: Settled (Success)<br />
                Phone: ${order.address.match(/Ph: \d+/) ? order.address.match(/Ph: \d+/)[0] : 'N/A'}
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product Description</th>
                <th>Qty</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                const productsList = order.products.split(', ');
                const itemsCount = productsList.length;
                // Roughly estimate individual amount to fix the issue where grand total was showing in each product
                const estimatedPerItem = parseFloat(order.total) / itemsCount;
                return productsList.map(prod => {
                  const count = prod.split('x ')[0];
                  const name = prod.split('x ')[1] || prod;
                return `
                    <tr>
                      <td>${name}</td>
                      <td>${count}</td>
                      <td style="text-align: right;">₹${estimatedPerItem.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    </tr>
                  `;
                }).join('');
              })()}
            </tbody>
          </table>

          <div class="bottom-grid">
            <div class="terms-box">
              <strong>Important Notes:</strong>
              <ul>
                <li>2 Days Replacement Policy applicable on defective items.</li>
                <li>Please keep the original packaging for warranty claims.</li>
                <li>For any support queries, contact support@auriom.in</li>
              </ul>
            </div>
            <div class="total-section">
              <div class="total-row">
                <span>Subtotal</span>
                <span>₹${parseFloat(order.total).toLocaleString()}</span>
              </div>
              <div class="total-row">
                <span>Discount / Coupon</span>
                <span>₹0</span>
              </div>
              <div class="total-row">
                <span>Shipping & Handling</span>
                <span>Free</span>
              </div>
              <div class="total-row grand-total">
                <strong>Grand Total</strong>
                <strong>₹${parseFloat(order.total).toLocaleString()}</strong>
              </div>
              <div class="signature-box">
                <img src="/assets/signature.png" alt="Signature" class="signature-img" onerror="this.style.display='none'" /><br />
                <strong>Authorized Signatory</strong>
              </div>
            </div>
          </div>

          <div class="footer">
            Thank you for choosing Auriom. This is a computer generated invoice.
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(() => { window.print(); }, 500);
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  const isWithin24Hours = order ? (new Date() - new Date(order.created_at)) < 24 * 60 * 60 * 1000 : false;

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'Cancelled' })
        .eq('id', order.id);
        
      if (error) throw new Error(error.message);
      
      setOrder({...order, status: 'Cancelled'});
      alert("Order cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Error Loading Order</h2>
        <p style={{ color: 'red' }}>{error || 'Order could not be found.'}</p>
        <button onClick={() => navigate('/account')} className="btn btn-primary">Back to Account</button>
      </div>
    );
  }

  // Calculate timelines
  const isPending = order.status === 'Pending';
  const isProcessing = order.status === 'Processing';
  const isShipped = order.status === 'Shipped';
  const isCompleted = order.status === 'Completed';
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="info-page apple-transition">
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px' }}>

        {/* Back link + header */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={15} /> Back to My Orders
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 900, margin: '0 0 4px' }}>Order Details</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '13px' }}>
              Order ID: <strong style={{ color: 'var(--text-primary)' }}>#{order.id}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(!isCancelled && !isCompleted) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <button 
                  onClick={handleCancelOrder} 
                  className="btn btn-danger" 
                  style={{ padding: '10px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}
                  disabled={!isWithin24Hours}
                >
                  Cancel Order
                </button>
                {!isWithin24Hours && (
                  <span style={{ fontSize: '11px', color: 'var(--danger)', maxWidth: '250px', textAlign: 'right' }}>
                    No cancellation request after 24 hrs. For more enquiry email us on support@auriom.in
                  </span>
                )}
              </div>
            )}
            <button onClick={handleDownloadInvoice} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
              <Download size={15} /> Download Invoice
            </button>
          </div>
        </div>

        {/* 1. Delivery Progress */}
        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '24px 20px', borderRadius: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '20px', margin: '0 0 20px' }}>Delivery Progress</h3>

          {isCancelled ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(239, 68, 68, 0.08)', padding: '14px 16px', borderRadius: '10px', color: '#ef4444' }}>
              <span style={{ fontSize: '22px' }}>❌</span>
              <div>
                <strong style={{ display: 'block', fontSize: '14px' }}>Order Cancelled</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  This order was cancelled. 
                  {payment && payment.status === 'Success' ? ' Money will reflect to your account in 3-5 days.' : ' Contact support for help.'}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', gap: '4px' }}>
              {/* Connector line */}
              <div style={{ position: 'absolute', top: '15px', left: '12.5%', right: '12.5%', height: '2px', background: isCompleted ? 'var(--primary-purple)' : isProcessing ? 'linear-gradient(to right, var(--primary-purple) 50%, var(--border-color) 50%)' : 'var(--border-color)', zIndex: 0 }} />

              {[
                { icon: <Package size={14} />, label: 'Placed',     active: true },
                { icon: <ShieldCheck size={14} />, label: 'Processing', active: isProcessing || isShipped || isCompleted },
                { icon: <Truck size={14} />,    label: 'Shipped',    active: isShipped || isCompleted },
                { icon: <CheckCircle size={14} />, label: 'Delivered', active: isCompleted },
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    background: step.active ? 'var(--primary-purple)' : 'var(--bg-secondary)',
                    color: step.active ? '#fff' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '8px', border: step.active ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.3s ease', flexShrink: 0
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: step.active ? 800 : 500, color: step.active ? 'var(--text-primary)' : 'var(--text-secondary)', textAlign: 'center' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Order Time Info */}
        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>Order Timeline</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Placed On</span>
              <strong>{new Date(order.created_at).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Order Status</span>
              <strong style={{ color: isCancelled ? '#ef4444' : isCompleted ? '#22c55e' : 'var(--primary-purple)' }}>
                {order.status}
              </strong>
            </div>
          </div>
        </div>

        {/* 3. Payment Summary */}
        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>Payment Summary</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Payment Method</span>
              <strong>{payment ? payment.method : 'Online Payment'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Transaction ID</span>
              <strong style={{ wordBreak: 'break-all', textAlign: 'right', maxWidth: '55%' }}>{payment ? payment.txn_id : 'N/A'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Payment Status</span>
              <strong style={{ color: '#22c55e' }}>{payment ? payment.status : 'Success'}</strong>
            </div>
            <div style={{ height: '1px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 900 }}>
              <span>Amount Paid</span>
              <span style={{ color: 'var(--primary-purple)' }}>₹{parseFloat(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 4. Delivery Address */}
        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>Delivery Address</h4>
          <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: 'var(--text-primary)' }}>
            {order.address}
          </p>
        </div>

        {/* 5. Items Ordered */}
        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 16px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>Items Ordered</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {order.products.split(', ').map((prod, idx) => {
              const parts = prod.split('x ');
              const count = parts[0]?.trim();
              const name = parts[1] || prod;
              const totalItems = order.products.split(', ').length;
              return (
                <div key={idx} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: idx !== totalItems - 1 ? '14px' : 0,
                  borderBottom: idx !== totalItems - 1 ? '1px dashed var(--border-color)' : 'none',
                  gap: '12px'
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 style={{ fontSize: '14px', margin: '0 0 3px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</h5>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Qty: {count}</span>
                  </div>
                  <strong style={{ fontSize: '14px', flexShrink: 0, color: 'var(--text-primary)' }}>
                    ₹{(parseFloat(order.total) / totalItems).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </strong>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;

