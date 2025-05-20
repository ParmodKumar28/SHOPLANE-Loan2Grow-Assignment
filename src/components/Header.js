import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/products" className="logo">
          <h1>SHOPLANE</h1>
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                CLOTHINGS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                ACCESSORIES
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="cart">
            <Link to="/cart" className="cart-icon">
              <span className="cart-count">{totalQuantity}</span>
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>

          {isAuthenticated ? (
            <button className="btn btn-link" onClick={handleLogout}>
              <i className="fas fa-user"></i> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-link">
              <i className="fas fa-user"></i> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
