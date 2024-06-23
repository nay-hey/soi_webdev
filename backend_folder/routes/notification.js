// routes/bookRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notification = require('../models/Notification'); // Assuming Book model is defined correctly

// GET all books
router.get('/', async (req, res) => {
  try {
    const notification = await Notification.find();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
