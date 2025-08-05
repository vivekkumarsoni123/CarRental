import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');
    setLoggedIn(!!user || !!admin);
  }, [location]);

  if (loggedIn) {
    // Show only logo, centered, with efficient look
    return (
      <header className="header logo-only-header">
        <div className="logo-only-container">
          <span className="logo-bg">
            <span className="logo-icon">🚗</span>
          </span>
          <h1 className="logo-title">CarRental Pro</h1>
        </div>
      </header>
    );
  }

  return (
    <header className="header enhanced-header">
      <div className="header-container enhanced-header-container">
        <div className="logo enhanced-logo">
          <Link to="/" className="logo-link">
            <span className="logo-bg">
              <span className="logo-icon">🚗</span>
            </span>
            <div className="logo-text">
              <h1>CarRental Pro</h1>
              <span className="logo-tagline">Drive Your Journey, Effortlessly</span>
            </div>
          </Link>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links enhanced-nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link enhanced-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={`nav-link enhanced-nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">📝</span>
                Register
              </Link>
            </li>
            <li>
              <Link 
                to="/login-choice" 
                className={`nav-link enhanced-nav-link ${location.pathname === '/login-choice' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">🔐</span>
                Login
              </Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;