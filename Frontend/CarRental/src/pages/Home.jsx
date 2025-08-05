import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCompanies, fetchAllCarVariants } from '../api';
import './home.css';

const Home = () => {
    const [companies, setCompanies] = useState([]);
    const [carVariants, setCarVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [companiesResponse, carVariantsResponse] = await Promise.all([
                    fetchAllCompanies(),
                    fetchAllCarVariants()
                ]);
                
                setCompanies(companiesResponse.data || []);
                setCarVariants(carVariantsResponse.data || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section green-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="highlight">CarRental Pro</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your premium destination for hassle-free car rentals. 
                        Choose from our extensive fleet of vehicles and enjoy a seamless booking experience.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="cta-button primary">
                            Get Started
                        </Link>
                        <Link to="/login-choice" className="cta-button secondary">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <span className="hero-car">🚗</span>
                </div>
            </section>

            {/* Companies Section */}
            <section className="companies-section">
                <div className="container">
                    <h2 className="section-title">Car Companies Available</h2>
                    <div className="companies-grid">
                        {companies.length > 0 ? (
                            companies.map((company, index) => (
                                <div key={index} className="company-card">
                                    <div className="company-icon">🏢</div>
                                    <h3>{company.company_name || 'Company Name'}</h3>
                                    <p>{company.description || 'Premium car rental partner'}</p>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">
                                <div className="no-data-icon">🏢</div>
                                <h3>No companies available</h3>
                                <p>Check back later for our partner companies</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Car Variants Section */}
            <section className="car-variants-section">
                <div className="container">
                    <h2 className="section-title">Available Car Variants</h2>
                    <div className="car-variants-grid">
                        {carVariants.length > 0 ? (
                            carVariants.map((variant, index) => (
                                <div key={index} className="variant-card">
                                    <div className="variant-image">
                                        <span className="car-icon">🚗</span>
                                    </div>
                                    <div className="variant-info">
                                        <h3>{variant.name || 'Car Model'}</h3>
                                        <div className="variant-details">
                                            <span className="detail-item">
                                                <span className="detail-icon">🎨</span>
                                                {variant.color || 'Color'}
                                            </span>
                                            <span className="detail-item">
                                                <span className="detail-icon">💺</span>
                                                {variant.seats || 'Seats'} Seats
                                            </span>
                                            <span className="detail-item">
                                                <span className="detail-icon">⛽</span>
                                                {variant.fuel_type || 'Fuel Type'}
                                            </span>
                                        </div>
                                        <div className="variant-price">
                                            <span className="price-label">Price per day:</span>
                                            <span className="price-amount">${variant.price_per_day || '0'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">
                                <div className="no-data-icon">🚗</div>
                                <h3>No car variants available</h3>
                                <p>Check back later for our car collection</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose CarRental Pro?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚗</div>
                            <h3>Wide Selection</h3>
                            <p>Choose from our diverse fleet of vehicles, from compact cars to luxury SUVs.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Quick Booking</h3>
                            <p>Book your car in minutes with our streamlined reservation process.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Best Prices</h3>
                            <p>Competitive rates and transparent pricing with no hidden fees.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3>Safe & Reliable</h3>
                            <p>All our vehicles are regularly maintained and fully insured.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Register</h3>
                            <p>Create your account in just a few simple steps.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Browse Cars</h3>
                            <p>Explore our available vehicles and find your perfect match.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Book & Enjoy</h3>
                            <p>Make your reservation and enjoy your journey!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Join thousands of satisfied customers who trust CarRental Pro for their transportation needs.</p>
                    <Link to="/register" className="cta-button primary large">
                        Start Renting Today
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;