import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Camera, FileText, CheckCircle, AlertCircle, School, User, Mail, Phone, Calendar, BookOpen, CreditCard, GraduationCap, Eye } from 'lucide-react'

const AlumniClaimProfile = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Form data
  const [formData, setFormData] = useState({
    college: '',
    full_name: '',
    email: '',
    mobile_number: '',
    graduation_year: '',
    department: '',
    student_id: '',
    roll_number: '',
    degree: '',
    proof_document: null,
    current_photo: null
  })

  // File preview states
  const [documentPreview, setDocumentPreview] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const fileInputRef = useRef()
  const photoInputRef = useRef()

  // Webcam states for photo capture
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef()
  const canvasRef = useRef()

  // Face verification state
  const [faceVerificationStatus, setFaceVerificationStatus] = useState('')

  // Load colleges on component mount
  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const response = await fetch(`${API_BASE_URL}/alumni-claim/colleges`)
      const data = await response.json()
      
      if (data.success) {
        // For demo, let's use a hardcoded list based on the colleges file you provided
        const collegesList = [
          "Indian Institute of Technology Bombay (IIT Bombay)",
          "Indian Institute of Technology Delhi (IIT Delhi)", 
          "Indian Institute of Technology Madras (IIT Madras)",
          "Indian Institute of Technology Kanpur (IIT Kanpur)",
          "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
          "Indian Institute of Science (IISc) Bangalore",
          "All India Institute of Medical Sciences (AIIMS), New Delhi",
          "Jawaharlal Nehru University (JNU), New Delhi",
          "University of Delhi (DU)",
          "Banaras Hindu University (BHU), Varanasi",
          "Vellore Institute of Technology (VIT), Vellore",
          "Amrita Vishwa Vidyapeetham, Coimbatore",
          "National Institute of Technology Tiruchirappalli (NIT Trichy)",
          "Anna University, Chennai",
          "Indian Institute of Management Ahmedabad (IIM Ahmedabad)",
          "Jadavpur University, Kolkata",
          "BITS Pilani - Pilani Campus",
          "Delhi Technological University (DTU)",
          "Pune Institute of Computer Technology",
          "Manipal Academy of Higher Education, Manipal"
        ]
        setColleges(collegesList)
      } else {
        setError('Failed to load colleges list')
      }
    } catch (err) {
      console.error('Error fetching colleges:', err)
      setError('Failed to load colleges list')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        [type]: file
      }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'proof_document') {
          setDocumentPreview(file.name)
        } else if (type === 'current_photo') {
          setPhotoPreview(reader.result)
          // Perform face verification simulation
          performFaceVerification(file)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const performFaceVerification = async (photoFile) => {
    setFaceVerificationStatus('processing')
    
    // Simulate image validation processing
    setTimeout(() => {
      // Basic image validation simulation
      if (photoFile.size > 10 * 1024 * 1024) { // 10MB limit
        setFaceVerificationStatus('image_too_large')
      } else if (photoFile.size < 1024) { // 1KB minimum
        setFaceVerificationStatus('image_too_small')
      } else {
        setFaceVerificationStatus('verification_completed')
      }
    }, 1500)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setShowCamera(true)
    } catch (err) {
      setError('Unable to access camera. Please upload a photo instead.')
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)
    
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' })
      setFormData(prev => ({
        ...prev,
        current_photo: file
      }))
      setPhotoPreview(canvas.toDataURL())
      performFaceVerification(file)
      
      // Stop camera
      const tracks = video.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      setShowCamera(false)
    }, 'image/jpeg', 0.9)
  }

  const validateStep1 = () => {
    const requiredFields = ['college', 'full_name', 'email', 'mobile_number', 'graduation_year', 'department']
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in ${field.replace('_', ' ')}`)
        return false
      }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/
    if (!mobileRegex.test(formData.mobile_number)) {
      setError('Please enter a valid 10-digit mobile number')
      return false
    }
    
    // Validate graduation year
    const currentYear = new Date().getFullYear()
    const gradYear = parseInt(formData.graduation_year)
    if (gradYear < 1950 || gradYear > currentYear + 4) {
      setError('Please enter a valid graduation year')
      return false
    }
    
    return true
  }

  const validateStep2 = () => {
    if (!formData.proof_document) {
      setError('Please upload a proof document')
      return false
    }
    
    if (!formData.current_photo) {
      setError('Please upload or capture your current photo')
      return false
    }
    
    if (faceVerificationStatus === 'image_too_small') {
      setError('Image is too small. Please upload a larger photo.')
      return false
    }
    
    if (faceVerificationStatus === 'image_too_large') {
      setError('Image is too large. Please upload a smaller photo (max 10MB).')
      return false
    }
    
    if (faceVerificationStatus === 'verification_failed') {
      setError('Image verification failed. Please upload a valid image file.')
      return false
    }
    
    return true
  }

  const handleNext = () => {
    setError('')
    
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      const submitFormData = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitFormData.append(key, formData[key])
        }
      })
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const response = await fetch(`${API_BASE_URL}/alumni-claim/submit-claim`, {
        method: 'POST',
        body: submitFormData
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setError(result.message || 'Failed to submit claim')
      }
      
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getFaceVerificationDisplay = () => {
    switch (faceVerificationStatus) {
      case 'processing':
        return <span className="text-yellow-600">🔄 Validating image...</span>
      case 'verification_completed':
        return <span className="text-green-600">✅ Image validated successfully</span>
      case 'image_too_small':
        return <span className="text-red-600">❌ Image too small</span>
      case 'image_too_large':
        return <span className="text-red-600">❌ Image too large</span>
      case 'invalid_aspect_ratio':
        return <span className="text-red-600">❌ Invalid image format</span>
      case 'verification_failed':
        return <span className="text-red-600">❌ Image validation failed</span>
      default:
        return <span className="text-gray-600">⏳ Waiting for photo...</span>
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h2>
          <p className="text-gray-600 mb-4">{success}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Claim Alumni Profile</h1>
            </div>
          </div>
          
          {/* Step indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>3</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <School className="w-6 h-6 mr-2 text-blue-600" />
              Step 1: Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* College Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your College/Institution *
                </label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose your college...</option>
                  {colleges.map((college, index) => (
                    <option key={index} value={college}>{college}</option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  required
                />
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Graduation Year *
                </label>
                <input
                  type="number"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="YYYY"
                  min="1950"
                  max={new Date().getFullYear() + 4}
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Student ID (Optional)
                </label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Student ID number"
                />
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number (Optional)
                </label>
                <input
                  type="text"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Roll number"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree (Optional)
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., B.Tech, M.Tech, MBA"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Document Upload */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2 text-blue-600" />
              Step 2: Document Upload & Photo Verification
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Proof Document */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Proof Document *
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload any one of these documents:
                  <br />• Degree Certificate
                  <br />• Mark Sheet
                  <br />• Student ID Card
                  <br />• Admission Letter
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, 'proof_document')}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                  {documentPreview ? (
                    <div>
                      <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">{documentPreview}</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                      >
                        Change Document
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Upload Document
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Photo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Current Photo *
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a clear, recent photo of yourself for verification.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    ref={photoInputRef}
                    onChange={(e) => handleFileChange(e, 'current_photo')}
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                  />
                  {photoPreview ? (
                    <div>
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-2 border-2 border-gray-200"
                      />
                      <div className="mb-2">
                        <p className="text-sm font-medium">Image Verification:</p>
                        {getFaceVerificationDisplay()}
                      </div>
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <button
                          onClick={() => photoInputRef.current?.click()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                        >
                          Upload Photo
                        </button>
                        <button
                          onClick={startCamera}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Take Photo
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Face Verification Status */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm font-medium">Image Verification:</span>
                  </div>
                  <div className="mt-1 text-sm">
                    {getFaceVerificationDisplay()}
                  </div>
                </div>
              </div>
            </div>

            {/* Camera Modal */}
            {showCamera && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4">Take Your Photo</h3>
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  ></video>
                  <canvas ref={canvasRef} className="hidden"></canvas>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        const tracks = videoRef.current?.srcObject?.getTracks()
                        tracks?.forEach(track => track.stop())
                        setShowCamera(false)
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Capture Photo
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
              Step 3: Review & Submit
            </h2>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>College:</strong> {formData.college}</p>
                  <p><strong>Full Name:</strong> {formData.full_name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Mobile:</strong> {formData.mobile_number}</p>
                  <p><strong>Graduation Year:</strong> {formData.graduation_year}</p>
                  <p><strong>Department:</strong> {formData.department}</p>
                  {formData.student_id && <p><strong>Student ID:</strong> {formData.student_id}</p>}
                  {formData.roll_number && <p><strong>Roll Number:</strong> {formData.roll_number}</p>}
                  {formData.degree && <p><strong>Degree:</strong> {formData.degree}</p>}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Documents</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Proof Document:</strong> {documentPreview}</p>
                  <p><strong>Current Photo:</strong> {photoPreview ? 'Uploaded ✓' : 'Not uploaded'}</p>
                  <p><strong>Image Verification:</strong> {getFaceVerificationDisplay()}</p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Terms and Conditions</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• I declare that all information provided is true and accurate.</p>
                  <p>• I understand that providing false information may result in rejection of my claim.</p>
                  <p>• I consent to the verification of my academic records with the institution.</p>
                  <p>• I agree to the processing of my personal data for alumni network purposes.</p>
                  <p>• The institution reserves the right to approve or reject any claim.</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>1. Your claim will be sent to your institution for verification</p>
                  <p>2. Institution admin will review your documents and information</p>
                  <p>3. You'll receive an email notification about the approval status</p>
                  <p>4. If approved, your alumni account will be created and login credentials sent</p>
                  <p>5. Processing typically takes 3-5 business days</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                ← Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Claim'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlumniClaimProfile
