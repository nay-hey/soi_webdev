const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({  
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema, 'adm001'); // 'admin' is the name of the collection

module.exports = Notification;
