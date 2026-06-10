import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useData } from '../context/DataContext';
import { supabase } from '../supabase';
import './Account.css';

const Account = () => {
  const { user, login, signup, logout, googleLogin, updateUserProfile, addAddress, deleteAddress } = useData();
  const [tab, setTab] = useState('login'); // 'login', 'signup', 'forgot'
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Profile Edit State
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user ? user.name : '');
  const [editPhone, setEditPhone] = useState(user ? user.phone : '');

  // Address Form State (Add / Edit)
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editingAddrId, setEditingAddrId] = useState(null); // if null => Add mode, if string => Edit mode
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrCountry, setAddrCountry] = useState('India');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrError, setAddrError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(firstName, lastName, email, phone, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      await googleLogin(credentialResponse);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in was cancelled or failed. Please try again.');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setLoading(true);

    try {
      // 1. Check if email exists
      const { data: existingUser, error: checkErr } = await supabase
        .from('users')
        .select('id')
        .eq('email', forgotEmail.trim())
        .maybeSingle();

      if (checkErr) throw checkErr;
      if (!existingUser) {
        throw new Error('Email address is not registered.');
      }

      // 2. Update password directly
      const { error: updateErr } = await supabase
        .from('users')
        .update({ password: forgotNewPassword })
        .eq('email', forgotEmail.trim());

      if (updateErr) throw updateErr;

      setForgotSuccess('Password updated successfully! Please log in with your new password.');
      setForgotEmail('');
      setForgotNewPassword('');
      setTimeout(() => {
        setTab('login');
        setForgotSuccess('');
      }, 3000);
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateUserProfile({ name: editName, phone: editPhone });
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open address form in Add mode
  const openAddAddress = () => {
    setEditingAddrId(null);
    setAddrName('');
    setAddrPhone('');
    setAddrLine1('');
    setAddrLine2('');
    setAddrLandmark('');
    setAddrCity('');
    setAddrState('');
    setAddrCountry('India');
    setAddrPincode('');
    setAddrError('');
    setShowAddrForm(true);
  };

  // Open address form in Edit mode
  const openEditAddress = (addr) => {
    setEditingAddrId(addr.id);
    setAddrName(addr.name || '');
    setAddrPhone(addr.phone || '');
    setAddrLine1(addr.addressLine || '');
    setAddrLine2(addr.addressLine2 || '');
    setAddrLandmark(addr.landmark || '');
    setAddrCity(addr.city || '');
    setAddrState(addr.state || '');
    setAddrCountry(addr.country || 'India');
    setAddrPincode(addr.pincode || '');
    setAddrError('');
    setShowAddrForm(true);
  };

  // Save Add or Edit Address
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setAddrError('');

    // Validations
    if (!/^\d{10}$/.test(addrPhone)) {
      setAddrError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!/^\d{6}$/.test(addrPincode)) {
      setAddrError('Pincode must be exactly 6 digits.');
      return;
    }

    const addressData = {
      name: addrName.trim(),
      phone: addrPhone.trim(),
      addressLine: addrLine1.trim(),
      addressLine2: addrLine2.trim(),
      landmark: addrLandmark.trim(),
      city: addrCity.trim(),
      state: addrState.trim(),
      country: addrCountry,
      pincode: addrPincode.trim()
    };

    try {
      if (editingAddrId) {
        // Edit Mode
        const updatedAddresses = (user.addresses || []).map(a => 
          a.id === editingAddrId ? { ...addressData, id: editingAddrId } : a
        );
        await updateUserProfile({ addresses: updatedAddresses });
      } else {
        // Add Mode
        await addAddress(addressData);
      }
      setShowAddrForm(false);
    } catch (err) {
      setAddrError(err.message);
    }
  };

  if (user) {
    const memberSince = new Date(user.created_at).toLocaleDateString();
    const savedAddresses = user.addresses || [];
    
    return (
      <div className="account-page apple-transition">
        <div className="account-container" style={{ maxWidth: '900px' }}>
          
          <div style={{ gap: '30px', alignItems: 'start' }} className="form-row-2col account-main-grid">
            
            {/* Left: Profile details Card */}
            <div className="account-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h2 className="account-title" style={{ margin: 0 }}>My Profile</h2>
                <button onClick={logout} className="btn btn-outline" style={{padding: '8px 16px', fontSize: '12px'}}>Logout</button>
              </div>
              
              {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

              {!editMode ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Name</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{user.name}</p>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Email</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{user.email}</p>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Phone</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{user.phone || 'Not provided'}</p>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Member Since</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{memberSince}</p>
                  </div>
                  <button onClick={() => { setEditMode(true); setEditName(user.name); setEditPhone(user.phone || ''); }} className="btn btn-primary" style={{marginTop: '16px'}}>Edit Profile</button>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" value={editName} onChange={e => setEditName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Saved Addresses / Address Book Card */}
            <div className="account-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="account-title" style={{ margin: 0 }}>Address Book</h2>
                {!showAddrForm && (
                  <button onClick={openAddAddress} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    + Add New
                  </button>
                )}
              </div>

              {/* Saved Addresses list */}
              {!showAddrForm ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {savedAddresses.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '20px 0', fontSize: '14px' }}>
                      No saved addresses yet. Click '+ Add New' to save your shipping details.
                    </p>
                  ) : (
                    savedAddresses.map((addr) => (
                      <div key={addr.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <strong style={{ display: 'block', fontSize: '14px' }}>{addr.name}</strong>
                          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                            {addr.addressLine}
                            {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                            {addr.landmark ? ` (Landmark: ${addr.landmark})` : ''}
                            , {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                          </p>
                          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Ph: {addr.phone}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                          <button onClick={() => openEditAddress(addr)} style={{ background: 'none', border: 'none', color: 'var(--primary-purple)', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>Edit</button>
                          <button onClick={() => deleteAddress(addr.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Address Form (Inline) */
                <form onSubmit={handleSaveAddress}>
                  <h4 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--primary-purple)' }}>
                    {editingAddrId ? 'Edit Address' : 'Add New Address'}
                  </h4>

                  {addrError && <div style={{ color: 'red', marginBottom: '16px', padding: '8px', background: 'rgba(255, 0, 0, 0.05)', borderRadius: '6px', fontSize: '12px' }}>{addrError}</div>}

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label" style={{ fontSize: '11px' }}>Full Name <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrName} onChange={e => setAddrName(e.target.value)} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label" style={{ fontSize: '11px' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      style={{ padding: '8px 12px' }} 
                      value={addrPhone} 
                      onChange={e => setAddrPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                      required 
                      placeholder="10-digit number" 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label" style={{ fontSize: '11px' }}>Address Line 1 / Lane 1 <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrLine1} onChange={e => setAddrLine1(e.target.value)} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label" style={{ fontSize: '11px' }}>Address Line 2 (Optional)</label>
                    <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrLine2} onChange={e => setAddrLine2(e.target.value)} />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label" style={{ fontSize: '11px' }}>Landmark <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrLandmark} onChange={e => setAddrLandmark(e.target.value)} required placeholder="e.g. Opposite Mall" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>City <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrCity} onChange={e => setAddrCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>State <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-input" style={{ padding: '8px 12px' }} value={addrState} onChange={e => setAddrState(e.target.value)} required />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Country <span style={{ color: 'red' }}>*</span></label>
                      <select className="form-input" style={{ padding: '8px 12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value={addrCountry} onChange={e => setAddrCountry(e.target.value)} required>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>PIN Code <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ padding: '8px 12px' }} 
                        value={addrPincode} 
                        onChange={e => setAddrPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                        required 
                        placeholder="6-digit PIN" 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn btn-primary flex-1" style={{ fontSize: '13px', padding: '10px' }}>Save Address</button>
                    <button type="button" className="btn btn-outline" style={{ fontSize: '13px', padding: '10px' }} onClick={() => setShowAddrForm(false)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="account-page apple-transition">
      <div className="account-container">
        <div className="account-card">
          <div className="account-logo"></div>
          <h2 className="account-title">
            {tab === 'login' ? 'Welcome Back' : tab === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="account-subtitle">
            {tab === 'login' ? 'Sign in to your AURIOM account' : tab === 'signup' ? 'Join the AURIOM community' : 'Update your password in real-time'}
          </p>

          {tab !== 'forgot' && (
            <div className="account-tabs">
              <button className={`account-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
              <button className={`account-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
            </div>
          )}

          {tab !== 'forgot' && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                width="100%"
                text={tab === 'login' ? 'signin_with' : 'signup_with'}
                shape="rectangular"
                logo_alignment="center"
              />
            </div>
          )}

          {tab !== 'forgot' && <div className="account-divider"><span>or</span></div>}

          {error && tab !== 'forgot' && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          {tab === 'login' && (
            <form className="account-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" placeholder="you@example.com" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Enter your password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="form-row-between">
                <label className="form-check"><input type="checkbox" /> Remember me</label>
                <button type="button" className="form-link-btn" onClick={() => setTab('forgot')}>Forgot password?</button>
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{marginTop: '8px'}} disabled={loading}>
                {loading ? 'Logging in...' : 'Login to Account'}
              </button>
            </form>
          )}

          {tab === 'signup' && (
            <form className="account-form" onSubmit={handleSignup}>
              <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" placeholder="Rahul" className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" placeholder="Sharma" className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" placeholder="you@example.com" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" placeholder="98765 43210" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Min. 8 characters" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <p className="form-legal">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="form-link">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="form-link">Privacy Policy</Link>.
              </p>
              <button type="submit" className="btn btn-primary w-100" style={{marginTop: '8px'}} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {tab === 'forgot' && (
            <form className="account-form" onSubmit={handleForgotPassword}>
              {forgotError && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', textAlign: 'center', padding: '10px', background: 'rgba(255, 0, 0, 0.05)', borderRadius: '8px' }}>{forgotError}</div>}
              {forgotSuccess && <div style={{ color: 'var(--success)', marginBottom: '16px', fontSize: '14px', textAlign: 'center', padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px' }}>{forgotSuccess}</div>}

              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="form-input" 
                  value={forgotEmail} 
                  onChange={e => setForgotEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Enter New Password</label>
                <input 
                  type="password" 
                  placeholder="Min. 8 characters" 
                  className="form-input" 
                  value={forgotNewPassword} 
                  onChange={e => setForgotNewPassword(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '8px' }} disabled={loading}>
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>

              <button type="button" className="btn btn-outline w-100" style={{ marginTop: '12px' }} onClick={() => setTab('login')}>
                Back to Login
              </button>
            </form>
          )}

          {tab !== 'forgot' && (
            <p className="account-switch">
              {tab === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button className="form-link-btn" onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}>
                {tab === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
