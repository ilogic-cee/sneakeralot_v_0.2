import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Layout />
      </SearchProvider>
    </Router>
  );
};

export default App; 