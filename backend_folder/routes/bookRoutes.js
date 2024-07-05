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
  body('vendor_id').optional().isInt({ min: 0 }),
  body('publisher').optional().trim().escape(),
  body('publisher_id').optional().isInt({ min: 0 }),
  body('imageUrl').optional().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, author, genre, department, count, vendor, vendor_id, publisher, publisher_id, imageUrl } = req.body;

  const newBook = new Book({
    title,
    description,
    author,
    genre,
    department,
    count,
    vendor,
    vendor_id,
    publisher,
    publisher_id,
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

  // Ensure category is provided
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  // Define the filter based on the query parameters
  let filter = {};
  if (category === 'reserved') {
    filter['reservedBy'] = { $exists: true, $ne: [] }; // Adjust this according to your schema
  } else if (keyword) {
    filter[category] = { $regex: new RegExp(keyword, 'i') }; // Case-insensitive search
  } else {
    return res.status(400).json({ message: 'Keyword is required for categories other than reserved' });
  }

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

router.put('/:id/like', async (req, res) => {
  const bookId = req.params.id;
  const userRoll = req.body.userRoll; // Assuming userId is sent in the request body

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if the user has already liked the book
    if (book.likedBy && Array.isArray(book.likedBy)) {
      const alreadyLiked = book.likedBy.some(user => user === userRoll);
      
      if (alreadyLiked) {
        // Unlike the book
        book.likes -= 1;
        book.likedBy = book.likedBy.filter(user => user !== userRoll);
      } else {
        // Like the book
        book.likes += 1;
        book.likedBy.push(userRoll);
      }
      
      // Save the updated book object
      const savedBook = await book.save();
      
      res.json({ message: 'Book liked/unliked successfully', likes: savedBook.likes, likedBy: savedBook.likedBy });
    } else {
      return res.status(500).json({ message: 'LikedBy array missing or invalid in the book object' });
    }
  } catch (err) {
    console.error('Error liking/unliking the book:', err);
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id/reserve', async (req, res) => {
  const bookId = req.params.id;
  const userRoll = req.body.userRoll; // Assuming userId is sent in the request body

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if the user has already reserved the book
    if (book.reservedBy && Array.isArray(book.reservedBy)) {
      const existingReservationIndex = book.reservedBy.findIndex(user => user === userRoll);

      if (existingReservationIndex !== -1) {
        // Remove the reservation if found
        book.reservedBy.splice(existingReservationIndex, 1);
        book.reserved -= 1;
        book.count += 1;
      } else {
        // Reserve the book if not already reserved by the user
        const newReservation = userRoll;
        book.reserved += 1;
        book.count -= 1;
        book.reservedBy.push(newReservation);
      }

      // Save the updated book object
      const savedBook = await book.save();
      
      res.json({ message: 'Reservation updated successfully', reserved: savedBook.reserved, reservedBy: savedBook.reservedBy });
    } else {
      return res.status(500).json({ message: 'ReservedBy array missing or invalid in the book object' });
    }
  } catch (err) {
    console.error('Error updating reservation status:', err);
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id/comments', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book.comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/:id/comments', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const comment = {
      userRoll: req.body.userRoll,
      comment: req.body.comment,
    };
    book.comments.push(comment);
    await book.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    book.comments.splice(commentIndex, 1);
    await book.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
});


module.exports = router;
