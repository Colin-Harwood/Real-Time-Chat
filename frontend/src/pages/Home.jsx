import React, { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/${code}`); // Navigate to the entered code route
    }
  };

  const handleCreateChat = async () => {
    const chatCode = Math.random().toString(36).slice(2, 11);
    const response = await axios.post('http://localhost:5000/api/chats/create', { "chatCode": chatCode });
    if (response.status = 201) {
      navigate(`/${response.data.chat.chatCode}`)
    };
  };

  return (
    <>
    <div className="w-100 h-screen flex justify-center items-center grid grid-cols-2">
      <div className="flex items-center justify-center h-full">
        <div className="h-1/2 w-1/2 bg-cream text-center flex flex-col justify-around items-center rounded">
          <h1 className="text-8xl font-bold text-purple">Join</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-4 text-xl border-2 border-purple rounded mb-4"
              placeholder="Enter your code"
            />
            <button
              type="submit"
              className="bg-purple text-white p-4 rounded text-xl font-bold hover:bg-darkPurple transition"
            >
              Go
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="h-1/2 w-1/2 bg-cream text-center flex flex-col justify-around items-center rounded">
          <h1 className="text-8xl font-bold text-purple ">Create</h1>
          <button onClick={handleCreateChat} className="bg-purple text-white p-4 rounded text-xl font-bold hover: transition w-2/3">
            Create Chat
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
