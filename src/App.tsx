"use client";
import { Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage'
import NotFound from './pages/NotFound'
import Navbar from './components/fragments/Navbar'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/dashboard';

function App() {

  const location = useLocation();
  const hideNav = location.pathname === "/auth/login" || location.pathname === "/auth/register";

  return (
    <div>
      {!hideNav && <Navbar/>}

    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    </div>
  )
}

export default App
