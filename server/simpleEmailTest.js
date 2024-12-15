require('dotenv').config();
const nodemailer = require('nodemailer');

// For development only - handle self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testEmail() {
  // Create transporter with debug logging
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'kaybeemotsoko@gmail.com',
      pass: process.env.SMTP_PASSWORD
    },
    debug: true,
    logger: true,
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages');

    // Try to send test email
    const info = await transporter.sendMail({
      from: '"SneakerAlot" <kaybeemotsoko@gmail.com>',
      to: 'kaybeemotsoko@gmail.com',
      subject: 'Test Email ✔',
      text: 'If you receive this email, the email service is working correctly!',
      html: '<b>If you receive this email, the email service is working correctly!</b>'
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error:', error);
    console.log('Current settings:');
    console.log('SMTP_USER:', 'kaybeemotsoko@gmail.com');
    console.log('FROM_NAME:', process.env.FROM_NAME);
    console.log('SMTP_PASSWORD length:', process.env.SMTP_PASSWORD?.length);
  }
}

testEmail(); 