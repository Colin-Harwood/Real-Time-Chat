import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Chat from './pages/Chat'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:chatCode" element={<Chat />} />
    </Routes>
  )
}

export default App
