import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';
import './AuthPages.css';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userType: 'Individual',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    mobileCode: '',
    mobileNumber: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Mock data for countries, states, and cities
  useEffect(() => {
    // In a real app, this would come from an API
    setCountries([
      { id: 1, name: 'India' },
      { id: 2, name: 'USA' },
      { id: 3, name: 'UK' },
    ]);
  }, []);
  
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setFormData({ ...formData, country: countryId, state: '', city: '' });
    
    // Mock state data based on country
    if (countryId === '1') { // India
      setStates([
        { id: 1, name: 'Delhi' },
        { id: 2, name: 'Maharashtra' },
        { id: 3, name: 'Karnataka' },
      ]);
    } else if (countryId === '2') { // USA
      setStates([
        { id: 4, name: 'California' },
        { id: 5, name: 'New York' },
        { id: 6, name: 'Texas' },
      ]);
    } else if (countryId === '3') { // UK
      setStates([
        { id: 7, name: 'England' },
        { id: 8, name: 'Scotland' },
        { id: 9, name: 'Wales' },
      ]);
    } else {
      setStates([]);
    }
    
    setCities([]);
  };
  
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData({ ...formData, state: stateId, city: '' });
    
    // Mock city data based on state
    if (stateId === '1') { // Delhi
      setCities([
        { id: 1, name: 'New Delhi' },
        { id: 2, name: 'Old Delhi' },
      ]);
    } else if (stateId === '2') { // Maharashtra
      setCities([
        { id: 3, name: 'Mumbai' },
        { id: 4, name: 'Pune' },
        { id: 5, name: 'Nagpur' },
      ]);
    } else if (stateId === '3') { // Karnataka
      setCities([
        { id: 6, name: 'Bangalore' },
        { id: 7, name: 'Mysore' },
      ]);
    } else if (stateId === '4') { // California
      setCities([
        { id: 8, name: 'Los Angeles' },
        { id: 9, name: 'San Francisco' },
      ]);
    } else if (stateId === '5') { // New York
      setCities([
        { id: 10, name: 'New York City' },
        { id: 11, name: 'Buffalo' },
      ]);
    } else if (stateId === '6') { // Texas
      setCities([
        { id: 12, name: 'Houston' },
        { id: 13, name: 'Dallas' },
      ]);
    } else if (stateId === '7') { // England
      setCities([
        { id: 14, name: 'London' },
        { id: 15, name: 'Manchester' },
      ]);
    } else if (stateId === '8') { // Scotland
      setCities([
        { id: 16, name: 'Edinburgh' },
        { id: 17, name: 'Glasgow' },
      ]);
    } else if (stateId === '9') { // Wales
      setCities([
        { id: 18, name: 'Cardiff' },
        { id: 19, name: 'Swansea' },
      ]);
    } else {
      setCities([]);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter valid first name.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter valid email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter valid email.';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Please enter valid address.';
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select your country.';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select your state.';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select your city.';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Please enter valid pincode.';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter valid pincode.';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter valid mobile number.';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Please enter password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password should be same as password.';
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
      dispatch(register(formData));
      navigate('/login');
    }
  };
  
  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-header">
          <button className="auth-tab active">SIGNUP</button>
          <Link to="/login" className="auth-tab">LOGIN</Link>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group radio-group">
              <label>Individual/Enterprise/Government *</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="Individual"
                    checked={formData.userType === 'Individual'}
                    onChange={handleChange}
                  />
                  Individual
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="Enterprise"
                    checked={formData.userType === 'Enterprise'}
                    onChange={handleChange}
                  />
                  Enterprise
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="Government"
                    checked={formData.userType === 'Government'}
                    onChange={handleChange}
                  />
                  Government
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
              {errors.country && <div className="error-message">{errors.country}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleStateChange}
                disabled={!formData.country}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              {errors.state && <div className="error-message">{errors.state}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <select
                id="city"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="form-control"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <div className="error-message">{errors.pincode}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number *</label>
            <div className="mobile-input">
              <select
                id="mobileCode"
                name="mobileCode"
                className="form-control mobile-code"
                value={formData.mobileCode}
                onChange={handleChange}
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                className="form-control mobile-number"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fax">Fax</label>
              <input
                type="text"
                id="fax"
                name="fax"
                className="form-control"
                placeholder="Fax"
                value={formData.fax}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password *</label>
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">SIGNUP</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;