import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingAddressForm from '../componets/ShippingAddressForm';
import { StripeCheckoutForm } from '../componets/CheckoutForm';
import './Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleShippingSubmit = async (values, { setSubmitting }) => {
    try {
      // Save shipping details and move to payment step
      setShippingDetails(values);
      setStep(2);
    } catch (error) {
      console.error('Error saving shipping details:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentComplete = (completedOrderId) => {
    navigate(`/order-confirmation/${completedOrderId}`);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Shipping</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-content">
        {step === 1 && (
          <div className="shipping-step">
            <ShippingAddressForm onSubmit={handleShippingSubmit} />
          </div>
        )}

        {step === 2 && shippingDetails && (
          <div className="payment-step">
            <div className="shipping-summary">
              <h3>Shipping Details</h3>
              <div className="summary-details">
                <p>{shippingDetails.fullName}</p>
                <p>{shippingDetails.street}</p>
                <p>
                  {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}
                </p>
                <p>{shippingDetails.country}</p>
                <button 
                  className="edit-button"
                  onClick={() => setStep(1)}
                >
                  Edit
                </button>
              </div>
            </div>

            <StripeCheckoutForm 
              orderId={orderId}
              total={total}
              onComplete={handlePaymentComplete}
              shippingDetails={shippingDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 