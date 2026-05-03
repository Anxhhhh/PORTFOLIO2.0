const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('Using EMAIL_USER:', process.env.EMAIL_USER);
console.log('Using EMAIL_PASS:', process.env.EMAIL_PASS ? 'FOUND (hidden)' : 'NOT FOUND');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Send to self
  subject: 'Test Email from Portfolio Backend',
  text: 'If you see this, the configuration is correct!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('ERROR OCCURRED:');
    console.error(error);
  } else {
    console.log('Email sent successfully!');
    console.log('Response:', info.response);
  }
});
