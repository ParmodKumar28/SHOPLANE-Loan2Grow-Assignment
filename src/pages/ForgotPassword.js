import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter valid email.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter valid email.');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };
  
  return (
    <div className="auth-page forgot-password-page">
      <div className="auth-container">
        <div className="forgot-password-card">
          <h2 className="card-title">Reset Password</h2>
          
          {isSubmitted ? (
            <div className="success-message">
              <p>Password reset link has been sent to your email.</p>
              <Link to="/login" className="btn btn-primary btn-block">Back to Login</Link>
            </div>
          ) : (
            <>
              <p className="card-description">Please Provide Your Registered Email id to Reset Password.</p>
              
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email id</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email id"
                    value={email}
                    onChange={handleChange}
                  />
                  {error && <div className="error-message">{error}</div>}
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Reset Password</button>
                  <Link to="/login" className="btn btn-secondary">Login/Signup</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;