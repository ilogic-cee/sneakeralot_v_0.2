const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrderById,
  completePayment
} = require('../controllers/orderController');

// Protected routes - require authentication
router.use(auth);

// Create a new order
router.post('/', createOrder);

// Get all orders for the authenticated user
router.get('/', getOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Complete payment for an order
router.post('/:id/complete-payment', completePayment);

module.exports = router; 