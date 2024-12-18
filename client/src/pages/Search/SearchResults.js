import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchResults.module.css';

// Mock data - replace with API calls
const mockProducts = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'Running',
    price: 149.99,
    image: '/assets/images/products/nike-airmax-270.jpg',
    rating: 4.5,
    reviews: 128,
    colors: ['Black/White', 'White/Red', 'Blue/Grey'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    inStock: true
  },
  // Add more mock products...
];

const filters = {
  brands: ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma'],
  categories: ['Running', 'Basketball', 'Lifestyle', 'Training'],
  colors: ['Black', 'White', 'Red', 'Blue', 'Grey'],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  priceRanges: [
    { label: 'Under $50', range: [0, 50] },
    { label: '$50 - $100', range: [50, 100] },
    { label: '$100 - $150', range: [100, 150] },
    { label: '$150 - $200', range: [150, 200] },
    { label: 'Over $200', range: [200, Infinity] }
  ]
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    categories: [],
    colors: [],
    sizes: [],
    priceRange: null,
    sortBy: 'relevance'
  });
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, [query, activeFilters]);

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const setPriceRange = (range) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? null : range
    }));
  };

  const setSortBy = (value) => {
    setActiveFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      brands: [],
      categories: [],
      colors: [],
      sizes: [],
      priceRange: null,
      sortBy: 'relevance'
    });
  };

  const renderFilterSection = (title, items, type) => (
    <div className={styles.filterSection}>
      <h3>{title}</h3>
      <div className={styles.filterOptions}>
        {items.map(item => (
          <label key={item} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={activeFilters[type].includes(item)}
              onChange={() => toggleFilter(type, item)}
            />
            <span className={styles.checkmark} />
            <span className={styles.label}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.searchResults}>
      <div className={styles.header}>
        <h1>Search Results for "{query}"</h1>
        <div className={styles.controls}>
          <button
            className={styles.filterToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            <ion-icon name={showFilters ? 'close-outline' : 'filter-outline'} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <select
            value={activeFilters.sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="relevance">Most Relevant</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      <div className={styles.content}>
        {/* Filters Sidebar */}
        <aside className={`${styles.filters} ${showFilters ? styles.active : ''}`}>
          <div className={styles.filtersHeader}>
            <h2>Filters</h2>
            {Object.values(activeFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter !== null
            ) && (
              <button
                className={styles.clearFilters}
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Price Ranges */}
          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <div className={styles.filterOptions}>
              {filters.priceRanges.map(({ label, range }) => (
                <label key={label} className={styles.filterOption}>
                  <input
                    type="radio"
                    checked={activeFilters.priceRange === range}
                    onChange={() => setPriceRange(range)}
                  />
                  <span className={styles.radiomark} />
                  <span className={styles.label}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          {renderFilterSection('Brands', filters.brands, 'brands')}
          {renderFilterSection('Categories', filters.categories, 'categories')}
          {renderFilterSection('Colors', filters.colors, 'colors')}
          {renderFilterSection('Sizes', filters.sizes, 'sizes')}
        </aside>

        {/* Results Grid */}
        <main className={styles.results}>
          {isLoading ? (
            <div className={styles.loading}>
              <ion-icon name="refresh-outline" className={styles.spinner} />
              <p>Loading results...</p>
            </div>
          ) : products.length > 0 ? (
            <div className={styles.grid}>
              {products.map(product => (
                <div key={product.id} className={styles.product}>
                  <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                    {!product.inStock && (
                      <div className={styles.outOfStock}>Out of Stock</div>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <div className={styles.brand}>{product.brand}</div>
                    <div className={styles.category}>{product.category}</div>
                    <div className={styles.price}>${product.price.toFixed(2)}</div>
                    <div className={styles.rating}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <ion-icon
                            key={i}
                            name={i < Math.floor(product.rating) ? 'star' : 'star-outline'}
                          />
                        ))}
                      </div>
                      <span className={styles.reviews}>({product.reviews})</span>
                    </div>
                    <div className={styles.variants}>
                      <div className={styles.colors}>
                        {product.colors.map(color => (
                          <div
                            key={color}
                            className={styles.colorDot}
                            style={{ background: color.split('/')[0].toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className={styles.sizes}>
                        {product.sizes.slice(0, 3).map(size => (
                          <span key={size} className={styles.size}>{size}</span>
                        ))}
                        {product.sizes.length > 3 && (
                          <span className={styles.moreSize}>+{product.sizes.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <ion-icon name="search-outline" />
              <h2>No results found</h2>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults; 