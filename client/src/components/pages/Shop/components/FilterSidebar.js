import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ selectedFilters, onFilterChange, filterOptions }) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    colors: true,
    sizes: true,
    price: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBrandChange = (brand) => {
    const newBrands = selectedFilters.brands.includes(brand)
      ? selectedFilters.brands.filter(b => b !== brand)
      : [...selectedFilters.brands, brand];

    onFilterChange({
      ...selectedFilters,
      brands: newBrands
    });
  };

  const handleColorChange = (color) => {
    const newColors = selectedFilters.colors.includes(color)
      ? selectedFilters.colors.filter(c => c !== color)
      : [...selectedFilters.colors, color];

    onFilterChange({
      ...selectedFilters,
      colors: newColors
    });
  };

  const handleSizeChange = (size) => {
    const newSizes = selectedFilters.sizes.includes(size)
      ? selectedFilters.sizes.filter(s => s !== size)
      : [...selectedFilters.sizes, size];

    onFilterChange({
      ...selectedFilters,
      sizes: newSizes
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...selectedFilters,
      priceRange: {
        ...selectedFilters.priceRange,
        [name]: Number(value)
      }
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      brands: [],
      colors: [],
      sizes: [],
      priceRange: {
        min: filterOptions.priceRange.min,
        max: filterOptions.priceRange.max
      }
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Filters</h2>
        <button 
          className={styles.clearAll}
          onClick={clearAllFilters}
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      </div>

      {/* Brands Section */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('brands')}
          aria-expanded={expandedSections.brands}
        >
          <h3>Brands</h3>
          <ion-icon 
            name={expandedSections.brands ? 'chevron-up' : 'chevron-down'}
            aria-hidden="true"
          />
        </button>
        {expandedSections.brands && (
          <div className={styles.filterOptions}>
            {filterOptions.brands.map(brand => (
              <label key={brand} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedFilters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className={styles.checkmark}></span>
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('colors')}
          aria-expanded={expandedSections.colors}
        >
          <h3>Colors</h3>
          <ion-icon 
            name={expandedSections.colors ? 'chevron-up' : 'chevron-down'}
            aria-hidden="true"
          />
        </button>
        {expandedSections.colors && (
          <div className={`${styles.filterOptions} ${styles.colorOptions}`}>
            {filterOptions.colors.map(color => (
              <button
                key={color}
                className={`${styles.colorOption} ${
                  selectedFilters.colors.includes(color) ? styles.selected : ''
                }`}
                style={{ '--color': color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Filter by ${color} color`}
                aria-pressed={selectedFilters.colors.includes(color)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sizes Section */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('sizes')}
          aria-expanded={expandedSections.sizes}
        >
          <h3>Sizes</h3>
          <ion-icon 
            name={expandedSections.sizes ? 'chevron-up' : 'chevron-down'}
            aria-hidden="true"
          />
        </button>
        {expandedSections.sizes && (
          <div className={`${styles.filterOptions} ${styles.sizeOptions}`}>
            {filterOptions.sizes.map(size => (
              <button
                key={size}
                className={`${styles.sizeOption} ${
                  selectedFilters.sizes.includes(size) ? styles.selected : ''
                }`}
                onClick={() => handleSizeChange(size)}
                aria-pressed={selectedFilters.sizes.includes(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className={styles.filterSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection('price')}
          aria-expanded={expandedSections.price}
        >
          <h3>Price Range</h3>
          <ion-icon 
            name={expandedSections.price ? 'chevron-up' : 'chevron-down'}
            aria-hidden="true"
          />
        </button>
        {expandedSections.price && (
          <div className={styles.priceRange}>
            <div className={styles.priceInputs}>
              <div className={styles.priceInput}>
                <label htmlFor="min-price">Min</label>
                <div className={styles.inputWithPrefix}>
                  <span>$</span>
                  <input
                    id="min-price"
                    type="number"
                    name="min"
                    min={filterOptions.priceRange.min}
                    max={selectedFilters.priceRange.max}
                    value={selectedFilters.priceRange.min}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              <div className={styles.priceInput}>
                <label htmlFor="max-price">Max</label>
                <div className={styles.inputWithPrefix}>
                  <span>$</span>
                  <input
                    id="max-price"
                    type="number"
                    name="max"
                    min={selectedFilters.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={selectedFilters.priceRange.max}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar; 