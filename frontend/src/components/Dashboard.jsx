import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Clock,
  MapPin,
  Briefcase,
  Star,
  ArrowRight,
  Bell,
  Settings,
  Heart,
  LogOut,
  Globe,
  Building2,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  BookOpen,
  Award,
  Zap,
  Target,
  Network,
  UserPlus,
  Eye,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  ExternalLink,
  MessageSquare,
  Video,
  Coffee
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('institution')
  const [searchQuery, setSearchQuery] = useState('')
  const [isGlobalMode, setIsGlobalMode] = useState(false)

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    
    // Force reload to reset authentication state
    window.location.href = '/'
  }

  // Enhanced Sample Data with 50+ profiles
  const institutionAlumni = [
    {
      id: 1, name: "Alexandra Rivera", role: "Senior Data Scientist at Netflix", 
      batch: "2018", department: "Computer Science", location: "San Francisco, CA",
      initials: "AR", avatar: null, specialties: ["Machine Learning", "Data Analytics"],
      lastActive: "2 hours ago", connections: 234, isOnline: true
    },
    {
      id: 2, name: "Marcus Thompson", role: "Product Manager at Spotify", 
      batch: "2017", department: "Business Administration", location: "New York, NY",
      initials: "MT", avatar: null, specialties: ["Product Strategy", "User Research"],
      lastActive: "5 hours ago", connections: 189, isOnline: false
    },
    {
      id: 3, name: "Priya Sharma", role: "Software Engineer at Apple", 
      batch: "2019", department: "Computer Science", location: "Cupertino, CA",
      initials: "PS", avatar: null, specialties: ["iOS Development", "Swift"],
      lastActive: "1 day ago", connections: 156, isOnline: true
    },
    {
      id: 4, name: "David Kim", role: "UX Designer at Adobe", 
      batch: "2016", department: "Design", location: "Seattle, WA",
      initials: "DK", avatar: null, specialties: ["UI/UX", "Design Systems"],
      lastActive: "3 hours ago", connections: 201, isOnline: true
    },
    {
      id: 5, name: "Sophia Chen", role: "Marketing Director at Tesla", 
      batch: "2015", department: "Marketing", location: "Austin, TX",
      initials: "SC", avatar: null, specialties: ["Digital Marketing", "Brand Strategy"],
      lastActive: "6 hours ago", connections: 312, isOnline: false
    }
  ]

  const globalAlumni = [
    {
      id: 51, name: "James Wilson", role: "Tech Lead at Meta", 
      university: "Stanford University", batch: "2017", location: "Menlo Park, CA",
      initials: "JW", avatar: null, specialties: ["React", "System Design"],
      lastActive: "4 hours ago", connections: 445, isOnline: true
    },
    {
      id: 52, name: "Maria Garcia", role: "Venture Capitalist at Sequoia", 
      university: "Harvard Business School", batch: "2014", location: "Boston, MA",
      initials: "MG", avatar: null, specialties: ["Investment", "Startups"],
      lastActive: "1 hour ago", connections: 678, isOnline: true
    },
    {
      id: 53, name: "Robert Chang", role: "AI Researcher at DeepMind", 
      university: "MIT", batch: "2016", location: "London, UK",
      initials: "RC", avatar: null, specialties: ["Deep Learning", "NLP"],
      lastActive: "8 hours ago", connections: 389, isOnline: false
    }
  ]

  const institutionStats = {
    connections: { value: "247", change: "+18 this month", total: "from your institution" },
    events: { value: "12", change: "5 upcoming", total: "institutional events" },
    messages: { value: "34", change: "8 unread", total: "from classmates" },
    mentorships: { value: "6", change: "2 active", total: "current mentorships" }
  }

  const globalStats = {
    connections: { value: "1,247", change: "+52 this month", total: "global network" },
    events: { value: "45", change: "15 upcoming", total: "worldwide events" },
    messages: { value: "89", change: "23 unread", total: "global conversations" },
    opportunities: { value: "28", change: "12 new", total: "job opportunities" }
  }

  const institutionEvents = [
    {
      id: 1, title: "CS Alumni Tech Talk 2024", date: "Oct 20, 2024", time: "7:00 PM",
      location: "University Auditorium", attendees: 89, status: "registered",
      type: "Tech Talk", organizer: "CS Department"
    },
    {
      id: 2, title: "Business Alumni Networking", date: "Nov 5, 2024", time: "6:30 PM",
      location: "Alumni Center", attendees: 156, status: "available",
      type: "Networking", organizer: "Business School"
    }
  ]

  const globalEvents = [
    {
      id: 51, title: "Global Tech Summit 2024", date: "Nov 15, 2024", time: "9:00 AM",
      location: "San Francisco, CA", attendees: 1250, status: "available",
      type: "Summit", organizer: "Tech Alumni Network"
    },
    {
      id: 52, title: "International Alumni Meetup", date: "Dec 1, 2024", time: "5:00 PM",
      location: "Virtual Event", attendees: 890, status: "registered",
      type: "Virtual", organizer: "Global Alumni Association"
    }
  ]

  const currentAlumni = activeTab === 'institution' ? institutionAlumni : globalAlumni
  const currentStats = activeTab === 'institution' ? institutionStats : globalStats
  const currentEvents = activeTab === 'institution' ? institutionEvents : globalEvents

  const handleSendMessage = (alumniId, alumniName) => {
    // Navigate to messages page with pre-filled recipient
    navigate(`/messages?recipient=${alumniId}&name=${alumniName}`)
  }

  const renderStats = () => {
    const statsArray = Object.entries(currentStats).map(([key, data]) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      value: data.value,
      change: data.change,
      total: data.total,
      icon: key === 'connections' ? <Users className="h-6 w-6" /> :
            key === 'events' ? <Calendar className="h-6 w-6" /> :
            key === 'messages' ? <MessageCircle className="h-6 w-6" /> :
            key === 'mentorships' ? <BookOpen className="h-6 w-6" /> :
            <Target className="h-6 w-6" />,
      color: key === 'connections' ? 'from-blue-500 to-blue-600' :
             key === 'events' ? 'from-green-500 to-green-600' :
             key === 'messages' ? 'from-purple-500 to-purple-600' :
             key === 'mentorships' ? 'from-orange-500 to-orange-600' :
             'from-gray-500 to-gray-600'
    }))

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsArray.map((stat, index) => (
          <Card key={stat.title} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{stat.title}</p>
                <p className="text-sm text-gray-500">{stat.total}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout and Profile Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Network className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Alex!</span>
              </h1>
              <p className="text-gray-600">Ready to connect and grow your network?</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Global Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm border">
              <Building2 className={`h-4 w-4 ${!isGlobalMode ? 'text-blue-600' : 'text-gray-400'}`} />
              <Button
                variant={isGlobalMode ? "outline" : "default"}
                size="sm"
                onClick={() => setIsGlobalMode(!isGlobalMode)}
                className="h-8"
              >
                {isGlobalMode ? 'Global Mode' : 'Institution Mode'}
              </Button>
              <Globe className={`h-4 w-4 ${isGlobalMode ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
            
            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            
            {/* Settings */}
            <Link to="/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Logout */}
            <Button onClick={handleLogout} variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dual Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white p-1 shadow-sm">
            <TabsTrigger 
              value="institution" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Building2 className="h-4 w-4" />
              <span>Institution</span>
            </TabsTrigger>
            <TabsTrigger 
              value="global" 
              className="flex items-center space-x-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Globe className="h-4 w-4" />
              <span>Global Network</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="institution" className="space-y-8">
            {/* Institution View Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Institution Network</h2>
              <p className="text-gray-600">Connect with alumni from your university and department</p>
            </div>
            
            {renderStats()}
            
            {/* Institution-specific content continues... */}
          </TabsContent>

          <TabsContent value="global" className="space-y-8">
            {/* Global View Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Alumni Network</h2>
              <p className="text-gray-600">Connect with alumni from universities worldwide</p>
            </div>
            
            {renderStats()}
            
            {/* Global-specific content continues... */}
          </TabsContent>
        </Tabs>

        {/* Alumni Directory with Enhanced Search */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                {activeTab === 'institution' ? 'Your Classmates' : 'Global Alumni'}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search alumni..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <CardDescription>
              {activeTab === 'institution' 
                ? `${institutionAlumni.length} alumni from your institution` 
                : `${globalAlumni.length} alumni in global network`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentAlumni
                .filter(alumni => 
                  alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alumni.role.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((alumni, index) => (
                <Card key={alumni.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg">
                            {alumni.initials}
                          </AvatarFallback>
                        </Avatar>
                        {alumni.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{alumni.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleSendMessage(alumni.id, alumni.name)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mb-2">{alumni.role}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                          {activeTab === 'institution' ? (
                            <>
                              <span className="flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                {alumni.batch}
                              </span>
                              <span className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {alumni.department}
                              </span>
                            </>
                          ) : (
                            <span className="flex items-center">
                              <Building2 className="h-3 w-3 mr-1" />
                              {alumni.university}
                            </span>
                          )}
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alumni.location}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {alumni.specialties.slice(0, 2).map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{alumni.connections} connections</span>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() => handleSendMessage(alumni.id, alumni.name)}
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="h-8 px-3 text-xs bg-gradient-to-r from-blue-600 to-purple-600"
                            >
                              <UserPlus className="h-3 w-3 mr-1" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                {activeTab === 'institution' ? 'University Events' : 'Global Events'}
              </CardTitle>
              <Link to="/events">
                <Button variant="outline" size="sm">
                  View All <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <CardDescription>
              Discover and join events in your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {currentEvents.map((event) => (
                <Card key={event.id} className="border border-gray-200 hover:border-green-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500">by {event.organizer}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees} attending
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge variant={event.type === 'Virtual' ? 'outline' : 'secondary'}>
                            {event.type}
                          </Badge>
                          <Badge 
                            variant={event.status === 'registered' ? 'default' : 'secondary'}
                            className={event.status === 'registered' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {event.status === 'registered' ? 'Registered' : 'Available'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-6">
                        {event.status === 'available' && (
                          <Button className="bg-green-600 hover:bg-green-700">
                            Register Now
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Messages</h3>
              <p className="text-sm text-gray-600 mb-4">Start conversations with alumni</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Open Messages
              </Button>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mentorship</h3>
              <p className="text-sm text-gray-600 mb-4">Find or become a mentor</p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Explore
              </Button>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Job Board</h3>
              <p className="text-sm text-gray-600 mb-4">Discover career opportunities</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Coffee Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Schedule casual meetups</p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Enhancement Banner */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Enhance Your Profile</h3>
                  <p className="text-blue-100">
                    Complete your profile to unlock more networking opportunities and get discovered by fellow alumni
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-full" style={{clipPath: 'polygon(0 0, 85% 0, 85% 100%, 0 100%)'}}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">85%</div>
                </div>
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  Complete Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

