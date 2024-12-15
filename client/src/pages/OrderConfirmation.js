import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-confirmation loading">
        <div className="loader"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation error">
        <h2>Error Loading Order</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/orders')}>View All Orders</button>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="success-icon">✓</div>
      <h1>Order Confirmed!</h1>
      <p className="order-number">Order #{order._id}</p>
      
      <div className="order-details">
        <h2>Order Summary</h2>
        <div className="items-list">
          {order.items.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="price">R{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R{order.total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>R{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="shipping-details">
          <h2>Shipping Details</h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
          <p>{order.shippingAddress.postalCode}</p>
          <p>{order.shippingAddress.country}</p>
          <p>Phone: {order.shippingAddress.phone}</p>
        </div>
      </div>

      <div className="actions">
        <button className="primary" onClick={() => navigate('/orders')}>
          View All Orders
        </button>
        <button className="secondary" onClick={() => navigate('/shop')}>
          Continue Shopping
        </button>
      </div>

      <div className="confirmation-email">
        <p>A confirmation email has been sent to your registered email address.</p>
      </div>
    </div>
  );
};

export default OrderConfirmation; 