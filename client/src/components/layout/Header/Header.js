import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      
      // Always show header and shop section when at top of page
      if (currentScrollY < 50) {
        setIsHeaderHidden(false);
        return;
      }

      // Hide both header and shop section when scrolling down
      if (scrollDifference > 0 && !isHeaderHidden && currentScrollY > 60) {
        setIsHeaderHidden(true);
      } 
      // Show both header and shop section when scrolling up
      else if (scrollDifference < 0 && isHeaderHidden) {
        setIsHeaderHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderHidden, lastScrollY]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    if (!isMobileMenuOpen) {
      setIsSearchOpen(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    document.body.style.paddingTop = '60px';
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <>
      <div className={`${styles.headerWrapper} ${isHeaderHidden ? styles.hidden : ''}`}>
        <header className={styles.header}>
          <div className={styles.container}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              SneakerAlot
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.mainNav}>
              <ul>
                <li><Link to="/new-arrivals">New Arrivals</Link></li>
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/kids">Kids</Link></li>
                <li><Link to="/sale">Sale</Link></li>
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className={styles.desktopActions}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search"
                />
                <button className={styles.searchButton}>
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </div>
              <Link to="/wishlist" className={styles.iconButton}>
                <ion-icon name="heart-outline"></ion-icon>
              </Link>
              <Link to="/cart" className={styles.iconButton}>
                <ion-icon name="bag-outline"></ion-icon>
                <span className={styles.cartBadge}>0</span>
              </Link>
              <Link to="/account" className={styles.iconButton}>
                <ion-icon name="person-outline"></ion-icon>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className={styles.mobileActions}>
              <button className={styles.iconButton} onClick={toggleSearch} aria-label="Search">
                <ion-icon name="search-outline"></ion-icon>
              </button>
              <Link to="/account" className={styles.iconButton} aria-label="Account">
                <ion-icon name="person-outline"></ion-icon>
              </Link>
              <Link to="/cart" className={styles.iconButton} aria-label="Cart">
                <ion-icon name="bag-outline"></ion-icon>
                <span className={styles.cartBadge}>0</span>
              </Link>
              <button 
                className={styles.mobileMenuButton}
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label="Menu"
              >
                <span className={styles.hamburgerIcon}>
                  <span className={`${styles.hamburgerBar} ${isMobileMenuOpen ? styles.active : ''}`}></span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Shop All New Arrivals Section */}
        <div className={styles.shopNewArrivals}>
          <h2 className={styles.shopNewArrivalsTitle}>Shop All New Arrivals</h2>
          <Link to="/new-arrivals" className={styles.shopNewArrivalsLink}>Shop</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <button 
          className={styles.closeButton}
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>

        {/* Primary Navigation */}
        <div className={styles.mobileMenuMain}>
          <ul>
            <li>
              <Link to="/new-featured" className={styles.menuItem} onClick={toggleMobileMenu}>
                <span>New & Featured</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="/men" className={styles.menuItem} onClick={toggleMobileMenu}>
                <span>Men</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="/women" className={styles.menuItem} onClick={toggleMobileMenu}>
                <span>Women</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="/kids" className={styles.menuItem} onClick={toggleMobileMenu}>
                <span>Kids</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="/jordan" className={styles.menuItem} onClick={toggleMobileMenu}>
                <span className={styles.menuItemWithIcon}>
                  <img src="/jordan-logo.svg" alt="" className={styles.jordanLogo} />
                  Jordan
                </span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </li>
          </ul>
        </div>

        {/* Membership Section */}
        <div className={styles.membershipSection}>
          <p className={styles.membershipText}>
            Become a Nike Member for the best products, inspiration and stories in sport.
            <Link to="/learn-more" className={styles.learnMore}>Learn more</Link>
          </p>
          <div className={styles.membershipButtons}>
            <Link to="/join" className={styles.joinButton} onClick={toggleMobileMenu}>Join Us</Link>
            <Link to="/sign-in" className={styles.signInButton} onClick={toggleMobileMenu}>Sign In</Link>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className={styles.secondaryNav}>
          <ul>
            <li>
              <Link to="/help" className={styles.menuItem} onClick={toggleMobileMenu}>
                <ion-icon name="help-circle-outline"></ion-icon>
                <span>Help</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className={styles.menuItem} onClick={toggleMobileMenu}>
                <ion-icon name="bag-outline"></ion-icon>
                <span>Bag</span>
              </Link>
            </li>
            <li>
              <Link to="/orders" className={styles.menuItem} onClick={toggleMobileMenu}>
                <ion-icon name="cube-outline"></ion-icon>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/stores" className={styles.menuItem} onClick={toggleMobileMenu}>
                <ion-icon name="location-outline"></ion-icon>
                <span>Find a Store</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`} onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              autoFocus
            />
            <button className={styles.closeSearch} onClick={toggleSearch}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 