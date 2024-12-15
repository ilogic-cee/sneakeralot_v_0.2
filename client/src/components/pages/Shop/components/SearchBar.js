import React, { useState, useCallback, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  // Handle input change
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle clear search
  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div 
      className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}
      role="search"
    >
      <ion-icon 
        name="search-outline" 
        className={styles.searchIcon}
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search products"
      />
      {searchTerm && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <ion-icon name="close-outline" />
        </button>
      )}
    </div>
  );
};

export default SearchBar; 