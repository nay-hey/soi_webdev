// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes setup (assuming you have defined your routes)
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
