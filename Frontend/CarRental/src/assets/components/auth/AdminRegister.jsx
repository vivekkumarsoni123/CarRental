import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../../../api';
import './auth.css';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting admin registration with:', { 
                name: formData.name, 
                email: formData.email 
            });
            
            const response = await createAdmin({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            console.log('Admin registration response:', response);
            
            if (response.data && response.data.success) {
                setSuccess('Admin registered successfully! You can now login.');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setTimeout(() => {
                    navigate('/admin-login');
                }, 2000);
            } else {
                setError(response.data?.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Admin registration error:', err);
            console.error('Error response:', err.response);
            
            if (err.response?.status === 409) {
                setError('Admin with this email already exists.');
            } else if (err.response?.status === 500) {
                setError('Server error. Please try again later.');
            } else if (err.code === 'ERR_NETWORK') {
                setError('Network error. Please check your connection.');
            } else {
                setError(err.response?.data?.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Admin Registration</h2>
                    <p>Create a new admin account</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password (min 6 characters)"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Admin Account'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>
                        Already have an account? <a href="/admin-login">Sign In</a>
                    </p>
                    <p>
                        <a href="/login-choice">Back to Login Choice</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister; 