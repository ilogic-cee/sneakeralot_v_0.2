const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');

// Create reusable transporter with additional error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } catch (error) {
    console.error('Error creating mail transporter:', error);
    throw new Error('Failed to initialize email service');
  }
};

const transporter = createTransporter();

// Load and compile email template with enhanced error handling
const loadTemplate = async (templateName) => {
  try {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
    
    // Check if template exists
    try {
      await fs.access(templatePath);
    } catch (error) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
  } catch (error) {
    console.error('Error loading email template:', error);
    throw new Error(error.message || 'Failed to load email template');
  }
};

const sendEmail = async ({ email, subject, template, data }) => {
  try {
    // Load and compile the template
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(data);

    // Verify environment variables
    if (!process.env.FROM_NAME || !process.env.FROM_EMAIL) {
      throw new Error('Sender information not properly configured');
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: subject,
      html: html
    });

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error.message || 'Failed to send email');
  }
};

module.exports = sendEmail;
