import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, User, Shield } from 'lucide-react'
import apiClient from '../utils/api'

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (userType) => {
    setLoading(true)
    setError('')

    try {
      const response = await apiClient.login(email, password, userType)
      
      if (response.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('userType', response.user_type)
        
        // Call the onLogin prop if provided
        if (onLogin) {
          onLogin(response.user_type)
        } else {
          // Navigate to appropriate dashboard
          if (response.user_type === 'admin') {
            navigate('/admin-dashboard')
          } else {
            navigate('/dashboard')
          }
        }
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-2xl font-bold text-gray-900 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            Alumni Connect
          </Link>
          <p className="text-gray-600">Sign in to access your alumni network</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Choose your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alumni" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alumni" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Alumni/Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="alumni" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="alumni-email">Email</Label>
                  <Input
                    id="alumni-email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alumni-password">Password</Label>
                  <Input
                    id="alumni-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                <Button 
                  className="w-full z-50" 
                  onClick={() => handleLogin('alumni')}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In as Alumni'}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Demo credentials: demo@gmail.com / 1234
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                <Button 
                  className="w-full z-50" 
                  onClick={() => handleLogin('admin')}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In as Administrator'}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Demo credentials: admin@gmail.com / admin1234
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

