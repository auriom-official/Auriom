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

  const getRelevanceScore = (p, q) => {
    if (!q) return 0;
    const query = q.toLowerCase().trim();
    const words = query.split(/\s+/);
    let score = 0;
    
    // Exact match in name
    if (p.name && p.name.toLowerCase() === query) score += 20;
    
    // Contains full query
    if (p.name && p.name.toLowerCase().includes(query)) score += 10;
    if (p.category && p.category.toLowerCase().includes(query)) score += 8;
    if (p.tag && p.tag.toLowerCase().includes(query)) score += 5;
    
    // Word matches
    words.forEach(word => {
      if (p.name && p.name.toLowerCase().includes(word)) score += 3;
      if (p.category && p.category.toLowerCase().includes(word)) score += 2;
      if (p.tags && Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(word))) score += 2;
      if (p.features && Array.isArray(p.features) && p.features.some(f => f.toLowerCase().includes(word))) score += 1;
      if (p.description && p.description.toLowerCase().includes(word)) score += 1;
    });

    return score;
  };

  const results = query.trim().length > 0
    ? products
        .map(p => ({ product: p, score: getRelevanceScore(p, query) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.product)
        .slice(0, 8) // Limit to top 8
    : [];

  // Fallback suggestions (Bestsellers or highly rated)
  const fallbackSuggestions = products
    .filter(p => p.tag && p.tag.toLowerCase().includes("best seller"))
    .slice(0, 4);

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
              <div className="search-no-results">
                <p>No exact matches found for "{query}".</p>
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                  <p className="search-suggestion-title">You might like these Best Sellers:</p>
                  {fallbackSuggestions.map(p => (
                    <Link 
                      to={`/product/${p.id}`} 
                      key={p.id} 
                      className="search-result-item" 
                      onClick={() => { saveSearch(query); onClose(); }}
                    >
                      <img src={p.img} alt={p.name} className="search-result-img" />
                      <div>
                        <p className="search-result-name">{p.name}</p>
                        <p className="search-result-price">₹{(p.price ?? 0).toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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

            <div style={{ marginTop: '30px' }}>
              <p className="search-suggestion-title">Recommended for You</p>
              {fallbackSuggestions.map(p => (
                <Link 
                  to={`/product/${p.id}`} 
                  key={p.id} 
                  className="search-result-item" 
                  onClick={onClose}
                  style={{ padding: '8px 0', border: 'none' }}
                >
                  <img src={p.img} alt={p.name} className="search-result-img" />
                  <div>
                    <p className="search-result-name">{p.name}</p>
                    <p className="search-result-price">₹{(p.price ?? 0).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
