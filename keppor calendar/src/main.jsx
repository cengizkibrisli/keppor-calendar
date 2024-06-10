import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Calendar from './pages/Calendar.jsx'
import VideoDetails from './pages/Details.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <Router> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar/*" element={<Calendar />} />
        <Route path="/day/*" element={<VideoDetails />} />
       </Routes>
    </Router>
  </React.StrictMode>
)