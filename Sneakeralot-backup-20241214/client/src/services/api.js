import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile')
};

export const products = {
  getAll: (filters) => api.get('/products', { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } })
};

export const cart = {
  get: () => api.get('/cart'),
  addItem: (productId, quantity, size) => 
    api.post('/cart/items', { productId, quantity, size }),
  updateItem: (itemId, quantity) => 
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`)
};

export const orders = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  completePayment: (orderId, paymentMethodId) =>
    api.post(`/orders/${orderId}/payment`, { paymentMethodId })
};

export default {
  auth,
  products,
  cart,
  orders
};
