import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const [tab, setTab] = useState('login');

  return (
    <div className="account-page apple-transition">
      <div className="account-container">
        <div className="account-card">
          <div className="account-logo">AURIOM</div>
          <h2 className="account-title">{tab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="account-subtitle">
            {tab === 'login' ? 'Sign in to your AURIOM account' : 'Join the AURIOM community'}
          </p>

          {/* Tabs */}
          <div className="account-tabs">
            <button className={`account-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
            <button className={`account-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          {/* Google Login */}
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

          {tab === 'login' ? (
            <form className="account-form" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" placeholder="you@example.com" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Enter your password" className="form-input" required />
              </div>
              <div className="form-row-between">
                <label className="form-check"><input type="checkbox" /> Remember me</label>
                <a href="#" className="form-link">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{marginTop: '8px'}}>Login to Account</button>
            </form>
          ) : (
            <form className="account-form" onSubmit={e => e.preventDefault()}>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" placeholder="Rahul" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" placeholder="Sharma" className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" placeholder="you@example.com" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Min. 8 characters" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input type="password" placeholder="Repeat password" className="form-input" required />
              </div>
              <p className="form-legal">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="form-link">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="form-link">Privacy Policy</Link>.
              </p>
              <button type="submit" className="btn btn-primary w-100" style={{marginTop: '8px'}}>Create Account</button>
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
