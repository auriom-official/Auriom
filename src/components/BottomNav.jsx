import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, User, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = () => {
  const { cartCount, isAnimating } = useCart();
  
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/shop" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Compass size={24} />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/account" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <div style={{position:'relative'}}>
          <ShoppingCart size={24} className={isAnimating ? 'cart-pop' : ''} />
          {cartCount > 0 && <span className="bottom-cart-badge">{cartCount}</span>}
        </div>
        <span>Cart</span>
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Package size={24} />
        <span>Orders</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
