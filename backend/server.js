const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

console.log("ENV CHECK:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Nodemailer transporter (IMPROVED)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter (IMPORTANT DEBUG)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Transporter Error:', error);
  } else {
    console.log('✅ Server is ready to send emails');
  }
});

// Contact API
app.post('/api/contact', async (req, res) => {
  console.log("📩 Incoming request:", req.body);

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    console.log("❌ Missing fields");
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // ✅ Timeout protection (VERY IMPORTANT)
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 10000)
      )
    ]);

    console.log("✅ Email sent successfully");

    res.status(200).json({ message: 'Message sent successfully ✅' });

  } catch (error) {
    console.error("❌ EMAIL ERROR FULL:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});