'use client';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';


export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="product-image"
          onClick={handleViewDetails}
        />
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-brand">{product.brand}</p>

        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-text">({product.numReviews} reviews)</span>
        </div>

        <p className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className="product-actions">
          <button
            className="btn-view-details"
            onClick={handleViewDetails}
          >
            View Details
          </button>

          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {product.countInStock === 0 && (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
}
