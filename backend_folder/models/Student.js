//models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
