"use client";
import { Route, Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div>
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
