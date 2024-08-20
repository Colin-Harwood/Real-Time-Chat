import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Chat.css'

const Chat = () => {
  const { chatCode } = useParams(); // Get the chat code from the URL
  const [chat, setChat] = useState(null); // State to store the chat data
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch the chat data when the component loads
    const fetchChat = async () => {
      try {
        console.log(chatCode)
        const response = await axios.get(`http://localhost:5000/api/chats/${chatCode}`);
        setChat(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chat');
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatCode]);

  const sendMessage = (message, user) => {
    try {
      console.log(message, user)
      axios.post(`http://localhost:5000/api/chats/${chatCode}`, {
        'message': message,
        'user': user
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
    
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} ChatCode: {chatCode}</div>;

  return (
    <div className="chat-room">
      <h1>Chat Room: {chat.chatCode}</h1>
      <div className="messages">
        {chat.messages.length > 0 ? (
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
        <form
           onSubmit={(e) => {
            e.preventDefault();
             sendMessage(message, '2')}}
        >
          <input 
            placeholder='Enter a message here...'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            Submit message
          </button>
        </form>
      </div>
    </div>
    );
  };

export default Chat
