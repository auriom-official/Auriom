import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

const Payment = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, createOrder } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping Address from localStorage
  const [shippingAddress, setShippingAddress] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const addr = localStorage.getItem('auriom_shipping_address');
    if (addr) {
      setShippingAddress(JSON.parse(addr));
    }

    const calcSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(calcSubtotal);
    setShipping(calcSubtotal > 499 ? 0 : 50);

    const discAmt = parseFloat(localStorage.getItem('auriom_discount_amt') || 0);
    setDiscount(discAmt);

    setTotal(calcSubtotal + (calcSubtotal > 499 ? 0 : 50) - discAmt);
  }, [cart]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      setError('Shipping address is missing. Please go back and enter shipping details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        setError("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 1. Generate Order ID
      const orderId = 'AUR-' + Date.now().toString().slice(-6) + Math.floor(1000 + Math.random() * 9000);

      // 2. Prepare Order Data
      const orderData = {
        id: orderId,
        customer: user ? `${user.name} (${user.email})` : `${shippingAddress.name} (${shippingAddress.email || 'Guest'})`,
        address: `${shippingAddress.name}, Ph: ${shippingAddress.phone}, ${shippingAddress.addressLine}${shippingAddress.addressLine2 ? ', ' + shippingAddress.addressLine2 : ''}, Landmark: ${shippingAddress.landmark}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country} - ${shippingAddress.pincode}`,
        payment: 'Online Payment (Pending)',
        total: total,
        status: 'Pending Payment',
        products: cart.map(item => `${item.quantity}x ${item.name}`).join(', ')
      };

      // 3. Prepare Payment Log
      const txnId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const paymentData = {
        txn_id: txnId,
        method: 'Online Payment',
        amount: total,
        status: 'Pending'
      };

      // 4. Save to Database as Pending
      await createOrder(orderData, paymentData);

      // 5. Open Razorpay Checkout
      const options = {
        key: "rzp_live_SzbedHtPFZznC0", 
        amount: Math.round(total * 100),
        currency: "INR",
        name: "Auriom",
        description: "Order " + orderId,
        handler: async function (response) {
          try {
            const { supabase } = await import('../supabase');
            await supabase.from('orders').update({
              status: 'Processing',
              payment: 'Online Payment (Success)'
            }).eq('id', orderId);

            await supabase.from('payments').update({
              status: 'Success',
              txn_id: response.razorpay_payment_id || txnId
            }).eq('order_id', orderId);

            clearCart();
            localStorage.removeItem('auriom_discount_amt');
            localStorage.removeItem('auriom_applied_coupon');

            navigate(`/checkout/success?orderId=${orderId}`);
          } catch (err) {
            console.error("Error updating order:", err);
            navigate(`/orders`);
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email || (user ? user.email : ""),
          contact: shippingAddress.phone || ""
        },
        theme: {
          color: "#8B5CF6"
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError("Payment cancelled. Order saved as Pending.");
            navigate(`/orders`);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      setError('Failed to create order: ' + err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page apple-transition">
        <div className="container" style={{ maxWidth: '600px', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px' }}>Your cart is empty</h2>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '600px', paddingTop: '100px', paddingBottom: '60px' }}>
        <h2 style={{ marginBottom: '24px' }}>Secure Payment</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '16px', padding: '10px', background: 'rgba(255, 0, 0, 0.05)', borderRadius: '8px', fontSize: '14px' }}>{error}</div>}

        <div style={{ background: 'var(--glass-bg)', border: 'var(--glass-border)', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Order Total</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--success)' }}>
              <span>Discount Applied:</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '12px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900 }}>
            <span>Total Payable:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '20px', border: '2px solid var(--primary-purple)', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.03)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="radio" name="payment" checked={true} readOnly style={{ accentColor: 'var(--primary-purple)', width: '18px', height: '18px' }} />
              <strong style={{ fontSize: '16px' }}>Online Payment</strong>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '30px', fontWeight: 500 }}>
              UPI, Credit/Debit Cards, Netbanking, etc. all available.
            </span>
          </label>
        </div>

        <button 
          onClick={handlePlaceOrder} 
          className="btn btn-primary w-100" 
          disabled={loading}
          style={{ padding: '14px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          {loading ? 'Processing Secure Payment...' : `Pay & Place Order (₹${total.toLocaleString()})`}
        </button>
      </div>
    </div>
  );
};

export default Payment;
