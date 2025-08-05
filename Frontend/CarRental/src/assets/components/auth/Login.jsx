import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerLogin, testBackend } from '../../../api';
import './auth.css';

const Login = () => {
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
            console.log('Attempting login with:', { email, password });
            const response = await customerLogin({ email, password });
            console.log('Login response:', response);
            console.log('Response data:', response.data);
            console.log('Response status:', response.status);
            
            if (response.data && response.data.success) {
                console.log('Login successful, navigating to customer page');
                // Store user data in localStorage if needed
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/customer');
            } else {
                console.log('Login failed, response data:', response.data);
                setError(response.data?.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response);
            console.error('Error message:', err.message);
            console.error('Error code:', err.code);
            
            if (err.response?.status === 404) {
                setError('User not found. Please check your email.');
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
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
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
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>
                        Don't have an account? <a href="/register">Register here</a>
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

export default Login;

// No change needed unless you want to update header after login.