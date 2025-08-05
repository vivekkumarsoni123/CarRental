import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../../api';
import './auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        cus_name: '',
        email: '',
        password: '',
        license_no: '',
        phone: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        try {
            console.log('Attempting registration with:', formData);
            const response = await registerCustomer(formData);
            console.log('Register response:', response);
            
            if (response.data && response.data.success) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(response.data?.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Error response:', error.response);
            if (error.response?.status === 409) {
                setMessage('Email already exists. Please use a different email.');
            } else if (error.response?.status === 500) {
                setMessage('Server error. Please try again later.');
            } else if (error.code === 'ERR_NETWORK') {
                setMessage('Network error. Please check your connection.');
            } else {
                setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{ background: "#f7f8fa" }}>
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Join our car rental community</p>
                </div>
                
                {message && (
                    <div className={`message ${message.includes('successful') ? 'success-message' : 'error-message'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="cus_name">Full Name</label>
                        <input
                            type="text"
                            id="cus_name"
                            name="cus_name"
                            value={formData.cus_name}
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
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="license_no">License Number</label>
                        <input
                            type="text"
                            id="license_no"
                            name="license_no"
                            value={formData.license_no}
                            onChange={handleChange}
                            placeholder="Enter your license number"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>
                        Already have an account? <a href="/login">Sign in here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;