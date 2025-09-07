import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
  LogOut
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    
    // Navigate to landing page
    navigate('/')
  }

  const stats = [
    {
      title: "Connections",
      value: "127",
      change: "+12 this month",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Events",
      value: "8",
      change: "3 upcoming",
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Messages",
      value: "23",
      change: "5 unread",
      icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Profile Views",
      value: "45",
      change: "+8 this week",
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      color: "bg-orange-50 border-orange-200"
    }
  ]

  const recentConnections = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Software Engineer at Google",
      initials: "SJ",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager at Microsoft",
      initials: "MC",
      time: "1 day ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Marketing Director at Adobe",
      initials: "ER",
      time: "3 days ago"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2024",
      date: "Oct 15, 2024",
      time: "6:00 PM",
      location: "University Campus",
      attendees: 156,
      status: "registered"
    },
    {
      id: 2,
      title: "Tech Industry Networking",
      date: "Sep 22, 2024",
      time: "7:00 PM",
      location: "San Francisco",
      attendees: 89,
      status: "available"
    }
  ]

  const quickActions = [
    { title: "Find Alumni", icon: <Users className="h-5 w-5" />, link: "/directory", color: "bg-blue-500" },
    { title: "Browse Events", icon: <Calendar className="h-5 w-5" />, link: "/events", color: "bg-green-500" },
    { title: "Send Message", icon: <MessageCircle className="h-5 w-5" />, link: "/messages", color: "bg-purple-500" },
    { title: "Update Profile", icon: <Settings className="h-5 w-5" />, link: "/profile/1", color: "bg-orange-500" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center animate-fade-in-up relative">
          <div className="absolute top-0 right-0">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-blue-600">John!</span>
          </h1>
          <p className="text-lg text-gray-600">
            Stay connected with your alumni network and discover new opportunities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className={`${stat.color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-full bg-white shadow-sm">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Connections */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in-left">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Connections
                </CardTitle>
                <Link to="/directory">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Alumni you've recently connected with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConnections.map((connection, index) => (
                <div 
                  key={connection.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {connection.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{connection.name}</p>
                    <p className="text-sm text-gray-500 truncate">{connection.position}</p>
                    <p className="text-xs text-gray-400">{connection.time}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in-right">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Upcoming Events
                </CardTitle>
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Events you might be interested in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.date} at {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{event.attendees} attending</p>
                    </div>
                    <Badge 
                      variant={event.status === 'registered' ? 'default' : 'secondary'}
                      className={event.status === 'registered' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {event.status === 'registered' ? 'Registered' : 'Available'}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    {event.status === 'available' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Register
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.title} to={action.link}>
                  <div 
                    className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`p-3 rounded-full ${action.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {action.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
                <p className="text-blue-100 mb-4">
                  A complete profile helps you connect better with fellow alumni
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-blue-400 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <Button variant="secondary" className="ml-4">
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

