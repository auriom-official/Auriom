import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useData } from '../context/DataContext';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const { products } = useData();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery(''); // Always refresh/reset search query on open
      const saved = localStorage.getItem('auriom_recent_searches');
      setRecentSearches(saved ? JSON.parse(saved) : []);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const saveSearch = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    const term = searchTerm.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5);
      localStorage.setItem('auriom_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('auriom_recent_searches');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveSearch(query);
    }
  };

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
            onKeyDown={handleKeyDown}
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
                <Link 
                  to={`/product/${p.id}`} 
                  key={p.id} 
                  className="search-result-item" 
                  onClick={() => {
                    saveSearch(query);
                    onClose();
                  }}
                >
                  <img src={p.img} alt={p.name} className="search-result-img" />
                  <div>
                    <p className="search-result-name">{p.name}</p>
                    <p className="search-result-price">₹{(p.price ?? 0).toLocaleString()} <span className="search-result-discount">{p.discount ?? 0}% off</span></p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {query.length === 0 && (
          <div className="search-suggestions">
            {recentSearches.length > 0 && (
              <div className="recent-searches-box" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <p className="search-suggestion-title" style={{ margin: 0 }}>Recent Searches</p>
                  <button 
                    onClick={clearRecentSearches}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--primary-purple)', 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Clear All
                  </button>
                </div>
                <div className="search-tags">
                  {recentSearches.map((t, idx) => (
                    <button 
                      key={idx} 
                      className="search-tag" 
                      onClick={() => {
                        setQuery(t);
                        saveSearch(t);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="search-suggestion-title">Popular Searches</p>
            <div className="search-tags">
              {['Headphones', 'Smart Watches', 'Drones', 'Accessories'].map(t => (
                <button 
                  key={t} 
                  className="search-tag" 
                  onClick={() => {
                    setQuery(t);
                    saveSearch(t);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
