//models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'  // Assuming 'Student' is the model name
      },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
