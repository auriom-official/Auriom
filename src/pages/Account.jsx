import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Account.css';

const Account = () => {
  const { user, login, signup, logout, updateUserProfile } = useData();
  const [tab, setTab] = useState('login');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Profile Edit State
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user ? user.name : '');
  const [editPhone, setEditPhone] = useState(user ? user.phone : '');

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

  if (user) {
    const memberSince = new Date(user.created_at).toLocaleDateString();
    
    return (
      <div className="account-page apple-transition">
        <div className="account-container" style={{ maxWidth: '800px' }}>
          <div className="account-card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 className="account-title">My Profile</h2>
              <button onClick={logout} className="btn btn-outline" style={{padding: '8px 16px', fontSize: '12px'}}>Logout</button>
            </div>
            
            {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

            {!editMode ? (
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Name</p>
                  <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</p>
                  <p style={{ fontWeight: 'bold' }}>{user.email}</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</p>
                  <p style={{ fontWeight: 'bold' }}>{user.phone || 'Not provided'}</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Member Since</p>
                  <p style={{ fontWeight: 'bold' }}>{memberSince}</p>
                </div>
                <button onClick={() => setEditMode(true)} className="btn btn-primary" style={{marginTop: '16px'}}>Edit Profile</button>
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
        </div>
      </div>
    );
  }

  return (
    <div className="account-page apple-transition">
      <div className="account-container">
        <div className="account-card">
          <div className="account-logo"></div>
          <h2 className="account-title">{tab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="account-subtitle">
            {tab === 'login' ? 'Sign in to your AURIOM account' : 'Join the AURIOM community'}
          </p>

          <div className="account-tabs">
            <button className={`account-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
            <button className={`account-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          <button className="google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="account-divider"><span>or</span></div>

          {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          {tab === 'login' ? (
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
                <a href="#" className="form-link">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{marginTop: '8px'}} disabled={loading}>
                {loading ? 'Logging in...' : 'Login to Account'}
              </button>
            </form>
          ) : (
            <form className="account-form" onSubmit={handleSignup}>
              <div className="form-row-2col">
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

          <p className="account-switch">
            {tab === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className="form-link-btn" onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}>
              {tab === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
