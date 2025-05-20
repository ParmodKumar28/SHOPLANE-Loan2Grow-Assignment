import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product, cartItem }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, category } = product;
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image || "/placeholder.svg"} alt={title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        <p className="product-price">Rs {price}</p>
        
        {cartItem ? (
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={handleRemoveFromCart}>-</button>
            <span className="quantity">{cartItem.quantity}</span>
            <button className="quantity-btn" onClick={handleAddToCart}>+</button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;