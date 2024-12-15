import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Shop.module.css';
import { products as initialProducts } from '../../../data/products';

// Components
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import CategoryTabs from './components/CategoryTabs';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  // State for products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 1000 }
  });
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // Categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'running', name: 'Running' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'casual', name: 'Casual' },
    { id: 'training', name: 'Training' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  // Initialize products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(initialProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((option) => {
    setSortOption(option);
    setCurrentPage(1);
  }, []);

  // Load more products
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, isLoadingMore, hasMore]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply selected filters
    result = result.filter(product => {
      const matchesBrand = selectedFilters.brands.length === 0 || 
        selectedFilters.brands.includes(product.brand);
      const matchesColor = selectedFilters.colors.length === 0 || 
        product.colors.some(color => selectedFilters.colors.includes(color));
      const matchesSize = selectedFilters.sizes.length === 0 || 
        product.sizes.some(size => selectedFilters.sizes.includes(size));
      const matchesPrice = product.price >= selectedFilters.priceRange.min && 
        product.price <= selectedFilters.priceRange.max;

      return matchesBrand && matchesColor && matchesSize && matchesPrice;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
    setHasMore(result.length > currentPage * PRODUCTS_PER_PAGE);
    setIsLoadingMore(false);
  }, [products, selectedCategory, searchQuery, selectedFilters, sortOption, currentPage]);

  // Get paginated products
  const paginatedProducts = filteredProducts.slice(0, currentPage * PRODUCTS_PER_PAGE);

  // Get available filter options from products
  const filterOptions = {
    brands: [...new Set(products.map(p => p.brand))].sort(),
    colors: [...new Set(products.flatMap(p => p.colors))].sort(),
    sizes: [...new Set(products.flatMap(p => p.sizes))].sort((a, b) => a - b),
    priceRange: {
      min: Math.min(...products.map(p => p.price), 0),
      max: Math.max(...products.map(p => p.price), 1000)
    }
  };

  return (
    <div className={styles.shop}>
      <div className={styles.header}>
        <h1>Shop</h1>
        <div className={styles.searchAndSort}>
          <SearchBar onSearch={handleSearch} />
          <SortDropdown 
            options={sortOptions} 
            value={sortOption} 
            onChange={handleSortChange} 
          />
        </div>
      </div>

      <CategoryTabs 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className={styles.mainContent}>
        <FilterSidebar 
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />
        <div className={styles.productGridContainer}>
          <ProductGrid 
            products={paginatedProducts}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
          />
          {!isLoading && hasMore && (
            <div ref={observerTarget} className={styles.loadingTrigger}>
              {isLoadingMore && <div className={styles.loadingSpinner} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 