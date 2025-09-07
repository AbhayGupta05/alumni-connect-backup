import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Mail,
  Phone,
  Linkedin,
  Star,
  Calendar,
  Users,
  Award
} from 'lucide-react'
import { sampleAlumni } from '../data/sampleData'

const ProfilePage = () => {
  const { id } = useParams()
  const alumni = sampleAlumni.find(a => a.id === parseInt(id))

  if (!alumni) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600">The requested alumni profile could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={alumni.profileImage} />
                <AvatarFallback className="text-2xl">
                  {alumni.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {alumni.isAvailableForMentoring && (
                <Badge className="bg-green-100 text-green-800 mb-2">
                  <Star className="h-3 w-3 mr-1" />
                  Available for Mentoring
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{alumni.name}</h1>
              <p className="text-xl text-gray-600 mb-4">
                {alumni.currentPosition} at {alumni.company}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  <span>{alumni.degree} • Class of {alumni.graduationYear}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{alumni.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{alumni.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{alumni.phone}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{alumni.bio}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {alumni.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Professional Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Position */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">{alumni.currentPosition}</h4>
              <p className="text-blue-600 font-medium">{alumni.company}</p>
              <p className="text-sm text-gray-600">2020 - Present</p>
              <p className="text-gray-700 mt-2">
                Leading innovative projects and driving technological advancement in the field of {alumni.degree.toLowerCase()}.
              </p>
            </div>

            <Separator />

            {/* Education */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-medium">{alumni.degree}</h5>
                <p className="text-green-600">University Name</p>
                <p className="text-sm text-gray-600">Graduated {alumni.graduationYear}</p>
                <p className="text-gray-700 mt-2">
                  Specialized in {alumni.department} with focus on practical applications and research.
                </p>
              </div>
            </div>

            <Separator />

            {/* Achievements */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Achievements & Recognition</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Excellence in Innovation Award</p>
                    <p className="text-sm text-gray-600">Recognized for outstanding contributions to technology advancement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alumni Mentor of the Year</p>
                    <p className="text-sm text-gray-600">Awarded for exceptional mentorship and guidance to students</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Social */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{alumni.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{alumni.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">LinkedIn</p>
                  <a href={`https://${alumni.linkedin}`} className="font-medium text-blue-600 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="font-medium">
                    {new Date(alumni.lastActive).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Connections</p>
                  <p className="font-medium">127 mutual connections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {alumni.isAvailableForMentoring && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Mentorship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm mb-4">
                  {alumni.name} is available for mentorship and career guidance.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Request Mentorship
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

