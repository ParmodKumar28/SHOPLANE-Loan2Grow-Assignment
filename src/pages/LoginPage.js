import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import './AuthPages.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter valid email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter valid email.';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Please enter password.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(user => user.email === formData.email);

    if (!foundUser) {
      setErrors({ email: "User not found. Please sign up first." });
      return;
    }

    if (foundUser.password !== formData.password) {
      setErrors({ password: "Incorrect password. Try again." });
      return;
    }

    // If credentials are correct, log in the user
    dispatch(login(foundUser));
    navigate('/products');
  }
};
  
  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/signup" className="auth-tab">SIGNUP</Link>
          <button className="auth-tab active">LOGIN</button>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group text-right">
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">LOG ME IN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;