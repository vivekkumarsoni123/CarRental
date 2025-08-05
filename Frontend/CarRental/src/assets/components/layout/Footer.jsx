import React from 'react';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">🚗</span>
              <h3>CarRental Pro</h3>
            </div>
            <p className="footer-description">
              Your trusted partner for premium car rental services. 
              Experience comfort and reliability with our extensive fleet.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/customer">Customer Portal</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>Car Rental</li>
              <li>Premium Vehicles</li>
              <li>24/7 Support</li>
              <li>Flexible Booking</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>info@carrentalpro.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Car Street, Auto City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} CarRental Pro. All rights reserved.</p>
            <div className="footer-social">
              <span className="social-icon">📘</span>
              <span className="social-icon">📷</span>
              <span className="social-icon">🐦</span>
              <span className="social-icon">💼</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;