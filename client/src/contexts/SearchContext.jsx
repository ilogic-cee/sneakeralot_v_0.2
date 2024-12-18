import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const value = {
    isSearchActive,
    setIsSearchActive
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 