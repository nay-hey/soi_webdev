// routes/bookRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book'); // Assuming Book model is defined correctly

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new book
router.post('/', [
  body('title').notEmpty().trim().escape(),
  body('description').optional().trim().escape(),
  body('author').notEmpty().trim().escape(),
  body('genre').notEmpty().trim().escape(),
  body('department').notEmpty().trim().escape(),
  body('count').isInt({ min: 0 }),
  body('vendor').optional().trim().escape(),
  body('vendorId').optional().isInt({ min: 0 }),
  body('publisher').optional().trim().escape(),
  body('publisherId').optional().isInt({ min: 0 }),
  body('imageUrl').optional().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, author, genre, department, count, vendor, vendorId, publisher, publisherId, imageUrl } = req.body;

  const newBook = new Book({
    title,
    description,
    author,
    genre,
    department,
    count,
    vendor,
    vendorId,
    publisher,
    publisherId,
    imageUrl,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET books based on search criteria
router.get('/search', async (req, res) => {
  const { category, keyword } = req.query;

  // Ensure both category and keyword are provided
  if (!category || !keyword) {
    return res.status(400).json({ message: 'Category and keyword are required' });
  }

  // Define the filter based on the query parameters
  const filter = {};
  filter[category] = { $regex: new RegExp(keyword, 'i') }; // Case-insensitive search

  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  try {
    const updated = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully', book: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
