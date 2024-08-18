const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  chatCode: { type: String, required: true, unique: true },
  messages: [
    {
      sender: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Chat', ChatSchema);
