import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, testBackend } from '../../../api';
import './auth.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const testConnection = async () => {
        try {
            const response = await testBackend();
            console.log('Backend test response:', response);
            alert('Backend is working! Response: ' + JSON.stringify(response.data));
        } catch (err) {
            console.error('Backend test error:', err);
            alert('Backend connection failed: ' + err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            console.log('Attempting admin login with:', { email, password });
            const response = await adminLogin({ email, password });
            console.log('Admin login response:', response);
            
            if (response.data && response.data.success) {
                localStorage.setItem('admin', JSON.stringify(response.data.admin));
                navigate('/admin');
            } else {
                setError(response.data?.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            console.error('Error response:', err.response);
            if (err.response?.status === 404) {
                setError('Admin not found. Please check your email.');
            } else if (err.response?.status === 500) {
                setError('Server error. Please try again later.');
            } else if (err.code === 'ERR_NETWORK') {
                setError('Network error. Please check your connection.');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Admin Login</h2>
                    <p>Sign in to manage the system</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In as Admin'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>
                        <a href="/login-choice">Back to Login Choice</a>
                    </p>
                    <p>
                        Need an admin account? <a href="/admin-register">Register as Admin</a>
                    </p>
                    <button 
                        type="button" 
                        onClick={testConnection}
                        style={{
                            background: 'transparent',
                            border: '1px solid #4CAF50',
                            color: '#4CAF50',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            marginTop: '10px'
                        }}
                    >
                        Test Backend Connection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin; 