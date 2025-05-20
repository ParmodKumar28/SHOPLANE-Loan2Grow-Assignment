import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import Header from '../components/Header';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartPage}>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className={styles.btnPrimary}>Continue Shopping</Link>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              <div className={styles.cartHeader}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>

              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title} 
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                  
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>

                  <div className={styles.quantityControls}>
                    <button className={styles.quantityBtn} onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className={styles.quantityBtn} onClick={() => handleIncreaseQuantity(item)}>+</button>
                  </div>

                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <button className={styles.checkoutBtn}>Proceed to Checkout</button>

              <div className={styles.cartActions}>
                <Link to="/products">Continue Shopping</Link>
                <button className={styles.clearCart} onClick={handleClearCart}>Clear Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;