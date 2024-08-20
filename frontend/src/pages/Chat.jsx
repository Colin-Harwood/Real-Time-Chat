import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const { chatCode } = useParams(); // Get the chat code from the URL
  const [chat, setChat] = useState(null); // State to store the chat data
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the chat data when the component loads
    const fetchChat = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats/${chatCode}`);
        setChat(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chat');
      } finally {
        setLoading(false);
      }
    };

    fetchChat();

    // Check if the user has a unique sender ID in local storage
    if (!localStorage.getItem('senderID')) {
      const uniqueID = `User-${Math.random().toString(36).slice(2, 9)}`; // Generate a random unique ID
      localStorage.setItem('senderID', uniqueID);
    }
  }, [chatCode]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const senderID = localStorage.getItem('senderID');
      await axios.post(`http://localhost:5000/api/chats/${chatCode}`, {
        message: message,
        user: senderID,
      });
      setMessage(''); // Clear the input field after sending
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} ChatCode: {chatCode}</div>;

  return (
    <div className="chat-room">
      <h1>Chat Room: {chat?.chatCode}</h1>
      <div className="messages">
        {chat?.messages.length > 0 ? (
          chat.messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <div>No messages yet.</div>
        )}
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            placeholder="Enter a message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit message</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
