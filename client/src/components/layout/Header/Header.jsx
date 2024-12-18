import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            SneakerAlot
          </Link>

          {/* Main Navigation */}
          <nav className={styles.mainNav}>
            <ul>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/sale">Sale</Link></li>
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className={styles.actions}>
            <Link to="/wishlist" className={styles.iconButton}>
              <svg width="24px" height="24px" fill="none" stroke="#111" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>
            <button className={styles.iconButton} aria-label="Search">
              <svg width="24px" height="24px" fill="none" stroke="#111" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="/account" className={styles.iconButton}>
              <svg width="24px" height="24px" fill="none" stroke="#111" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
            <Link to="/cart" className={styles.iconButton}>
              <svg width="24px" height="24px" fill="none" stroke="#111" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className={styles.cartBadge}>0</span>
            </Link>
          </div>
        </div>
      </header>
      
      <div className={styles.shopNewArrivals}>
        <span className={styles.shopNewArrivalsTitle}>Shop All New Arrivals</span>
        <Link to="/new-arrivals" className={styles.shopNewArrivalsLink}>Shop</Link>
      </div>
    </div>
  );
};

export default Header; 