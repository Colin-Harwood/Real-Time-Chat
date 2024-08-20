const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat.js');

// Create a new chat room
router.post('/create', async (req, res) => {
  const { chatCode } = req.body;

  try {
    const existingChat = await Chat.findOne({ chatCode });
    if (existingChat) {
      return res.status(400).json({ message: 'Chat code already exists' });
    }

    const newChat = new Chat({ chatCode, messages: [] });
    await newChat.save();
    res.status(201).json({ message: 'Chat room created', chat: newChat });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat room by chat code
router.get('/:chatCode', async (req, res) => {
  const { chatCode } = req.params;

  try {
    const chat = await Chat.findOne({ chatCode });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:chatCode', async (req, res) => {
  const { chatCode } = req.params;
  const { message, user } = req.body;

  try {
    // Find the chat room by the provided chat code
    const chat = await Chat.findOne({ chatCode });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Determine the senderID by counting existing users
    const existingUsers = new Set(chat.messages.map(msg => msg.sender));
    const senderID = existingUsers.size + 1;

    // Add the new message with the assigned sender ID
    chat.messages.push({ sender: `${user}`, text: message });
    await chat.save();

    res.status(200).json({ message: 'Message added successfully', chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
