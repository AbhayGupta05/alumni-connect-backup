import { useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  Upload,
  Camera,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  X,
  Award,
  Users,
  Loader2,
  Clock,
  Home
} from 'lucide-react'
import apiClient from '../utils/api'

const ClaimAlumniProfilePage = () => {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({})
  
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    
    // Academic Information
    graduation_year: '',
    course: '',
    department: '',
    student_id: '',
    roll_number: '',
    degree_number: '',
    
    // Current Professional Information
    current_status: '', // working, studying, unemployed, entrepreneur
    current_role: '',
    current_company: '',
    work_location: '',
    
    // Skills and Bio
    skills: '',
    bio: '',
    
    // Verification Documents
    profile_picture: null,
    degree_certificate: null,
    student_id_card: null,
    other_proof: null,
    
    // Facial Recognition Data
    facial_data: null,
    
    // Institution
    institution_name: ''
  })

  const totalSteps = 5
  const stepTitles = [
    'Personal Details',
    'Academic Information', 
    'Professional Status',
    'Upload Documents',
    'Facial Verification'
  ]

  const courses = [
    'Computer Science', 'Information Technology', 'Software Engineering',
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering',
    'Business Administration', 'Marketing', 'Finance', 'Economics',
    'Medicine', 'Nursing', 'Pharmacy', 'Dentistry',
    'Law', 'Political Science', 'International Relations',
    'Psychology', 'Education', 'English Literature',
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Art & Design', 'Architecture', 'Music',
    'Other'
  ]

  const departments = [
    'School of Engineering', 'School of Business', 'School of Medicine',
    'School of Arts & Sciences', 'School of Law', 'School of Education',
    'School of Design', 'School of Music', 'Other'
  ]

  const workStatuses = [
    { value: 'working', label: 'Currently Working' },
    { value: 'studying', label: 'Pursuing Higher Education' },
    { value: 'entrepreneur', label: 'Entrepreneur/Self-Employed' },
    { value: 'unemployed', label: 'Currently Seeking Opportunities' },
    { value: 'retired', label: 'Retired' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)
      
      const photoData = canvas.toDataURL('image/jpeg', 0.8)
      setCapturedPhoto(photoData)
      setFormData(prev => ({ ...prev, facial_data: photoData }))
      stopCamera()
    }
  }

  const retakePhoto = () => {
    setCapturedPhoto(null)
    setFormData(prev => ({ ...prev, facial_data: null }))
    startCamera()
  }

  // File upload functions
  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [fileType]: event.target.result
        }))
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: file.name
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.first_name && formData.last_name && formData.email && formData.phone
      case 2:
        return formData.graduation_year && formData.course && formData.department && formData.institution_name
      case 3:
        return formData.current_status
      case 4:
        // Check if at least one document is uploaded (excluding profile picture which is optional)
        return uploadedFiles.academic_document || uploadedFiles.id_proof || uploadedFiles.additional_document
      case 5:
        return formData.facial_data
      default:
        return true
    }
  }

  const handleFinalSubmit = async () => {
    if (!capturedPhoto) {
      setError('Please complete facial verification before submitting.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate API call to submit for institutional verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success modal
      setShowSuccessModal(true)
    } catch (error) {
      setError('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Cleanup camera on unmount
  useState(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full translate-x-40 translate-y-40 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
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
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Official Alumni Verification Process
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Claim Your Alumni Profile</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete the verification process to reconnect with your alma mater and join the official alumni network
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl animate-fade-in-up">
            {/* Progress Bar */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
                </h2>
                <div className="text-sm text-gray-600">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </div>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              
              {/* Step indicators */}
              <div className="flex justify-between mt-4">
                {stepTitles.map((title, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <CardContent className="p-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <User className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          placeholder="John"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="last_name"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Academic Information</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution_name" className="text-sm font-medium text-gray-700">Institution Name *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="institution_name"
                        name="institution_name"
                        type="text"
                        placeholder="University of California, Berkeley"
                        value={formData.institution_name}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="graduation_year" className="text-sm font-medium text-gray-700">Graduation Year *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="graduation_year"
                          name="graduation_year"
                          type="number"
                          min="1950"
                          max={new Date().getFullYear() + 5}
                          placeholder="2020"
                          value={formData.graduation_year}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course" className="text-sm font-medium text-gray-700">Course/Degree *</Label>
                      <Select onValueChange={(value) => handleSelectChange('course', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium text-gray-700">Department/School *</Label>
                    <Select onValueChange={(value) => handleSelectChange('department', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your department" />
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
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Additional Information (Optional)</h4>
                        <p className="text-sm text-gray-700">
                          Provide any additional academic identifiers you remember. These help with verification but are not required.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="student_id" className="text-sm font-medium text-gray-700">Student ID <span className="text-gray-400">(if known)</span></Label>
                      <Input
                        id="student_id"
                        name="student_id"
                        type="text"
                        placeholder="STU123456"
                        value={formData.student_id}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="roll_number" className="text-sm font-medium text-gray-700">Roll Number <span className="text-gray-400">(if known)</span></Label>
                      <Input
                        id="roll_number"
                        name="roll_number"
                        type="text"
                        placeholder="2020CS001"
                        value={formData.roll_number}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="degree_number" className="text-sm font-medium text-gray-700">Degree Number <span className="text-gray-400">(if known)</span></Label>
                      <Input
                        id="degree_number"
                        name="degree_number"
                        type="text"
                        placeholder="DEG789012"
                        value={formData.degree_number}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Status */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Current Professional Status</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current_status" className="text-sm font-medium text-gray-700">Current Status *</Label>
                    <Select onValueChange={(value) => handleSelectChange('current_status', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your current status" />
                      </SelectTrigger>
                      <SelectContent>
                        {workStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.current_status && formData.current_status !== 'unemployed' && formData.current_status !== 'retired' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current_role" className="text-sm font-medium text-gray-700">
                          {formData.current_status === 'studying' ? 'Program/Course' : 'Job Title/Role'}
                        </Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="current_role"
                            name="current_role"
                            type="text"
                            placeholder={formData.current_status === 'studying' ? 'Masters in Computer Science' : 'Software Engineer'}
                            value={formData.current_role}
                            onChange={handleInputChange}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current_company" className="text-sm font-medium text-gray-700">
                          {formData.current_status === 'studying' ? 'Institution' : 'Company/Organization'}
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="current_company"
                            name="current_company"
                            type="text"
                            placeholder={formData.current_status === 'studying' ? 'Stanford University' : 'Tech Corp Inc.'}
                            value={formData.current_company}
                            onChange={handleInputChange}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="work_location" className="text-sm font-medium text-gray-700">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="work_location"
                        name="work_location"
                        type="text"
                        placeholder="San Francisco, CA"
                        value={formData.work_location}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills & Expertise</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      placeholder="e.g., Python, JavaScript, Project Management, Data Analysis..."
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Professional Summary</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Brief description of your professional background and achievements..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Document Upload */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Upload Verification Documents</h3>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Flexible Document Upload</h4>
                        <p className="text-sm text-green-700">
                          <strong>Upload any document you have available.</strong> You don't need to upload every type - just choose what you have. 
                          For example, if you only have your degree certificate, that's perfect! Or if you have your student ID card, that works too.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Document Verification</h4>
                        <p className="text-sm text-blue-700 mb-2">
                          Upload <strong>at least one document</strong> to verify your academic credentials. You can upload any combination of the documents below:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1 ml-4">
                          <li>• Any official academic document (degree, transcript, marksheet)</li>
                          <li>• Student ID card or any institutional identification</li>
                          <li>• Other proof of enrollment or graduation</li>
                          <li>• Profile photo (optional but recommended)</li>
                        </ul>
                        <div className="mt-3 pt-2 border-t border-blue-200">
                          <p className="text-sm font-medium text-blue-800">
                            Documents uploaded: {Object.values(uploadedFiles).filter(file => file && file !== uploadedFiles.profile_picture).length} 
                            <span className="text-blue-600">({Object.values(uploadedFiles).filter(file => file && file !== uploadedFiles.profile_picture).length >= 1 ? 'Sufficient for verification' : 'Upload at least 1 document'})</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Academic Document */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <Award className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-700">Academic Document</h4>
                        <p className="text-sm text-gray-500">Degree, transcript, marksheet, etc.</p>
                      </div>
                      {uploadedFiles.academic_document ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Uploaded Successfully!</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{uploadedFiles.academic_document}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('academic_doc')?.click()}
                            className="mt-2"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Replace File
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('academic_doc')?.click()}
                          className="mt-2"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      )}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'academic_document')}
                        className="hidden"
                        id="academic_doc"
                      />
                    </div>
                    
                    {/* ID Card/Proof */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-700">ID Card/Proof</h4>
                        <p className="text-sm text-gray-500">Student ID, institutional ID, etc.</p>
                      </div>
                      {uploadedFiles.id_proof ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Uploaded Successfully!</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{uploadedFiles.id_proof}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('id_proof_file')?.click()}
                            className="mt-2"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Replace File
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('id_proof_file')?.click()}
                          className="mt-2"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      )}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'id_proof')}
                        className="hidden"
                        id="id_proof_file"
                      />
                    </div>
                    
                    {/* Additional Document */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-700">Additional Document</h4>
                        <p className="text-sm text-gray-500">Any other verification document</p>
                      </div>
                      {uploadedFiles.additional_document ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Uploaded Successfully!</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{uploadedFiles.additional_document}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('additional_doc_file')?.click()}
                            className="mt-2"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Replace File
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('additional_doc_file')?.click()}
                          className="mt-2"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      )}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'additional_document')}
                        className="hidden"
                        id="additional_doc_file"
                      />
                    </div>
                    
                    {/* Profile Picture */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-700">Profile Picture</h4>
                        <p className="text-sm text-gray-500">Recent photo (optional)</p>
                      </div>
                      {uploadedFiles.profile_picture ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Uploaded Successfully!</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{uploadedFiles.profile_picture}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('profile_pic')?.click()}
                            className="mt-2"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Replace Photo
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('profile_pic')?.click()}
                          className="mt-2"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </Button>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'profile_picture')}
                        className="hidden"
                        id="profile_pic"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Facial Recognition */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <Camera className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Facial Verification</h3>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Facial Recognition Verification</h4>
                        <p className="text-sm text-blue-700">
                          Please capture a clear photo of your face for verification. This will be securely sent to your institution for identity confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    {!capturedPhoto ? (
                      <div className="w-full max-w-md">
                        <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                          <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }}
                          />
                          {!cameraActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center">
                                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">Click to start camera</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {!cameraActive ? (
                          <Button 
                            onClick={startCamera} 
                            className="w-full mb-4"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Start Camera
                          </Button>
                        ) : (
                          <div className="flex gap-2 w-full">
                            <Button 
                              onClick={capturePhoto} 
                              className="flex-1"
                            >
                              <Camera className="w-4 h-4 mr-2" />
                              Capture Photo
                            </Button>
                            <Button 
                              onClick={stopCamera} 
                              variant="outline" 
                              className="flex-1"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Stop Camera
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full max-w-md text-center">
                        <div className="relative mb-4">
                          <img 
                            src={capturedPhoto} 
                            alt="Captured face" 
                            className="w-full rounded-lg shadow-lg"
                            style={{ transform: 'scaleX(-1)' }}
                          />
                        </div>
                        <div className="flex items-center justify-center text-green-600 mb-4">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Photo captured successfully!</span>
                        </div>
                        <Button 
                          onClick={retakePhoto} 
                          variant="outline" 
                          className="w-full"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Retake Photo
                        </Button>
                      </div>
                    )}
                    
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button 
                  onClick={prevStep} 
                  variant="outline" 
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep} 
                    disabled={!validateStep(currentStep)}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFinalSubmit} 
                    disabled={!validateStep(currentStep) || loading}
                    className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting for Verification...
                      </>
                    ) : (
                      <>
                        Submit for Verification
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center animate-fade-in-up">
            <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        formData={formData}
      />
    </div>
  )
}

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Submitted Successfully!
          </h2>
          
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-900">{formData.first_name} {formData.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-900">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Institution:</span>
                <span className="text-gray-900">{formData.institution_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Graduation Year:</span>
                <span className="text-gray-900">{formData.graduation_year}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold text-blue-800 mb-1">Next Steps</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your application is being reviewed by {formData.institution_name}</li>
                  <li>• You will receive an email confirmation within 24 hours</li>
                  <li>• Verification typically takes 3-5 business days</li>
                  <li>• We will notify you once your profile is approved</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.href = '/login'} 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="outline" 
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimAlumniProfilePage

