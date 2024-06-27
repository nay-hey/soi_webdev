const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student'); // Assuming you have a Student model defined
const mongoose = require('mongoose');
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
    body('name').notEmpty().trim().escape(),
    body('roll').notEmpty().trim().escape(),
    body('email').notEmpty().trim().escape(),
    body('branch').notEmpty().trim().escape()
   ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, roll, email, branch, joindate } = req.body;

    
        const newStudent = new Student({
            name,
            roll,
            email,
            branch,
            joindate,
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

module.exports = router;
