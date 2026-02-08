/**
 * API Service - Handles all HTTP requests to backend
 * Includes authorization headers and error handling
 */

const API_BASE_URL = '/api';

const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Authentication API calls
export const authAPI = {
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getMe: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(token),
    });
    return response.json();
  },
};

// Product API calls
export const productAPI = {
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  createProduct: async (productData, token) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  updateProduct: async (id, productData, token) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  deleteProduct: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return response.json();
  },
};

// Order API calls
export const orderAPI = {
  createOrder: async (orderData, token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getOrderById: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getMyOrders: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders/myorders`, {
      headers: getHeaders(token),
    });
    return response.json();
  },

  getAllOrders: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getHeaders(token),
    });
    return response.json();
  },
};
