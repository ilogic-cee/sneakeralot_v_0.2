import React, { createContext, useContext } from 'react';
import Modal from '../components/common/Modal/Modal';
import SizeGuide from '../components/common/SizeGuide/SizeGuide';
import useSizeGuide from '../hooks/useSizeGuide';

const SizeGuideContext = createContext(null);

export const useSizeGuideContext = () => {
  const context = useContext(SizeGuideContext);
  if (!context) {
    throw new Error('useSizeGuideContext must be used within a SizeGuideProvider');
  }
  return context;
};

export const SizeGuideProvider = ({ children }) => {
  const sizeGuideState = useSizeGuide();
  const { isOpen, selectedBrand, selectedCategory, closeSizeGuide } = sizeGuideState;

  return (
    <SizeGuideContext.Provider value={sizeGuideState}>
      {children}
      <Modal isOpen={isOpen} onClose={closeSizeGuide}>
        <SizeGuide
          brand={selectedBrand}
          category={selectedCategory}
          onClose={closeSizeGuide}
        />
      </Modal>
    </SizeGuideContext.Provider>
  );
};

export default SizeGuideProvider; 