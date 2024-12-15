const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

const handleSuccessfulPayment = async (paymentIntent) => {
  try {
    const order = await Order.findById(paymentIntent.metadata.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Update order status
    order.status = 'paid';
    order.paymentId = paymentIntent.id;
    order.paymentStatus = 'completed';
    await order.save();

    // Send confirmation email
    await sendEmail({
      email: order.user.email,
      subject: 'Order Confirmation - SneakerAlot',
      template: 'orderConfirmation',
      data: {
        orderNumber: order._id,
        orderDate: order.createdAt,
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress
      }
    });

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
};

const handleFailedPayment = async (paymentIntent) => {
  try {
    const order = await Order.findById(paymentIntent.metadata.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Update order status
    order.status = 'payment_failed';
    order.paymentStatus = 'failed';
    await order.save();

    // Send failure notification
    await sendEmail({
      email: order.user.email,
      subject: 'Payment Failed - SneakerAlot',
      template: 'paymentFailed',
      data: {
        orderNumber: order._id,
        orderDate: order.createdAt
      }
    });

  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
};

const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handleSuccessfulPayment(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handleFailedPayment(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = webhookHandler; 