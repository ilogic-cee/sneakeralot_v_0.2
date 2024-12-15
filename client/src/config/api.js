import axios from 'axios';

// API Base URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { token } = response.data;
          
          localStorage.setItem('auth_token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          return api(originalRequest);
        }
      } catch (error) {
        // Handle refresh token failure
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
    search: '/products/search',
  },
  cart: {
    get: '/cart',
    add: '/cart/add',
    remove: '/cart/remove',
    update: '/cart/update',
  },
  orders: {
    create: '/orders',
    list: '/orders',
    detail: (id) => `/orders/${id}`,
  },
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
  },
};

export default api; 