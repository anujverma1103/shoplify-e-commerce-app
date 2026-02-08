'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import './ProductScreen.css';

/**
 * ProductScreen Component
 * Displays detailed information about a single product
 * Allows quantity selection and adding to cart
 */
export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  /**
   * Fetch product details on component mount
   */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProductById(id);

        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-screen"><div className="loading">Loading...</div></div>;
  }

  if (error || !product) {
    return (
      <div className="product-screen">
        <div className="error">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="product-screen">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-container">
        {/* Product Image */}
        <div className="product-image-section">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="category">Category: {product.category}</p>

          <div className="rating">
            <span className="stars">★★★★☆</span>
            <span>({product.numReviews} reviews)</span>
          </div>

          <div className="price-section">
            <h2 className="price">₹{product.price.toLocaleString("en-IN")}</h2>
            <p className="stock">
              {product.countInStock > 0
                ? `${product.countInStock} in stock`
                : 'Out of Stock'}
            </p>
          </div>

          <p className="description">{product.description}</p>

          <div className="purchase-section">
            {product.countInStock > 0 && (
              <>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.countInStock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>

                <button 
                  className="btn-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </>
            )}

            {product.countInStock === 0 && (
              <button className="btn-out-of-stock" disabled>
                Out of Stock
              </button>
            )}
          </div>

          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}</li>
              <li><strong>Rating:</strong> {product.rating}/5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
