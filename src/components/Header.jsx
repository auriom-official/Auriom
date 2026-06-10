import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, UserCheck, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { cartCount, isAnimating } = useCart();
  const { user } = useData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="logo">
            <Link to="/" className={location.pathname === '/' ? 'logo-home' : 'logo-other'}>AURIOM</Link>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/shop" className="nav-link">Shop All</Link></li>
              <li><Link to="/shop?category=Accessories" className="nav-link">Accessories</Link></li>
              <li><Link to="/track-order" className="nav-link track-mobile-only">Track Order</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
              <Search size={22} />
            </button>
            <Link to="/account" className="icon-btn" aria-label="Account">
              {user ? <UserCheck size={22} className="user-logged-in" /> : <User size={22} />}
            </Link>
            <Link to="/cart" className={`icon-btn cart-btn ${isAnimating ? 'cart-pop' : ''}`} aria-label="Cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
