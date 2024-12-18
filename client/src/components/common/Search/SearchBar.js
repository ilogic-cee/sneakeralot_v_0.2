import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchService } from '../../../services/searchService';
import styles from './SearchBar.module.css';

const DEBOUNCE_DELAY = 300;

const SearchBar = ({ onClose, isExpanded = false }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(isExpanded);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);
  const [spellSuggestions, setSpellSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedSectionIndex, setFocusedSectionIndex] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const navigate = useNavigate();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setSearchHistory(searchService.getSearchHistory());
      const trending = await searchService.getTrendingSearches();
      setTrendingSearches(trending);
      const personalized = await searchService.getPersonalizedSuggestions();
      setPersonalizedSuggestions(personalized);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Debounced search function
  const debouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.length >= 2) {
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(async () => {
        try {
          // Get spell suggestions
          const spellResults = searchService.getSpellSuggestions(value);
          setSpellSuggestions(spellResults);

          // In a real app, we would also fetch search results here
          // const searchResults = await searchService.getSearchResults(value);
          // setSearchResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      }, DEBOUNCE_DELAY);
    } else {
      setSpellSuggestions([]);
      setIsLoading(false);
    }
  }, []);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Get all focusable items
  const getFocusableItems = () => {
    const sections = [
      spellSuggestions,
      searchHistory,
      trendingSearches,
      personalizedSuggestions
    ];
    return sections[focusedSectionIndex] || [];
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const focusableItems = getFocusableItems();
    const itemCount = focusableItems.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (e.altKey) {
          // Move to next section
          setFocusedSectionIndex(prev => 
            prev < 3 ? prev + 1 : 0
          );
          setSelectedIndex(0);
        } else {
          // Move to next item in current section
          setSelectedIndex(prev => 
            prev < itemCount - 1 ? prev + 1 : 0
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (e.altKey) {
          // Move to previous section
          setFocusedSectionIndex(prev => 
            prev > 0 ? prev - 1 : 3
          );
          setSelectedIndex(0);
        } else {
          // Move to previous item in current section
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : itemCount - 1
          );
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && focusableItems[selectedIndex]) {
          handleSuggestionClick(focusableItems[selectedIndex]);
        } else {
          handleSearch();
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (query) {
          setQuery('');
          setSpellSuggestions([]);
        } else {
          setIsActive(false);
        }
        break;

      case 'Tab':
        if (isActive) {
          e.preventDefault();
          if (e.shiftKey) {
            // Move to previous section
            setFocusedSectionIndex(prev => 
              prev > 0 ? prev - 1 : 3
            );
          } else {
            // Move to next section
            setFocusedSectionIndex(prev => 
              prev < 3 ? prev + 1 : 0
            );
          }
          setSelectedIndex(0);
        }
        break;

      default:
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchService.addToHistory(query.trim());
      setSearchHistory(searchService.getSearchHistory());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsActive(false);
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.text) {
      setQuery(suggestion.text);
      searchService.addToHistory(suggestion.text);
      setSearchHistory(searchService.getSearchHistory());
      navigate(`/search?q=${encodeURIComponent(suggestion.text)}`);
    }
    setIsActive(false);
    if (onClose) onClose();
  };

  const clearHistory = () => {
    searchService.clearHistory();
    setSearchHistory([]);
  };

  const clearSearch = () => {
    setQuery('');
    setSpellSuggestions([]);
    inputRef.current?.focus();
  };

  // Render loading placeholders
  const renderLoadingPlaceholders = () => (
    <div className={styles.suggestionSection}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={`${styles.loadingPlaceholder} ${styles.suggestionPlaceholder}`} />
      ))}
    </div>
  );

  return (
    <div 
      className={`${styles.searchContainer} ${isActive ? styles.active : ''}`}
      ref={searchRef}
      role="search"
    >
      <div className={`${styles.searchBar} ${isLoading ? styles.loading : ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands, and more..."
          className={styles.searchInput}
          aria-label="Search"
          aria-expanded={isActive}
          aria-controls="search-suggestions"
          aria-describedby={isLoading ? "search-status" : undefined}
        />
        
        {query && (
          <button
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <ion-icon name="close-outline" />
          </button>
        )}
        
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          aria-label="Search"
          disabled={isLoading}
        >
          <ion-icon 
            name={isLoading ? "refresh-outline" : "search-outline"} 
            className={isLoading ? styles.spinning : ''} 
          />
        </button>
      </div>

      {isActive && (
        <div 
          id="search-suggestions"
          className={styles.suggestionsPanel}
          role="listbox"
        >
          {isLoading ? (
            renderLoadingPlaceholders()
          ) : (
            <>
              {/* Spell Suggestions */}
              {spellSuggestions.length > 0 && (
                <div className={styles.spellSuggestions}>
                  <p>Did you mean:</p>
                  {spellSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      className={`${styles.spellSuggestion} ${
                        focusedSectionIndex === 0 && selectedIndex === index ? styles.selected : ''
                      }`}
                      onClick={() => setQuery(suggestion)}
                      role="option"
                      aria-selected={focusedSectionIndex === 0 && selectedIndex === index}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className={styles.suggestionSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Recent Searches</h3>
                    <button
                      className={styles.clearHistoryButton}
                      onClick={clearHistory}
                      aria-label="Clear search history"
                    >
                      Clear All
                    </button>
                  </div>
                  {searchHistory.map((item, index) => (
                    <button
                      key={item.timestamp}
                      className={`${styles.suggestion} ${
                        focusedSectionIndex === 1 && selectedIndex === index ? styles.selected : ''
                      }`}
                      onClick={() => handleSuggestionClick(item)}
                      role="option"
                      aria-selected={focusedSectionIndex === 1 && selectedIndex === index}
                    >
                      <ion-icon name="time-outline" aria-hidden="true" />
                      <span className={styles.text}>{item.text}</span>
                      <span className={styles.timestamp}>
                        {searchService.formatRelativeTime(item.timestamp)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {trendingSearches.length > 0 && (
                <div className={styles.suggestionSection}>
                  <h3>Trending Now</h3>
                  {trendingSearches.map((item, index) => (
                    <button
                      key={item.id}
                      className={`${styles.suggestion} ${
                        focusedSectionIndex === 2 && selectedIndex === index ? styles.selected : ''
                      }`}
                      onClick={() => handleSuggestionClick(item)}
                      role="option"
                      aria-selected={focusedSectionIndex === 2 && selectedIndex === index}
                    >
                      <ion-icon 
                        name={item.trending ? "trending-up-outline" : "stats-chart-outline"} 
                        aria-hidden="true"
                      />
                      <span className={styles.text}>{item.text}</span>
                      <span className={styles.searches}>
                        {item.searches.toLocaleString()} searches
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Personalized Suggestions */}
              {personalizedSuggestions.length > 0 && (
                <div className={styles.suggestionSection}>
                  <h3>Recommended for You</h3>
                  {personalizedSuggestions.map((item, index) => (
                    <button
                      key={item.id}
                      className={`${styles.suggestion} ${
                        focusedSectionIndex === 3 && selectedIndex === index ? styles.selected : ''
                      }`}
                      onClick={() => handleSuggestionClick(item)}
                      role="option"
                      aria-selected={focusedSectionIndex === 3 && selectedIndex === index}
                    >
                      <ion-icon name="star-outline" aria-hidden="true" />
                      <div className={styles.suggestionContent}>
                        <span className={styles.text}>{item.text}</span>
                        <span className={styles.reason}>{item.reason}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {query && 
                !spellSuggestions.length &&
                !searchHistory.length && 
                !trendingSearches.length && 
                !personalizedSuggestions.length && (
                <div className={styles.noResults} role="status">
                  <ion-icon name="search-outline" aria-hidden="true" />
                  <p>No results found for "{query}"</p>
                  <span>Try checking your spelling or using different keywords</span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Accessibility announcements */}
      {isLoading && (
        <div id="search-status" className="sr-only" role="status" aria-live="polite">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar; 