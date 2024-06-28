const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student'); // Assuming you have a Student model defined
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middleware/authenticateToken'); // Import your authentication middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();
// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new student
router.post('/', [
  body('name').notEmpty().trim().escape().withMessage('Name is required'),
  body('roll').notEmpty().trim().escape().withMessage('Roll number is required'),
  body('email').notEmpty().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('branch').notEmpty().trim().escape().withMessage('Branch is required'),
  body('password').notEmpty().trim().escape().withMessage('Password is required'),
  body('position').notEmpty().trim().escape().withMessage('Position is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
  }

  const { name, roll, email, branch, password, position } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newStudent = new Student({
      name,
      roll,
      email,
      branch,
      password: hashedPassword,
      position,
  });

  try {

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a student entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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
      const students = await Student.find(filter);
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.put('/:id', async (req, res) => {
    const studentId = req.params.id;
    const updatedStudent = req.body;
  
    try {
      const updated = await Student.findByIdAndUpdate(studentId, updatedStudent, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json({ message: 'Profile updated successfully', profile: updated });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.post('/login', async (req, res) => {
    const { roll, password } = req.body;
    try {
      const user = await Student.findOne({ roll });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordIsValid = bcrypt.compareSync(password, user.password);
  
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user._id, roll: user.roll }, 'secretkey', { expiresIn: '1d' });
  
      res.status(200).json({ message: 'Login successful!', studentId: user._id, token, auth: true });
    } catch (err) {
      console.error('Error during login:', err); // Debugging line
      res.status(500).json({ message: err.message });
    }
  });
// GET student profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Change password route
router.put('/:studentId/changepassword', authenticateToken, async (req, res) => {
  const { password, newpassword } = req.body;
  const studentId = req.params.studentId; // Extract studentId from URL params

  try {
    const user = await Student.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    const hashedNewPassword = bcrypt.hashSync(newpassword, 8);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Failed to change password. Please try again.' });
  }
});

module.exports = router;
