import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap, User, Shield, UserPlus } from 'lucide-react'
import apiClient from '../utils/api'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userType, setUserType] = useState('alumni')
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    user_type: 'alumni',
    alumni_profile: {
      first_name: '',
      last_name: '',
      graduation_year: new Date().getFullYear(),
      department: '',
      current_position: '',
      current_company: '',
      location: '',
      bio: '',
      skills: '',
      is_mentor: false
    }
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('alumni_')) {
      const fieldName = name.replace('alumni_', '')
      setFormData(prev => ({
        ...prev,
        alumni_profile: {
          ...prev.alumni_profile,
          [fieldName]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    if (name.startsWith('alumni_')) {
      const fieldName = name.replace('alumni_', '')
      setFormData(prev => ({
        ...prev,
        alumni_profile: {
          ...prev.alumni_profile,
          [fieldName]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Prepare skills as JSON array
      const submissionData = {
        ...formData,
        user_type: userType,
        alumni_profile: {
          ...formData.alumni_profile,
          skills: JSON.stringify(formData.alumni_profile.skills.split(',').map(s => s.trim()).filter(s => s))
        }
      }

      const response = await apiClient.register(submissionData)
      
      if (response.success) {
        setSuccess('Account created successfully! You can now sign in.')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const departments = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Medicine',
    'Law',
    'Arts & Sciences',
    'Education',
    'Psychology',
    'Economics',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-2xl font-bold text-gray-900 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            Alumni Connect
          </Link>
          <p className="text-gray-600">Create your alumni network account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create Account
            </CardTitle>
            <CardDescription>
              Join the alumni community and start connecting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alumni" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Alumni
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Alumni-specific fields */}
                <TabsContent value="alumni" className="space-y-4">
                  <h3 className="text-lg font-semibold">Alumni Profile</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alumni_first_name">First Name</Label>
                      <Input
                        id="alumni_first_name"
                        name="alumni_first_name"
                        type="text"
                        placeholder="John"
                        value={formData.alumni_profile.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alumni_last_name">Last Name</Label>
                      <Input
                        id="alumni_last_name"
                        name="alumni_last_name"
                        type="text"
                        placeholder="Doe"
                        value={formData.alumni_profile.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alumni_graduation_year">Graduation Year</Label>
                      <Input
                        id="alumni_graduation_year"
                        name="alumni_graduation_year"
                        type="number"
                        min="1950"
                        max={new Date().getFullYear() + 10}
                        value={formData.alumni_profile.graduation_year}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alumni_department">Department</Label>
                      <Select onValueChange={(value) => handleSelectChange('alumni_department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alumni_current_position">Current Position</Label>
                      <Input
                        id="alumni_current_position"
                        name="alumni_current_position"
                        type="text"
                        placeholder="Software Engineer"
                        value={formData.alumni_profile.current_position}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alumni_current_company">Current Company</Label>
                      <Input
                        id="alumni_current_company"
                        name="alumni_current_company"
                        type="text"
                        placeholder="Tech Corp"
                        value={formData.alumni_profile.current_company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alumni_location">Location</Label>
                    <Input
                      id="alumni_location"
                      name="alumni_location"
                      type="text"
                      placeholder="San Francisco, CA"
                      value={formData.alumni_profile.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alumni_skills">Skills (comma-separated)</Label>
                    <Input
                      id="alumni_skills"
                      name="alumni_skills"
                      type="text"
                      placeholder="Python, JavaScript, React, Node.js"
                      value={formData.alumni_profile.skills}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alumni_bio">Bio</Label>
                    <Textarea
                      id="alumni_bio"
                      name="alumni_bio"
                      placeholder="Tell us about yourself..."
                      value={formData.alumni_profile.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="alumni_is_mentor"
                      name="alumni_is_mentor"
                      type="checkbox"
                      checked={formData.alumni_profile.is_mentor}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="alumni_is_mentor">I'm interested in mentoring other alumni</Label>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Admin accounts are created by system administrators.
                      Please contact your institution for admin access.
                    </p>
                  </div>
                </TabsContent>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
                )}

                {success && (
                  <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{success}</div>
                )}

                {userType === 'alumni' && (
                  <Button 
                    type="submit" 
                    className="w-full z-50" 
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Alumni Account'}
                  </Button>
                )}
              </form>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in here
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

export default RegisterPage

