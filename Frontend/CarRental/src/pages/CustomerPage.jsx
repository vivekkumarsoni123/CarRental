import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarList from '../assets/components/car/CarList';
import './customer.css';

const CustomerPage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('cars');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        try {
            setUser(JSON.parse(userData));
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="customer-dashboard" style={{ background: "#f7f8fa" }}>
            {/* Header */}
            <header className="customer-header">
                <div className="header-content">
                    <div className="logo-section">
                        <span className="logo-icon">🚗</span>
                        <h1>CarRental Pro</h1>
                    </div>
                    
                    <div className="user-section">
                        <div className="user-info">
                            <span className="user-icon">👤</span>
                            {/* Remove user-name and show only icon */}
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="dashboard-nav">
                <button 
                    className={`nav-tab ${activeTab === 'cars' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cars')}
                >
                    <span className="tab-icon">🚗</span>
                    Available Cars
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    <span className="tab-icon">📋</span>
                    My Bookings
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <span className="tab-icon">👤</span>
                    Profile
                </button>
            </nav>

            {/* Main Content */}
            <main className="dashboard-content">
                {activeTab === 'cars' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Available Cars</h2>
                            <p>Choose from our premium collection of vehicles</p>
                        </div>
                        <CarList />
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>My Bookings</h2>
                            <p>View and manage your car rentals</p>
                        </div>
                        <div className="bookings-placeholder">
                            <div className="placeholder-icon">📋</div>
                            <h3>No bookings yet</h3>
                            <p>Your booking history will appear here once you rent a car.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>My Profile</h2>
                            <p>Manage your account information</p>
                        </div>
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    <span className="avatar-icon">👤</span>
                                </div>
                                <div className="profile-info">
                                    <h3>{user.email || 'Customer'}</h3>
                                    <p>Member since {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="profile-details">
                                <div className="detail-item">
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{user.email || 'Not provided'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Account Type:</span>
                                    <span className="detail-value">Customer</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Status:</span>
                                    <span className="detail-value status-active">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CustomerPage;