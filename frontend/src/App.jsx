import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
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
import LoadingSpinner from './components/LoadingSpinner'
import CreateAccountPage from './components/CreateAccountPage'
import './App.css'

function App() {
  const { isAuthenticated, userType, isLoading, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          {/* Public preview pages */}
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
                  userType === 'super_admin' || userType === 'institution_admin' ? <AdminDashboard /> : <Dashboard />
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
