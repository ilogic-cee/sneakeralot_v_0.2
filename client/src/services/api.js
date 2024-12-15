import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Order and payment related API calls
export const createOrder = async (shippingAddress) => {
  try {
    const response = await api.post('/orders', { shippingAddress });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completePayment = async (orderId, paymentMethodId) => {
  try {
    const response = await api.post(`/orders/${orderId}/complete-payment`, {
      paymentMethodId,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api; 