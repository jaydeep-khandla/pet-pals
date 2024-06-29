import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './routes/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
