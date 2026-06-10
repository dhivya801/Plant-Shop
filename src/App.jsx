import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image">
            <div className="content">
              <div className="paradise-content">
                <div className="company-logo">
                  <img
                    src="https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=120&q=80"
                    alt="Paradise Nursery Logo"
                    style={{ width: 80, borderRadius: '50%', marginBottom: 12 }}
                  />
                </div>
                <h1 className="company-name">Welcome to Paradise Nursery</h1>
                <p className="company-tagline">
                  Where Green Meets Life — Bringing Nature to Your Doorstep
                </p>
                <button
                  className="get-started-button"
                  onClick={() => setShowProductList(true)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
