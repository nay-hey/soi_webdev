// sendReminderRoutes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route to send reminders
router.post('/send-reminder', async (req, res) => {
    const { selectedEmails, selectedDate, message } = req.body;
    
    try{
  // Create a transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Your SMTP server hostname
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'name@gmail.com', // Your email address
      pass: 'password' // Your email password or app-specific password
    }
  });

  // Setup email data
  let mailOptions = {
    from: 'name@gmail.com',
    to: selectedEmails.join(','), // Convert array of emails to comma-separated string
    subject: 'Library Book Return Reminder', // Subject line
    html: message // HTML body
  };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Reminders sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send reminders. Please try again.' });
  }
});

module.exports = router;
