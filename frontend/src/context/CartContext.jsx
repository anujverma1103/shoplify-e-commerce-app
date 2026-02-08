'use client';

import { createContext, useState, useEffect } from 'react';

/**
 * CartContext - Manages shopping cart state
 * Stores items, quantities, and cart calculations
 */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /**
   * Add item to cart
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
          },
        ];
      }
    });
  };

  /**
   * Update cart item quantity
   */
  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  /**
   * Clear cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Calculate subtotal
   */
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Calculate tax (10%)
   */
  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  /**
   * Calculate shipping (free for orders over $50)
   */
  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 9.99;
  };

  /**
   * Calculate total
   */
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  /**
   * Persist cart to localStorage
   */
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartCount: cartItems.length,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        shipping: calculateShipping(),
        total: calculateTotal(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
