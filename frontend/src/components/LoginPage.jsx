import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, User, Shield, Eye, EyeOff, ArrowRight, Star, Lock, Mail, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    clearError();
    const result = await login({ email, password });
    
    if (result.success) {
      // Navigation will be handled by the auth context and App component
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full -translate-x-36 -translate-y-36 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full translate-x-48 translate-y-48 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full -translate-x-32 -translate-y-32 animate-float"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Link to="/" className="inline-flex items-center group mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg mr-3 group-hover:shadow-xl transition-all duration-300">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Alumni Connect
              </span>
            </Link>
            
            <div className="flex items-center justify-center mb-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Trusted by 500+ Institutions
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-lg">Connect with your alumni network and unlock opportunities</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl animate-fade-in-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">Sign In to Your Account</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in with your institution-verified account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                  
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleLogin();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                  
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}
                  
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium group transition-all duration-300" 
                    onClick={handleLogin}
                    disabled={isLoading || !email || !password}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                  
                <div className="text-center mt-4">
                  <Link 
                    to="#" 
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Need Access?</span>
                </div>
              </div>

              {/* Institutional Access Info */}
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Don't have an account?</h4>
                  <p className="text-xs text-blue-700 mb-3">
                    Accounts are created through institutional invitations only. 
                    Check your email for an invitation link from your institution.
                  </p>
                  <div className="text-xs text-blue-600">
                    <strong>For Institutions:</strong> Contact our team to get started
                  </div>
                </div>
                
                {/* Alumni Claim Profile Button */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Existing Alumni?</h4>
                  <p className="text-xs text-green-700 mb-3">
                    If you're an alumni who hasn't received an invitation, 
                    you can claim your profile by providing your academic details.
                  </p>
                  <Link 
                    to="/claim-alumni-profile" 
                    className="inline-flex items-center justify-center w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Claim Alumni Profile
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center animate-fade-in-up">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

