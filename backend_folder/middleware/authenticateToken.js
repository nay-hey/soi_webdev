// authenticateToken.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const authenticateToken = (req, res, next) => {
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, 'secretkey', async (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    try {
      if (!decoded || !decoded.id) {
        return res.status(403).json({ message: 'Invalid token payload' });
      }

      const student = await Student.findById(decoded.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      req.student = { id: decoded.id };
      next();
    } catch (error) {
      console.error('Error authenticating token:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

module.exports = authenticateToken;
