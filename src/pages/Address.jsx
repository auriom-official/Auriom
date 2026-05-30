import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Address = () => {
  const navigate = useNavigate();
  const { user, addAddress, deleteAddress } = useData();
  
  const [showForm, setShowForm] = useState(user && user.addresses && user.addresses.length > 0 ? false : true);
  const [selectedAddressId, setSelectedAddressId] = useState(user && user.addresses && user.addresses.length > 0 ? user.addresses[0].id : null);
  
  // New Address Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleContinueWithSelected = () => {
    if (!selectedAddressId) return;
    const addr = user.addresses.find(a => a.id === selectedAddressId);
    if (addr) {
      localStorage.setItem('auriom_shipping_address', JSON.stringify(addr));
      navigate('/checkout/payment');
    }
  };

  const handleSaveNewAddress = async (e) => {
    e.preventDefault();
    const newAddr = { name, phone, addressLine, city, pincode };
    
    if (user) {
      await addAddress(newAddr);
      setShowForm(false);
      // Select the newly added address
      const updatedUserStr = localStorage.getItem('auriom_user');
      if (updatedUserStr) {
         const u = JSON.parse(updatedUserStr);
         if(u.addresses && u.addresses.length > 0) {
            setSelectedAddressId(u.addresses[u.addresses.length - 1].id);
         }
      }
    } else {
      // Guest Checkout
      localStorage.setItem('auriom_shipping_address', JSON.stringify(newAddr));
      navigate('/checkout/payment');
    }
  };

  return (
    <div className="checkout-page apple-transition">
      <div className="container" style={{ maxWidth: '700px', paddingTop: '100px', paddingBottom: '60px' }}>
        
        {!user && (
          <div style={{ background: 'rgba(0,122,255,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
            <p style={{ margin: 0, color: 'var(--accent-teal)', fontSize: '14px', fontWeight: 600 }}>
              Checking out as Guest. <Link to="/account" style={{textDecoration: 'underline'}}>Login</Link> to save your addresses.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Shipping Address</h2>
          {user && user.addresses && user.addresses.length > 0 && !showForm && (
            <button onClick={() => setShowForm(true)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>
              + Add New Address
            </button>
          )}
        </div>

        {user && user.addresses && user.addresses.length > 0 && !showForm ? (
          <div>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              {user.addresses.map((addr) => (
                <div 
                  key={addr.id} 
                  onClick={() => setSelectedAddressId(addr.id)}
                  style={{
                    padding: '20px', 
                    border: `2px solid ${selectedAddressId === addr.id ? 'var(--primary-purple)' : 'var(--border-color)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedAddressId === addr.id ? 'rgba(0,0,0,0.02)' : 'transparent',
                    display: 'flex', justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{addr.name}</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>{addr.addressLine}, {addr.city} - {addr.pincode}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Ph: {addr.phone}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                    style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: '8px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleContinueWithSelected} className="btn btn-primary w-100" disabled={!selectedAddressId}>
              Continue to Payment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveNewAddress}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="e.g. 98765 43210" />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Address Line 1</label>
              <input type="text" className="form-input" value={addressLine} onChange={e => setAddressLine(e.target.value)} required />
            </div>
            <div className="form-row-2col" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" className="form-input" value={city} onChange={e => setCity(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code</label>
                <input type="text" className="form-input" value={pincode} onChange={e => setPincode(e.target.value)} required />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary flex-1" style={{ flex: 1 }}>
                {user ? 'Save Address & Continue' : 'Continue to Payment'}
              </button>
              {user && user.addresses && user.addresses.length > 0 && (
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline" style={{ flex: 1 }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Address;
