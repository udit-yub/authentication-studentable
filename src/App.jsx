import React from 'react'
import Register from './Register'
import Login from './Login'
import StudentsPage from './studentpage'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase'
import { useState, useEffect } from 'react'
const App = () => {
    const [user, setuser] = useState()
    useEffect(()=>{
      auth.onAuthStateChanged((user)=>setuser(user))
    })
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/" element={user?<Navigate to='/students' />:<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
