// client/src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/stripe-react-js';
import { orders } from '../services/api';

const CheckoutForm = ({ order, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      // Complete payment on the backend
      const response = await orders.completePayment(
        order._id, 
        paymentMethod.id
      );

      if (response.data.success) {
        onSuccess(response.data.order);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="card-element-container">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="payment-button"
      >
        {processing ? 'Processing...' : `Pay R${order.total}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
