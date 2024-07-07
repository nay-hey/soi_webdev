const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Issue = require('../models/Issue');

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
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
  body('status').notEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fname, lname, email, rollno, bookId, issueDate, returnDate, status } = req.body;

  const newIssue = new Issue({
    fname,
    lname, 
    email, 
    rollno,
    bookId,
    issueDate,
    returnDate,
    status,
  });

  try {
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an issue
router.delete('/:email/:bookId', async (req, res) => {
  try {
    const { email, bookId } = req.params;

    const deletedIssue = await Issue.findOneAndDelete({ email: decodeURIComponent(email), bookId: decodeURIComponent(bookId) });

    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue deleted' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update issue status to "Returned"
router.put('/:email/:bookId', async (req, res) => {
  try {
    const { email, bookId } = req.params;
    const { status } = req.body; // Ensure status is provided in the request body

    const updatedIssue = await Issue.findOneAndUpdate(
      { email: decodeURIComponent(email), bookId: decodeURIComponent(bookId) },
      { status: status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue updated', issue: updatedIssue });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
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

// Reissue a book
router.put('/reissue/:email/:bookId', [
  body('issueDate').notEmpty().toDate(),
  body('returnDate').notEmpty().toDate(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, bookId } = req.params;
  const { issueDate, returnDate } = req.body;

  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { email: decodeURIComponent(email), bookId: decodeURIComponent(bookId) },
      { issueDate, returnDate },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Book reissued', issue: updatedIssue });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
