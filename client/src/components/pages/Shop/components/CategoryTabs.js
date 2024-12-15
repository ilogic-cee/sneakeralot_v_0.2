import React, { useRef, useEffect, useState } from 'react';
import styles from './CategoryTabs.module.css';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef(new Map());
  const containerRef = useRef(null);

  // Update indicator position
  useEffect(() => {
    const selectedTab = tabsRef.current.get(selectedCategory);
    if (selectedTab && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = selectedTab.getBoundingClientRect();

      setIndicatorStyle({
        left: `${tabRect.left - containerRect.left}px`,
        width: `${tabRect.width}px`
      });

      // Scroll into view if needed
      const isTabVisible = (
        tabRect.left >= containerRect.left &&
        tabRect.right <= containerRect.right
      );

      if (!isTabVisible) {
        selectedTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedCategory]);

  return (
    <div className={styles.container} ref={containerRef}>
      <nav className={styles.tabs} role="tablist">
        {categories.map(category => (
          <button
            key={category.id}
            ref={el => {
              if (el) tabsRef.current.set(category.id, el);
            }}
            className={`${styles.tab} ${
              selectedCategory === category.id ? styles.selected : ''
            }`}
            role="tab"
            aria-selected={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
        <div 
          className={styles.indicator} 
          style={indicatorStyle}
          aria-hidden="true"
        />
      </nav>
    </div>
  );
};

export default CategoryTabs; 