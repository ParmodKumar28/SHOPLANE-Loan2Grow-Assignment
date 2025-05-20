import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
  
  // Separate clothing and accessories
  const clothingCategories = ['men\'s clothing', 'women\'s clothing'];
  const accessoryCategories = ['jewelery', 'electronics'];
  
  const renderProductSection = (title, categories) => {
    const filteredProducts = products.filter(product => categories.includes(product.category));
    
    if (filteredProducts.length === 0) {
      return null;
    }
    
    return (
      <section className="product-section">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          
          <div className="product-grid">
            {filteredProducts.map(product => {
              const cartItem = cartItems.find(item => item.id === product.id);
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartItem={cartItem}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  };
  
  return (
    <div className="products-page">
      <Header />
      
      <main className="main-content">
        {status === 'loading' && (
          <div className="loading">
            <p>Loading products...</p>
          </div>
        )}
        
        {status === 'failed' && (
          <div className="error">
            <p>Error: {error}</p>
          </div>
        )}
        
        {status === 'succeeded' && (
          <>
            {renderProductSection('Clothing for Men and Women', clothingCategories)}
            {renderProductSection('Accessories for Men and Women', accessoryCategories)}
          </>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;