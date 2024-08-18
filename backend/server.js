// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');




// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
app.use('/api/chats', chatRoutes);

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
