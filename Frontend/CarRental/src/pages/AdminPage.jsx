import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../assets/components/admin/AdminDashboard';
import CompanyList from '../assets/components/admin/CompanyList';
import './admin.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // For now, we'll simulate admin access
        // In a real app, you'd check admin credentials
        setUser({ email: 'admin@carrental.com', role: 'admin' });
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="admin-header">
                <div className="header-content">
                    <div className="logo-section">
                        <span className="logo-icon">🚗</span>
                        <h1>CarRental Pro - Admin</h1>
                    </div>
                    
                    <div className="user-section">
                        <div className="user-info">
                            <span className="user-icon">👨‍💼</span>
                            <span className="user-name">{user.email}</span>
                            <span className="user-role">Administrator</span>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="admin-nav">
                <button 
                    className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    <span className="tab-icon">📊</span>
                    Dashboard
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'companies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('companies')}
                >
                    <span className="tab-icon">🏢</span>
                    Companies
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'cars' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cars')}
                >
                    <span className="tab-icon">🚗</span>
                    Car Variants
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    <span className="tab-icon">📋</span>
                    Bookings
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('customers')}
                >
                    <span className="tab-icon">👥</span>
                    Customers
                </button>
            </nav>

            {/* Main Content */}
            <main className="admin-content">
                {activeTab === 'dashboard' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Admin Dashboard</h2>
                            <p>Overview of your car rental system</p>
                        </div>
                        <AdminDashboard />
                    </div>
                )}

                {activeTab === 'companies' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Car Companies</h2>
                            <p>Manage car companies and brands</p>
                        </div>
                        <CompanyList />
                    </div>
                )}

                {activeTab === 'cars' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Car Variants</h2>
                            <p>Manage car models and variants</p>
                        </div>
                        <div className="cars-placeholder">
                            <div className="placeholder-icon">🚗</div>
                            <h3>Car Variants Management</h3>
                            <p>Add and manage car variants here.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Bookings</h2>
                            <p>View and manage customer bookings</p>
                        </div>
                        <div className="bookings-placeholder">
                            <div className="placeholder-icon">📋</div>
                            <h3>Booking Management</h3>
                            <p>View and manage all customer bookings here.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'customers' && (
                    <div className="tab-content">
                        <div className="content-header">
                            <h2>Customers</h2>
                            <p>Manage customer accounts</p>
                        </div>
                        <div className="customers-placeholder">
                            <div className="placeholder-icon">👥</div>
                            <h3>Customer Management</h3>
                            <p>View and manage customer accounts here.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;