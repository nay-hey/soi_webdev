// Assuming you have a config/db.js file for MongoDB connection

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/library', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the deprecated options
      // useFindAndModify: false,
      // useCreateIndex: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
