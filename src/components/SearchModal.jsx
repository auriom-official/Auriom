import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import products from '../data/products';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const results = query.length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for earbuds, headphones, watches..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-close" onClick={onClose}><X size={22} /></button>
        </div>

        {query.length > 0 && (
          <div className="search-results">
            {results.length === 0 ? (
              <p className="search-no-results">No products found for "{query}"</p>
            ) : (
              results.map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="search-result-item" onClick={onClose}>
                  <img src={p.img} alt={p.name} className="search-result-img" />
                  <div>
                    <p className="search-result-name">{p.name}</p>
                    <p className="search-result-price">₹{p.price.toLocaleString()} <span className="search-result-discount">{p.discount}% off</span></p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {query.length === 0 && (
          <div className="search-suggestions">
            <p className="search-suggestion-title">Popular Searches</p>
            <div className="search-tags">
              {['Earbuds', 'Headphones', 'Smart Watches', 'Speakers', 'Neckbands'].map(t => (
                <button key={t} className="search-tag" onClick={() => setQuery(t)}>{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
