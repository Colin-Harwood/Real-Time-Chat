const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Attach the http server to Express
const io = new Server(server, {
  cors: {
    origin: "*", // Set your frontend URL or use "*" for development
    methods: ["GET", "POST"]
  }
});

// Attach the io instance to the Express app
app.set('io', io);

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (chatCode) => {
    socket.join(chatCode);
  });

  socket.on('newMessage', (chatCode, message) => {
    io.to(chatCode).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Routes
app.use('/api/chats', chatRoutes);

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server using `server.listen`
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
