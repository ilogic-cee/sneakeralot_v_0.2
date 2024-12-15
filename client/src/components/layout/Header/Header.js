import React, { useState, useCallback, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
  }, [isSearchOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.announcement}>
          FREE SHIPPING THIS WEEK ORDER OVER - 1699.99 RANDS
        </div>
        <div className={styles.topBarRight}>
          <select className={styles.currencySelect}>
            <option value="ZAR">ZAR R</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
          </select>
          <select className={styles.languageSelect}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <ion-icon name={isMobileMenuOpen ? "close-outline" : "menu-outline"} />
        </button>

        <Link to="/" className={styles.logo}>
          <img src="/images/SneakerAlot-logo.png" alt="SneakerAlot" />
        </Link>

        <nav className={`${styles.mainNav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/new-arrivals" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                NEW ARRIVALS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/trending" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                TRENDING
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/deals" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                DEALS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                BLOG
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <button 
            className={styles.searchButton}
            onClick={toggleSearch}
            aria-label="Search"
          >
            <ion-icon name="search-outline" />
          </button>

          <Link to="/account" className={styles.accountButton} aria-label="Account">
            <ion-icon name="person-outline" />
          </Link>

          <Link to="/wishlist" className={styles.wishlistButton} aria-label="Wishlist">
            <ion-icon name="heart-outline" />
          </Link>

          <Link to="/cart" className={styles.cartButton} aria-label="Cart">
            <ion-icon name="bag-outline" />
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchContainer}>
            <input
              type="search"
              placeholder="Search for sneakers..."
              className={styles.searchInput}
              autoFocus
            />
            <button 
              className={styles.closeSearchButton}
              onClick={toggleSearch}
              aria-label="Close search"
            >
              <ion-icon name="close-outline" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 