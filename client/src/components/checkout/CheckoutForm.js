import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QVbDGKQbn2W1gYxyuN0klZgiedS7eqBheRY8Ok5IgyLW2lUNc3a3aIZMt3goMhQNT8EEpccMX6sGO6VztMh8vkJ00T8zHW4lW');

const CheckoutForm = ({ orderId, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await api.post('/orders', {
          shippingAddress: {
            // Add shipping address fields from your form
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
          }
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError('Failed to create payment intent. ' + err.message);
      }
    };
    createPaymentIntent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        // Handle successful payment here
        await api.post(`/orders/${orderId}/complete-payment`, {
          paymentMethodId: paymentIntent.payment_method
        });
      }
    } catch (err) {
      setError('Payment failed. ' + err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <PaymentElement />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button
        type="submit"
        disabled={processing || !stripe || succeeded}
        className="payment-button"
      >
        {processing ? 'Processing...' : `Pay R${total}`}
      </button>
      {succeeded && (
        <div className="success-message">
          Payment successful! Redirecting to order confirmation...
        </div>
      )}
    </form>
  );
};

// Wrapper component that provides Stripe context
export const StripeCheckoutForm = ({ orderId, total }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await api.post('/orders', {
          shippingAddress: {
            // Add shipping address fields from your form
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
          }
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
      }
    };
    createPaymentIntent();
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0a2540',
      },
    },
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm orderId={orderId} total={total} />
    </Elements>
  ) : (
    <div>Loading payment form...</div>
  );
};

export default StripeCheckoutForm; 