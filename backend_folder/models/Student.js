//models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  roll: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
