const Order = require('../models/Order');
const Cart = require('../models/Cart');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'zar',
      metadata: { orderId: order._id.toString() }
    });

    res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ... existing code ... 