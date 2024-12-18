import { useState, useCallback } from 'react';

const useSizeGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const openSizeGuide = useCallback((brand = '', category = '') => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
    setIsOpen(true);
  }, []);

  const closeSizeGuide = useCallback(() => {
    setIsOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setSelectedBrand('');
      setSelectedCategory('');
    }, 300);
  }, []);

  return {
    isOpen,
    selectedBrand,
    selectedCategory,
    openSizeGuide,
    closeSizeGuide
  };
};

export default useSizeGuide; 