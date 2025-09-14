import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LoadingSpinner from './components/LoadingSpinner'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import CreateAccountPage from './components/CreateAccountPage'
import AlumniClaimProfile from './components/AlumniClaimProfile'
import './App.css'
import AdminDashboard from './components/AdminDashboard'
import Dashboard from './components/Dashboard'

function App() {
  const { isAuthenticated, userType, isLoading, logout, user } = useAuth()
  
  console.log('App render - isAuthenticated:', isAuthenticated, 'userType:', userType, 'isLoading:', isLoading)

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/claim-alumni-profile" element={<AlumniClaimProfile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={
                (['super_admin','institution_admin','admin'].includes(userType) ? <AdminDashboard /> : <Dashboard />)
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
