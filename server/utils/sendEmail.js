const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const loadTemplate = async (templateName) => {
  try {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
  } catch (error) {
    console.error('Error loading email template:', error);
    throw new Error(`Failed to load email template: ${templateName}`);
  }
};

const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(data);

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail; 