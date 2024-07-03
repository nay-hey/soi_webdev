// models/Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  department: { type: String, required: true },
  count: { type: Number, required: true },
  vendor: { type: String, required: true },
  vendor_id: { type: Number, required: true },
  publisher: { type: String, required: true },
  publisher_id: { type: Number, required: true },
  imageUrl: { type: String }, // Example field for book image URL
  likes: { type: Number, default: 0 }, // New field for likes
  likedBy: [{ type: String }], // Array of roll numbers who liked the book  
  reserved: { type: Number, default: 0 }, // New field for reservations
  reservedBy: [{ type: String }], // Array of roll numbers who reserved the book
  comments: [
    {
      userRoll: String,
      comment: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
