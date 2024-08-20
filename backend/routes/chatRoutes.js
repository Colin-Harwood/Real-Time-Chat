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
    const chat = await Chat.findOne({ chatCode });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    const newMessage = { sender: user, text: message };

    const updatedChat = await Chat.findOneAndUpdate(
      { chatCode },
      { $push: { messages: newMessage } },
      { new: true }
    );

    // Emit only the new message via Socket.IO
    const io = req.app.get('io');
    io.to(chatCode).emit('newMessage', newMessage);

    res.status(200).json({ message: 'Message added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
