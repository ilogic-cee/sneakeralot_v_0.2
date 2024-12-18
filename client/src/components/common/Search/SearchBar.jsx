import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './SearchBar.module.css';
import { SearchContext } from '../../../contexts/SearchContext';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const { isSearchActive, setIsSearchActive } = useContext(SearchContext);

  const initialSuggestions = {
    trending: [
      { term: 'Air Force 1', count: '10K+' },
      { term: 'Jordan', count: '8K+' },
      { term: 'Air Max', count: '5K+' },
      { term: 'Dunk Low', count: '4K+' },
      { term: 'Nike Tech Fleece', count: '3K+' }
    ],
    popular: [
      {
        title: 'Nike Air Force 1',
        category: 'Lifestyle Shoes',
        price: '$110',
        image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-5QFp5Z.png'
      },
      {
        title: 'Nike Tech Fleece',
        category: 'Men\'s Hoodie',
        price: '$130',
        image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/55baf35d-f76f-4e24-a914-f6d65635cd3f/sportswear-tech-fleece-mens-full-zip-hoodie-5ZtTtk.png'
      },
      {
        title: 'Nike Dunk Low',
        category: 'Women\'s Shoes',
        price: '$115',
        image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ea3a034a-351d-4d5e-9e39-6ebe24eebd23/dunk-low-womens-shoes-DcBjZm.png'
      }
    ],
    categories: [
      { name: 'Trending', icon: 'trending-up-outline' },
      { name: 'New & Featured', icon: 'star-outline' },
      { name: 'Men', icon: 'man-outline' },
      { name: 'Women', icon: 'woman-outline' },
      { name: 'Kids', icon: 'people-outline' },
      { name: 'Sale', icon: 'pricetag-outline' }
    ]
  };

  const handleClose = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const handleFocus = () => {
    setIsSearchActive(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Update body class immediately when search state changes
  useEffect(() => {
    if (isSearchActive) {
      document.body.classList.add('search-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('search-active');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('search-active');
      document.body.style.overflow = '';
    };
  }, [isSearchActive]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isSearchActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive]);

  return (
    <div 
      className={`${styles.searchContainer} ${isSearchActive ? styles.active : ''}`} 
      onClick={handleBackdropClick}
      data-testid="search-container"
    >
      <div 
        className={styles.searchBar} 
        ref={searchRef}
        onClick={handleSearchClick}
      >
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search for products, brands, and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
        />
        <button 
          className={styles.searchButton} 
          aria-label="Search"
          onClick={handleSearchClick}
        >
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>

      {isSearchActive && (
        <div className={styles.suggestionsPanel}>
          {!searchQuery ? (
            <>
              {/* Trending Searches */}
              <div className={styles.suggestionSection}>
                <div className={styles.sectionHeader}>
                  <h3>Popular Search Terms</h3>
                </div>
                <div className={styles.trendingList}>
                  {initialSuggestions.trending.map((item, index) => (
                    <button key={index} className={styles.suggestion}>
                      <ion-icon name="trending-up-outline"></ion-icon>
                      <span className={styles.searchTerm}>{item.term}</span>
                      <span className={styles.searchCount}>{item.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Products */}
              <div className={styles.suggestionSection}>
                <div className={styles.sectionHeader}>
                  <h3>Popular Right Now</h3>
                </div>
                <div className={styles.popularList}>
                  {initialSuggestions.popular.map((item, index) => (
                    <button key={index} className={styles.suggestion}>
                      <div className={styles.productImage}>
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className={styles.suggestionImage}
                        />
                      </div>
                      <div className={styles.suggestionContent}>
                        <span className={styles.suggestionTitle}>{item.title}</span>
                        <span className={styles.suggestionCategory}>{item.category}</span>
                        <span className={styles.suggestionPrice}>{item.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className={styles.suggestionSection}>
                <div className={styles.sectionHeader}>
                  <h3>Categories</h3>
                </div>
                <div className={styles.categoriesList}>
                  {initialSuggestions.categories.map((category, index) => (
                    <button key={index} className={styles.suggestion}>
                      <ion-icon name={category.icon}></ion-icon>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.suggestionSection}>
              <div className={styles.sectionHeader}>
                <h3>Search Results</h3>
              </div>
              <div className={styles.trendingList}>
                {initialSuggestions.trending
                  .filter(item => item.term.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, index) => (
                    <button key={index} className={styles.suggestion}>
                      <ion-icon name="search-outline"></ion-icon>
                      <span className={styles.searchTerm}>{item.term}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 