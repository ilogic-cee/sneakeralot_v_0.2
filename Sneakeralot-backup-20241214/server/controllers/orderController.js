const Order = require('../models/Order');
const Cart = require('../models/Cart');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Temporarily comment out Stripe for testing
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price
      })),
      total,
      shippingAddress
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    // Temporarily return without Stripe integration
    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completePayment = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Process payment with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: 'zar',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: { orderId: order._id.toString() }
    });

    // Update order status
    order.status = 'paid';
    order.paymentId = paymentIntent.id;
    order.paymentStatus = 'completed';
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 