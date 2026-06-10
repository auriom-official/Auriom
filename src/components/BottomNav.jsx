import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, User, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = () => {
  const { cartCount, isAnimating } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bottom-nav ${isVisible ? 'visible' : 'hidden'}`}>
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
