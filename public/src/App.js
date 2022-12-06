import React from 'react'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/quizPage' element={<Quiz></Quiz>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App