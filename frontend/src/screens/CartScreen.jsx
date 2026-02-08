'use client';

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './CartScreen.css';

/**
 * CartScreen Component
 * Displays shopping cart items with quantity adjustments
 * Shows order summary with tax and shipping
 */
export default function CartScreen() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const {
    cartItems,
    updateCartItem,
    removeFromCart,
    subtotal,
    tax,
    shipping,
    total,
  } = useContext(CartContext);

  const handleCheckout = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-screen">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn-continue">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-screen">
      <h1>Shopping Cart ({cartItems.length} items)</h1>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-brand">{item.brand}</p>
                <p className="item-price">₹{item.price.toLocaleString("en-IN")}</p>
              </div>
        


              <div className="item-quantity">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={item.countInStock}
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartItem(item._id, parseInt(e.target.value))
                  }
                />
              </div>

              <div className="item-total">
                <p>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>

              <button
                className="btn-remove"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>₹{tax.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : `$ ₹{shipping.toLocaleString("en-IN")}`}</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            {token ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>

          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
