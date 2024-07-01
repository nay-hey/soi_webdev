const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const IssueCopy = require('../models/IssueCopy');

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await IssueCopy.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new issue
router.post('/', [
    body('fname').notEmpty().trim().escape(),
    body('lname').notEmpty().trim().escape(),
    body('email').notEmpty().trim().escape(),
    body('rollno').optional().isInt({ min: 0 }),
    body('bookId').notEmpty().trim().escape(),
    body('issueDate').notEmpty().toDate(),
    body('returnDate').notEmpty().toDate(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { fname, lname, email, rollno, bookId, issueDate, returnDate } = req.body;
  
    const newIssue = new IssueCopy({
      fname,
      lname, 
      email, 
      rollno,
      bookId,
      issueDate,
      returnDate,
    });
  
    try {
      const savedIssue = await newIssue.save();
      res.status(201).json(savedIssue);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// GET issue by email and bookId
router.get('/:email/:bookId', async (req, res) => {
  const { email, bookId } = req.params;
  try {
    const issue = await Issue.findOne({ email: decodeURIComponent(email), bookId: decodeURIComponent(bookId) });
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
