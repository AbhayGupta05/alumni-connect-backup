import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  MessageCircle,
  BarChart3,
  Activity,
  Award,
  Target,
  ArrowRight,
  Settings,
  Bell,
  Plus,
  LogOut
} from 'lucide-react'

const AdminDashboard = () => {
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
      title: "Total Alumni",
      value: "2,847",
      change: "+12% this month",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Active Members",
      value: "1,923",
      change: "67% engagement",
      icon: <Activity className="h-6 w-6 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Events This Month",
      value: "8",
      change: "3 upcoming",
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Total Donations",
      value: "$125K",
      change: "+15% from last year",
      icon: <DollarSign className="h-6 w-6 text-orange-600" />,
      color: "bg-orange-50 border-orange-200"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "new_member",
      message: "Sarah Johnson joined the alumni network",
      time: "2 hours ago",
      icon: <UserPlus className="h-4 w-4 text-green-600" />
    },
    {
      id: 2,
      type: "event_created",
      message: "Tech Networking Event was created",
      time: "5 hours ago",
      icon: <Calendar className="h-4 w-4 text-blue-600" />
    },
    {
      id: 3,
      type: "donation",
      message: "Michael Chen made a $500 donation",
      time: "1 day ago",
      icon: <DollarSign className="h-4 w-4 text-orange-600" />
    },
    {
      id: 4,
      type: "message",
      message: "New message from Alumni Association",
      time: "2 days ago",
      icon: <MessageCircle className="h-4 w-4 text-purple-600" />
    }
  ]

  const quickActions = [
    { title: "Add Alumni", icon: <UserPlus className="h-5 w-5" />, link: "/directory", color: "bg-blue-500" },
    { title: "Create Event", icon: <Plus className="h-5 w-5" />, link: "/events", color: "bg-green-500" },
    { title: "Send Message", icon: <MessageCircle className="h-5 w-5" />, link: "/messages", color: "bg-purple-500" },
    { title: "View Analytics", icon: <BarChart3 className="h-5 w-5" />, link: "/analytics", color: "bg-orange-500" }
  ]

  const topPerformingEvents = [
    { name: "Annual Reunion 2024", attendees: 156, status: "upcoming" },
    { name: "Tech Industry Meetup", attendees: 89, status: "completed" },
    { name: "Career Fair", attendees: 234, status: "completed" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
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
            Admin <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your alumni network and track engagement metrics.
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
          {/* Recent Activities */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in-left">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activities
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <CardDescription>Latest activities in your alumni network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="p-2 rounded-full bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Events */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in-right">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Top Events
                </CardTitle>
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Most popular events by attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformingEvents.map((event, index) => (
                <div 
                  key={event.name} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{event.name}</h4>
                    <Badge 
                      variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                      className={event.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{event.attendees} attendees</span>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{event.attendees}</span>
                    </div>
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
            <CardDescription>Common administrative tasks</CardDescription>
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

        {/* Engagement Overview */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="animate-fade-in-left">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Engagement Goals
              </CardTitle>
              <CardDescription>Track your alumni engagement targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Active Users</span>
                  <span className="text-sm text-gray-500">1,923 / 2,500</span>
                </div>
                <Progress value={77} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Event Attendance</span>
                  <span className="text-sm text-gray-500">156 / 200</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Donation Goal</span>
                  <span className="text-sm text-gray-500">$125K / $150K</span>
                </div>
                <Progress value={83} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-fade-in-right">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">System Health</h3>
                  <p className="text-blue-100 mb-4">
                    All systems are running smoothly
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Server Status</span>
                      <Badge className="bg-green-500 text-white">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-500 text-white">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Service</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" className="ml-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

