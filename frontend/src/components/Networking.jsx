import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Network, 
  Users, 
  MapPin, 
  Calendar, 
  MessageCircle,
  UserPlus,
  Search,
  Filter,
  Star,
  Building,
  Briefcase,
  GraduationCap,
  Coffee,
  Video,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Target,
  Award,
  Heart,
  Share2,
  Plus,
  ExternalLink
} from 'lucide-react'

const Networking = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  // Sample networking connections
  const networkingConnections = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      graduationYear: 2018,
      department: "Computer Science",
      industry: "Technology",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 12,
      connectionStrength: "strong",
      lastInteraction: "2024-01-10",
      interests: ["AI/ML", "Startups", "Mentoring"],
      isOnline: true,
      connectionDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      graduationYear: 2015,
      department: "Business",
      industry: "Technology",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 8,
      connectionStrength: "medium",
      lastInteraction: "2024-01-05",
      interests: ["Product Strategy", "Innovation", "Leadership"],
      isOnline: false,
      connectionDate: "2023-08-22"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Digital Marketing Manager",
      company: "Adobe",
      location: "Austin, TX",
      graduationYear: 2020,
      department: "Marketing",
      industry: "Technology",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 15,
      connectionStrength: "strong",
      lastInteraction: "2024-01-12",
      interests: ["Digital Marketing", "Creative Strategy", "Brand Building"],
      isOnline: true,
      connectionDate: "2023-09-10"
    }
  ]

  // Sample networking groups
  const networkingGroups = [
    {
      id: 1,
      name: "Tech Alumni Network",
      description: "Connect with fellow alumni working in the technology industry",
      members: 1247,
      category: "Industry",
      isPrivate: false,
      recentActivity: "5 new posts this week",
      moderators: ["Sarah Johnson", "Michael Chen"],
      topics: ["Career Growth", "Tech Trends", "Job Opportunities"],
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "San Francisco Bay Area Alumni",
      description: "Local networking and events for Bay Area alumni",
      members: 892,
      category: "Location",
      isPrivate: false,
      recentActivity: "Meetup scheduled for next week",
      moderators: ["David Thompson"],
      topics: ["Local Events", "Networking", "Professional Development"],
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Women in Leadership",
      description: "Supporting female alumni in leadership roles and career advancement",
      members: 634,
      category: "Professional",
      isPrivate: true,
      recentActivity: "Leadership workshop announced",
      moderators: ["Emily Rodriguez", "Lisa Wang"],
      topics: ["Leadership", "Career Advancement", "Mentorship"],
      image: "/api/placeholder/100/100"
    }
  ]

  // Sample networking events
  const networkingEvents = [
    {
      id: 1,
      title: "Tech Industry Mixer",
      date: "2024-02-15",
      time: "18:00",
      location: "San Francisco, CA",
      type: "In-Person",
      attendees: 89,
      maxAttendees: 100,
      organizer: "Tech Alumni Network",
      description: "Join fellow tech alumni for networking, drinks, and discussions about industry trends.",
      rsvpStatus: "going",
      isVirtual: false
    },
    {
      id: 2,
      title: "Virtual Coffee Chat: Career Transitions",
      date: "2024-02-20",
      time: "15:00",
      location: "Virtual Event",
      type: "Virtual",
      attendees: 45,
      maxAttendees: 50,
      organizer: "Alumni Career Network",
      description: "Informal discussion about career transitions and how to navigate them successfully.",
      rsvpStatus: "interested",
      isVirtual: true
    },
    {
      id: 3,
      title: "Startup Founders Meetup",
      date: "2024-02-25",
      time: "19:00",
      location: "Austin, TX",
      type: "In-Person",
      attendees: 32,
      maxAttendees: 40,
      organizer: "Entrepreneur Alumni Group",
      description: "Connect with fellow alumni who have started their own companies or are interested in entrepreneurship.",
      rsvpStatus: null,
      isVirtual: false
    }
  ]

  // Sample connection suggestions
  const connectionSuggestions = [
    {
      id: 1,
      name: "James Wilson",
      title: "Investment Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      graduationYear: 2016,
      department: "Finance",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 5,
      reason: "Same graduation year and similar interests",
      interests: ["Finance", "Investment Strategy", "Economics"]
    },
    {
      id: 2,
      name: "Lisa Wang",
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      graduationYear: 2019,
      department: "Computer Science",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 8,
      reason: "Works in your industry and has mutual connections",
      interests: ["Machine Learning", "Data Science", "Analytics"]
    }
  ]

  const filteredConnections = networkingConnections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesIndustry = selectedIndustry === 'all' || connection.industry.toLowerCase() === selectedIndustry.toLowerCase()
    const matchesLocation = selectedLocation === 'all' || connection.location.includes(selectedLocation)
    
    return matchesSearch && matchesIndustry && matchesLocation
  })

  const getConnectionStrengthColor = (strength) => {
    switch (strength) {
      case 'strong': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'weak': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Networking</h1>
          <p className="text-gray-600">
            Build meaningful professional relationships within your alumni community
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Invite Alumni
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create Group
          </Button>
        </div>
      </div>

      {/* Networking Tabs */}
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            My Network
          </TabsTrigger>
          <TabsTrigger value="discover" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Discover
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* My Network */}
        <TabsContent value="connections" className="space-y-6">
          {/* Network Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">247</div>
                <p className="text-sm text-gray-600">Total Connections</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Network className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">89</div>
                <p className="text-sm text-gray-600">Strong Connections</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">156</div>
                <p className="text-sm text-gray-600">Recent Interactions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">+12</div>
                <p className="text-sm text-gray-600">New This Month</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Your Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search connections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Industries</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="consulting">Consulting</option>
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Locations</option>
                  <option value="CA">California</option>
                  <option value="WA">Washington</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Connections List */}
          <div className="space-y-4">
            {filteredConnections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {connection.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{connection.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getConnectionStrengthColor(connection.connectionStrength)}`}>
                            {connection.connectionStrength} connection
                          </Badge>
                          {connection.isOnline && (
                            <Badge variant="secondary" className="text-xs">Online</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{connection.title} at {connection.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{connection.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>Class of {connection.graduationYear} • {connection.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{connection.mutualConnections} mutual connections</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {connection.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Last interaction: {new Date(connection.lastInteraction).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Coffee className="h-4 w-4 mr-1" />
                            Meet
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discover New Connections */}
        <TabsContent value="discover" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>People You May Know</CardTitle>
              <CardDescription>
                Expand your network with these suggested connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {connectionSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={suggestion.avatar} />
                          <AvatarFallback>
                            {suggestion.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{suggestion.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            {suggestion.title} at {suggestion.company}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Class of {suggestion.graduationYear} • {suggestion.department}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {suggestion.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          
                          <p className="text-xs text-blue-600 mb-3">{suggestion.reason}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {suggestion.mutualConnections} mutual connections
                            </span>
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <UserPlus className="h-4 w-4 mr-1" />
                                Connect
                              </Button>
                              <Button variant="outline" size="sm">
                                View Profile
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

          {/* Advanced Search */}
          <Card>
            <CardHeader>
              <CardTitle>Find Alumni</CardTitle>
              <CardDescription>
                Search for alumni by specific criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Graduation Year</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Any Year</option>
                    <option value="2020-2024">2020-2024</option>
                    <option value="2015-2019">2015-2019</option>
                    <option value="2010-2014">2010-2014</option>
                    <option value="2005-2009">2005-2009</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Any Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="business">Business</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="arts-sciences">Arts & Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input placeholder="Enter company name..." />
                </div>
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search Alumni
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Groups */}
        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Groups</CardTitle>
              <CardDescription>
                Join groups to connect with alumni who share your interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {networkingGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Network className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{group.name}</h3>
                            {group.isPrivate && (
                              <Badge variant="outline" className="text-xs">Private</Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {group.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>{group.members.toLocaleString()} members</span>
                        <span className="text-green-600">{group.recentActivity}</span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Popular Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {group.topics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Users className="h-4 w-4 mr-1" />
                          Join Group
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Networking Events */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Networking Events</CardTitle>
              <CardDescription>
                Connect with fellow alumni at these networking opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <Badge variant={event.isVirtual ? 'secondary' : 'default'}>
                              {event.type}
                            </Badge>
                            {event.rsvpStatus && (
                              <Badge 
                                variant={event.rsvpStatus === 'going' ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {event.rsvpStatus}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees} attending / {event.maxAttendees} max</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>Organized by {event.organizer}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{event.description}</p>
                          
                          <div className="flex space-x-2">
                            <Button size="sm">
                              {event.rsvpStatus ? 'Update RSVP' : 'RSVP'}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Networking Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Growth</CardTitle>
                <CardDescription>
                  Track your networking activity and growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Network Growth Rate</h3>
                  <p className="text-2xl font-bold text-green-600">+15%</p>
                  <p className="text-sm text-gray-600">This quarter</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Recent Activity:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>New connections this month</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Messages sent</span>
                      <span className="font-medium">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Events attended</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Groups joined</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Networking Tips</CardTitle>
                <CardDescription>
                  Maximize your networking effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-l-blue-500 pl-4">
                    <h4 className="font-semibold mb-1">Be Authentic</h4>
                    <p className="text-sm text-gray-600">
                      Focus on building genuine relationships rather than just collecting contacts.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-l-green-500 pl-4">
                    <h4 className="font-semibold mb-1">Follow Up</h4>
                    <p className="text-sm text-gray-600">
                      Send a personalized message within 24-48 hours after meeting someone new.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-l-purple-500 pl-4">
                    <h4 className="font-semibold mb-1">Give First</h4>
                    <p className="text-sm text-gray-600">
                      Look for ways to help others before asking for favors or assistance.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-l-orange-500 pl-4">
                    <h4 className="font-semibold mb-1">Stay Active</h4>
                    <p className="text-sm text-gray-600">
                      Regularly engage with your network through comments, shares, and messages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Networking

