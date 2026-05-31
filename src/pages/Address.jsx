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
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [pincode, setPincode] = useState('');
  const [formError, setFormError] = useState('');

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
    setFormError('');

    // Validations
    if (!/^\d{10}$/.test(phone)) {
      setFormError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setFormError('Pincode must be exactly 6 digits.');
      return;
    }

    const newAddr = { 
      name, 
      phone, 
      addressLine, 
      addressLine2, 
      landmark, 
      city, 
      state, 
      country, 
      pincode 
    };
    
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
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{addr.name}</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineLines: '1.4' }}>
                      {addr.addressLine}
                      {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                      {addr.landmark ? ` (Landmark: ${addr.landmark})` : ''}
                      , {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Ph: {addr.phone}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                    style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: '8px', marginLeft: '12px' }}
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
            {formError && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', padding: '10px', background: 'rgba(255, 0, 0, 0.05)', borderRadius: '8px' }}>{formError}</div>}
            
            <div className="form-row-2col" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number <span style={{ color: 'red' }}>*</span></label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                  required 
                  placeholder="10-digit phone number" 
                />
              </div>
            </div>

            <div className="form-row-2col" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Address Line 1 <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-input" value={addressLine} onChange={e => setAddressLine(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Address Line 2 (Optional)</label>
                <input type="text" className="form-input" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
              </div>
            </div>

            <div className="form-row-2col" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Landmark <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-input" value={landmark} onChange={e => setLandmark(e.target.value)} required placeholder="e.g. Near Big Bazaar" />
              </div>
              <div className="form-group">
                <label className="form-label">City <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-input" value={city} onChange={e => setCity(e.target.value)} required />
              </div>
            </div>

            <div className="form-row-3col" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">State <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-input" value={state} onChange={e => setState(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Country <span style={{ color: 'red' }}>*</span></label>
                <select className="form-input" value={country} onChange={e => setCountry(e.target.value)} required style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code <span style={{ color: 'red' }}>*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={pincode} 
                  onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                  required 
                  placeholder="6-digit pincode" 
                />
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
