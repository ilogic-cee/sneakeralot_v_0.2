import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Other components will go here */}
        <Footer />
      </div>
    </Router>
  );
}

export default App; 