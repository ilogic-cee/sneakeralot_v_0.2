const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

async function testEmailSend() {
  try {
    const result = await sendEmail({
      email: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Test Email from SneakerAlot',
      template: 'orderConfirmation',
      data: {
        orderNumber: 'TEST-123',
        orderDate: new Date().toLocaleDateString(),
        items: [{
          product: {
            name: 'Test Sneaker',
            image: 'https://via.placeholder.com/150'
          },
          size: '42',
          quantity: 1,
          price: 199.99
        }],
        total: 199.99,
        shippingAddress: {
          fullName: 'Test User',
          street: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          postalCode: '12345',
          country: 'Test Country',
          phone: '1234567890'
        }
      }
    });

    console.log('Test email sent successfully:', result);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

testEmailSend(); 