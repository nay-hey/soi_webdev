const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images (if applicable)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes setup
const bookRoutes = require('./routes/bookRoutes');
const issueRoutes = require('./routes/issueRoutes'); // Import issue routes
const sendReminderRoutes = require('./routes/sendReminderRoutes'); 

app.use('/api/books', bookRoutes);
app.use('/api/issues', issueRoutes); // Mount issue routes
app.use('/api', sendReminderRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
