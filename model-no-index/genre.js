const mongoose = require('mongoose');

const Genre = new mongoose.Schema({
  name: {
    trim: true,
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('genre', Genre);