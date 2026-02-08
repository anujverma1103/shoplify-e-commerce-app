'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import './HomeScreen.css';

/**
 * HomeScreen Component
 * Displays a grid of all products from the backend
 * Handles loading and error states
 */
export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all products on component mount
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        
        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="home-screen">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-screen">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <section className="hero">
        <h1>Welcome to Shoplify</h1>
        <p>Discover amazing products at great prices</p>
      </section>

      <section className="products-section">
        <h2>Featured Products</h2>
        
        {products.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
