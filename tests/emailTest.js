require('dotenv').config();
const sendEmail = require('../utils/sendEmail');

const testEmailSending = async () => {
  try {
    const result = await sendEmail({
      email: 'kaybeemotsoko@gmail.com',
      subject: 'Test Email from SneakerAlot',
      template: 'test',
      data: {
        name: 'Test User',
        message: 'If you receive this email, the email service is working correctly!'
      }
    });

    console.log('Test result:', result);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

testEmailSending(); 