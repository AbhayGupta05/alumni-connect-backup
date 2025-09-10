import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import AlumniDirectory from './components/AlumniDirectory'
import ProfilePage from './components/ProfilePage'
import Events from './components/Events'
import Messages from './components/Messages'
import CommunicationHub from './components/CommunicationHub'
import CareerGrowth from './components/CareerGrowth'
import AcademicLegacy from './components/AcademicLegacy'
import Networking from './components/Networking'
import AdminDashboard from './components/AdminDashboard'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import LandingPage from './components/LandingPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState('alumni') // 'alumni' or 'admin'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (type) => {
    setIsAuthenticated(true)
    setUserType(type)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserType('alumni')
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Allow access to feature pages from landing page */}
          <Route path="/directory" element={<AlumniDirectory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/communication" element={<CommunicationHub />} />
          <Route path="/career" element={<CareerGrowth />} />
          <Route path="/legacy" element={<AcademicLegacy />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <Navbar 
            userType={userType} 
            onLogout={handleLogout}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex">
            <Sidebar 
              userType={userType} 
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            
            <main className="flex-1 lg:ml-64 pt-16">
              <Routes>
                <Route path="/" element={
                  userType === 'admin' ? <AdminDashboard /> : <Dashboard />
                } />
                <Route path="/directory" element={<AlumniDirectory />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/events" element={<Events />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/communication" element={<CommunicationHub />} />
                <Route path="/career" element={<CareerGrowth />} />
                <Route path="/legacy" element={<AcademicLegacy />} />
                <Route path="/networking" element={<Networking />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  )
}

export default App
