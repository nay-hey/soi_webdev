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
  vendorId: { type: Number, required: true },
  publisher: { type: String, required: true },
  publisherId: { type: Number, required: true },
  imageUrl: { type: String } // Example field for book image URL
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
