import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Target,
  Calendar,
  ExternalLink,
  Filter,
  Star,
  Building,
  GraduationCap,
  ChevronRight,
  Play
} from 'lucide-react'

const CareerGrowth = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  // Sample job opportunities data
  const jobOpportunities = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$150,000 - $200,000",
      postedBy: "Sarah Johnson",
      postedDate: "2024-01-15",
      description: "Join our team building next-generation cloud infrastructure. Looking for experienced engineers with strong backend skills.",
      requirements: ["5+ years experience", "Python/Java", "Distributed Systems", "Cloud Platforms"],
      isRemote: false,
      companyLogo: "/api/placeholder/40/40"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      postedBy: "Michael Chen",
      postedDate: "2024-01-14",
      description: "Lead product strategy for our enterprise software solutions. Perfect for someone with technical background and business acumen.",
      requirements: ["3+ years PM experience", "Technical background", "Agile/Scrum", "Data-driven mindset"],
      isRemote: true,
      companyLogo: "/api/placeholder/40/40"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Full-time",
      salary: "$140,000 - $190,000",
      postedBy: "Lisa Wang",
      postedDate: "2024-01-13",
      description: "Work on recommendation algorithms and user behavior analysis. Great opportunity to impact millions of users.",
      requirements: ["PhD or MS in related field", "Python/R", "Machine Learning", "Statistics"],
      isRemote: false,
      companyLogo: "/api/placeholder/40/40"
    }
  ]

  // Sample mentorship matches
  const mentorshipMatches = [
    {
      id: 1,
      mentor: "David Thompson",
      title: "Engineering Director at Tesla",
      expertise: ["Leadership", "Engineering Management", "Electric Vehicles"],
      experience: "12 years",
      avatar: "/api/placeholder/40/40",
      matchScore: 95,
      bio: "Passionate about sustainable technology and developing engineering talent."
    },
    {
      id: 2,
      mentor: "Emily Rodriguez",
      title: "Digital Marketing Manager at Adobe",
      expertise: ["Digital Marketing", "Brand Strategy", "Content Creation"],
      experience: "8 years",
      avatar: "/api/placeholder/40/40",
      matchScore: 88,
      bio: "Creative marketing professional with expertise in digital campaigns."
    }
  ]

  // Sample courses and resources
  const learningResources = [
    {
      id: 1,
      title: "Leadership in Tech: From IC to Manager",
      provider: "Alumni Learning Network",
      instructor: "David Thompson",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 234,
      price: "Free for Alumni",
      thumbnail: "/api/placeholder/300/200",
      topics: ["Leadership", "Management", "Team Building"]
    },
    {
      id: 2,
      title: "Machine Learning for Business Applications",
      provider: "Tech Alumni Collective",
      instructor: "Lisa Wang",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 156,
      price: "$99",
      thumbnail: "/api/placeholder/300/200",
      topics: ["Machine Learning", "Business Strategy", "Data Science"]
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      provider: "Marketing Alumni Network",
      instructor: "Emily Rodriguez",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 189,
      price: "Free for Alumni",
      thumbnail: "/api/placeholder/300/200",
      topics: ["Digital Marketing", "SEO", "Social Media"]
    }
  ]

  // Sample career goals and progress
  const careerGoals = [
    {
      id: 1,
      title: "Become a Senior Engineering Manager",
      progress: 65,
      targetDate: "2024-12-31",
      milestones: [
        { title: "Complete Leadership Training", completed: true },
        { title: "Lead Cross-functional Project", completed: true },
        { title: "Mentor Junior Engineers", completed: false },
        { title: "Get Management Certification", completed: false }
      ]
    },
    {
      id: 2,
      title: "Launch Tech Startup",
      progress: 30,
      targetDate: "2025-06-30",
      milestones: [
        { title: "Develop MVP", completed: true },
        { title: "Secure Initial Funding", completed: false },
        { title: "Build Core Team", completed: false },
        { title: "Launch Beta Version", completed: false }
      ]
    }
  ]

  const filteredJobs = jobOpportunities.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedJobType === 'all' || job.type.toLowerCase() === selectedJobType.toLowerCase()
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation)
    
    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Career Growth</h1>
          <p className="text-gray-600">
            Advance your career with opportunities, mentorship, and learning resources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-1" />
            Set Goals
          </Button>
          <Button size="sm">
            <Briefcase className="h-4 w-4 mr-1" />
            Post Job
          </Button>
        </div>
      </div>

      {/* Career Growth Tabs */}
      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Jobs
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mentorship
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Job Opportunities */}
        <TabsContent value="jobs" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Your Next Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Job Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
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

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex items-center space-x-2">
                            {job.isRemote && (
                              <Badge variant="secondary">Remote</Badge>
                            )}
                            <Badge>{job.type}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Posted by</span>
                            <span className="font-medium text-blue-600">{job.postedBy}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Save
                            </Button>
                            <Button size="sm">
                              Apply Now
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mentorship */}
        <TabsContent value="mentorship" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Mentors</CardTitle>
                <CardDescription>
                  Connect with experienced alumni who can guide your career
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipMatches.map((mentor) => (
                  <Card key={mentor.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentor.avatar} />
                          <AvatarFallback>
                            {mentor.mentor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{mentor.mentor}</h4>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{mentor.matchScore}% match</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
                          <p className="text-sm text-gray-700 mb-3">{mentor.bio}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {mentor.expertise.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {mentor.experience} experience
                            </span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                              <Button size="sm">
                                Request Mentorship
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Mentorship Activity</CardTitle>
                <CardDescription>
                  Track your mentoring relationships and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Your Mentorship Journey</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with mentors or become a mentor yourself to accelerate career growth.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button>Find a Mentor</Button>
                    <Button variant="outline">Become a Mentor</Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Mentorship Benefits:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Personalized career guidance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Industry insights and trends</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Networking opportunities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Skill development support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Resources */}
        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Development Courses</CardTitle>
              <CardDescription>
                Enhance your skills with courses taught by fellow alumni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningResources.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <p>By {course.instructor}</p>
                        <p>{course.provider}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {course.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>{course.duration}</span>
                        <span>{course.students} students</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-600">{course.price}</span>
                        <Button size="sm">
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Goals */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Career Goals</CardTitle>
              <CardDescription>
                Track your progress and stay motivated on your career journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {careerGoals.map((goal) => (
                <Card key={goal.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{goal.title}</h3>
                      <Badge variant="outline">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Milestones:</h4>
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`text-sm ${
                            milestone.completed ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Trends</CardTitle>
                <CardDescription>
                  Stay ahead with the latest industry insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h4 className="font-semibold mb-1">AI & Machine Learning</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Demand for ML engineers increased by 35% this year
                  </p>
                  <Badge variant="secondary" className="text-xs">Trending Up</Badge>
                </div>
                
                <div className="border-l-4 border-l-green-500 pl-4">
                  <h4 className="font-semibold mb-1">Remote Work</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    68% of companies now offer hybrid work options
                  </p>
                  <Badge variant="secondary" className="text-xs">Stable</Badge>
                </div>
                
                <div className="border-l-4 border-l-yellow-500 pl-4">
                  <h4 className="font-semibold mb-1">Cybersecurity</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Critical shortage of cybersecurity professionals
                  </p>
                  <Badge variant="secondary" className="text-xs">High Demand</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Insights</CardTitle>
                <CardDescription>
                  Benchmark your compensation with industry data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Average Salary Growth</h3>
                  <p className="text-2xl font-bold text-green-600">+12.5%</p>
                  <p className="text-sm text-gray-600">Compared to last year</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Top Paying Roles:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Engineering Manager</span>
                      <span className="font-medium">$180k - $250k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Senior Data Scientist</span>
                      <span className="font-medium">$150k - $220k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Product Manager</span>
                      <span className="font-medium">$140k - $200k</span>
                    </div>
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

export default CareerGrowth

