import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } 
        />
         <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;