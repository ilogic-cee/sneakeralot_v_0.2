// App Constants
export const APP_NAME = 'Sneakeralot';
export const APP_DESCRIPTION = 'Your Premium Sneaker Destination';

// Authentication
export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

// Pagination
export const ITEMS_PER_PAGE = 12;
export const MAX_PAGINATION_LINKS = 5;

// Cart
export const MAX_CART_ITEMS = 10;
export const MIN_ORDER_AMOUNT = 0;
export const SHIPPING_THRESHOLD = 100; // Free shipping threshold

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Running',
  'Basketball',
  'Lifestyle',
  'Training',
  'Soccer',
  'Skateboarding',
];

// Product Sizes
export const PRODUCT_SIZES = [
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  STRIPE: 'stripe',
};

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Social Media
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/sneakeralot',
  INSTAGRAM: 'https://instagram.com/sneakeralot',
  TWITTER: 'https://twitter.com/sneakeralot',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'support@sneakeralot.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Sneaker Street, Footwear City, FC 12345',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERAL: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
  },
  CART: {
    MAX_QUANTITY: `You can't add more than ${MAX_CART_ITEMS} items.`,
    OUT_OF_STOCK: 'This item is currently out of stock.',
  },
}; 