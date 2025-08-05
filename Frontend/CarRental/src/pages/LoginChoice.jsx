import React from 'react';
import { Link } from 'react-router-dom';
import './login-choice.css';

const LoginChoice = () => {
    return (
        <div className="login-choice-container">
            <div className="choice-card">
                <div className="choice-header">
                    <h1>Welcome to CarRental Pro</h1>
                    <p>Choose your login type to continue</p>
                </div>
                
                <div className="choice-options">
                    <Link to="/login" className="choice-option customer">
                        <div className="option-icon">👤</div>
                        <h2>Customer Login</h2>
                        <p>Access your account to browse and book cars</p>
                        <div className="option-features">
                            <span>• Browse available cars</span>
                            <span>• Make bookings</span>
                            <span>• View booking history</span>
                        </div>
                    </Link>
                    
                    <Link to="/admin-login" className="choice-option admin">
                        <div className="option-icon">👨‍💼</div>
                        <h2>Admin Login</h2>
                        <p>Manage the car rental system and operations</p>
                        <div className="option-features">
                            <span>• Manage companies</span>
                            <span>• Add car variants</span>
                            <span>• View all bookings</span>
                        </div>
                    </Link>
                </div>
                
                <div className="choice-footer">
                    <p>New to CarRental Pro? <Link to="/register">Create a customer account</Link></p>
                    <p>Need admin access? <Link to="/admin-register">Register as Admin</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginChoice; 