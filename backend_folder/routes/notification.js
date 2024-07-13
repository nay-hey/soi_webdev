
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notification = require('../models/Notification'); // Assuming Book model is defined correctly

router.get('/', async (req, res) => {
  try {
    const notification = await Notification.find();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('email').notEmpty().trim().escape(),
  body('subject').notEmpty().trim().escape(),
  body('message').notEmpty().trim().escape()
 ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  
      const newNotification = new Notification({
          name,
          email,
          subject,
          message,

      });
     try {
      const savedNotification = await newNotification.save();
      res.status(201).json(savedNotification);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

module.exports = router;
