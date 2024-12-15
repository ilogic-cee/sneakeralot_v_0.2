import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './ShippingAddressForm.css';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name is too short'),
  street: Yup.string()
    .required('Street address is required')
    .min(5, 'Address is too short'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City name is too short'),
  state: Yup.string()
    .required('Province/State is required'),
  postalCode: Yup.string()
    .required('Postal code is required')
    .matches(/^[0-9]{4,5}$/, 'Invalid postal code'),
  country: Yup.string()
    .required('Country is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
});

const ShippingAddressForm = ({ onSubmit, initialValues = {}, isSubmitting }) => {
  const defaultValues = {
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    ...initialValues
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form className="shipping-form">
          <h2>Shipping Address</h2>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              className={errors.fullName && touched.fullName ? 'error' : ''}
            />
            {errors.fullName && touched.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <Field
              type="text"
              id="street"
              name="street"
              placeholder="123 Main St"
              className={errors.street && touched.street ? 'error' : ''}
            />
            {errors.street && touched.street && (
              <div className="error-message">{errors.street}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <Field
                type="text"
                id="city"
                name="city"
                placeholder="Cape Town"
                className={errors.city && touched.city ? 'error' : ''}
              />
              {errors.city && touched.city && (
                <div className="error-message">{errors.city}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">Province/State</label>
              <Field
                type="text"
                id="state"
                name="state"
                placeholder="Western Cape"
                className={errors.state && touched.state ? 'error' : ''}
              />
              {errors.state && touched.state && (
                <div className="error-message">{errors.state}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <Field
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="0000"
                className={errors.postalCode && touched.postalCode ? 'error' : ''}
              />
              {errors.postalCode && touched.postalCode && (
                <div className="error-message">{errors.postalCode}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <Field
                as="select"
                id="country"
                name="country"
                className={errors.country && touched.country ? 'error' : ''}
              >
                <option value="">Select Country</option>
                <option value="ZA">South Africa</option>
                <option value="NA">Namibia</option>
                <option value="BW">Botswana</option>
                <option value="ZW">Zimbabwe</option>
              </Field>
              {errors.country && touched.country && (
                <div className="error-message">{errors.country}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              placeholder="0123456789"
              className={errors.phone && touched.phone ? 'error' : ''}
            />
            {errors.phone && touched.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Continue to Payment'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShippingAddressForm; 