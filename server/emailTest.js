const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

console.log('Environment check:');
console.log('SMTP_USER loaded:', !!process.env.SMTP_USER);
console.log('SMTP_PASSWORD loaded:', !!process.env.SMTP_PASSWORD);
console.log('SMTP_HOST loaded:', !!process.env.SMTP_HOST);
console.log('SMTP_PORT loaded:', !!process.env.SMTP_PORT);

async function testEmailSend() {
  console.log('\nStarting email test...');
  console.log('Using email:', process.env.SMTP_USER);
  
  try {
    const result = await sendEmail({
      email: process.env.SMTP_USER,
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

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

console.log('Email test script starting...');
testEmailSend(); 