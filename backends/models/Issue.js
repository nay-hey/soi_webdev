const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({  
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  rollno: { type: Number, required: true },
  bookId: { type: String, required: true },
  issueDate: { type: Date, default: Date.now, required: true },
  returnDate: { type: Date, required: true }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
