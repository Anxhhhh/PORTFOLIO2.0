const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verification of transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  console.log('--- Incoming Request ---');
  console.log('Body:', req.body);
  const { name, email, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  try {
    console.log('Attempting to send emails...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To User:', email);

    // 1. Email to Owner
    // ...
    const mailOptionsToOwner = {
      from: process.env.EMAIL_USER,
      to: 'anshforworkhere@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // 2. Confirmation Email to User
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Got your message! - ${name}`,
      text: `Hi ${name},\n\nThank you for reaching out! I've received your message and will get back to you as soon as possible.\n\nBest regards,\nAnsh raj Singh Thakur`,
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br><strong>Ansh raj Singh Thakur</strong></p>
      `,
    };

    // Send emails
    await transporter.sendMail(mailOptionsToOwner);
    // await transporter.sendMail(mailOptionsToUser);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('SERVER_ERROR_DETAILS:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
