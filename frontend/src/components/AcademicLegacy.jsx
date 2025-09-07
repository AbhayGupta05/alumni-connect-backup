import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  GraduationCap, 
  Heart, 
  DollarSign, 
  Users, 
  BookOpen,
  Award,
  Calendar,
  TrendingUp,
  Target,
  Gift,
  Star,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Building,
  MapPin,
  Clock
} from 'lucide-react'

const AcademicLegacy = () => {
  const [donationAmount, setDonationAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sample giving opportunities
  const givingOpportunities = [
    {
      id: 1,
      title: "Student Scholarship Fund",
      description: "Support deserving students with financial assistance for their education",
      goal: 100000,
      raised: 67500,
      donors: 234,
      category: "scholarships",
      urgency: "high",
      image: "/api/placeholder/300/200",
      impact: "Supports 15 students annually"
    },
    {
      id: 2,
      title: "New Engineering Lab Equipment",
      description: "Help modernize our engineering facilities with state-of-the-art equipment",
      goal: 250000,
      raised: 180000,
      donors: 156,
      category: "facilities",
      urgency: "medium",
      image: "/api/placeholder/300/200",
      impact: "Benefits 500+ engineering students"
    },
    {
      id: 3,
      title: "Alumni Mentorship Program",
      description: "Fund the expansion of our mentorship program to reach more students",
      goal: 50000,
      raised: 32000,
      donors: 89,
      category: "programs",
      urgency: "low",
      image: "/api/placeholder/300/200",
      impact: "Connects 100+ student-mentor pairs"
    }
  ]

  // Sample volunteer opportunities
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Guest Lecturer Program",
      description: "Share your expertise by giving guest lectures to current students",
      timeCommitment: "2-4 hours per semester",
      skills: ["Industry Experience", "Public Speaking"],
      department: "All Departments",
      volunteers: 45,
      type: "ongoing"
    },
    {
      id: 2,
      title: "Career Fair Participation",
      description: "Represent your company and help students explore career opportunities",
      timeCommitment: "1 day per year",
      skills: ["Recruiting", "Career Guidance"],
      department: "Career Services",
      volunteers: 78,
      type: "event"
    },
    {
      id: 3,
      title: "Student Project Mentoring",
      description: "Guide senior students through their capstone projects",
      timeCommitment: "3-5 hours per month",
      skills: ["Technical Expertise", "Project Management"],
      department: "Engineering",
      volunteers: 32,
      type: "ongoing"
    }
  ]

  // Sample university news and updates
  const universityNews = [
    {
      id: 1,
      title: "University Ranks #15 in National Engineering Programs",
      summary: "Our engineering program has been recognized for excellence in innovation and student outcomes",
      date: "2024-01-15",
      category: "achievement",
      image: "/api/placeholder/400/200",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Research Center for Sustainable Technology Opens",
      summary: "State-of-the-art facility will focus on renewable energy and environmental solutions",
      date: "2024-01-12",
      category: "facilities",
      image: "/api/placeholder/400/200",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Alumni Startup Acquired for $50M",
      summary: "Tech company founded by Class of 2018 graduates acquired by major corporation",
      date: "2024-01-10",
      category: "alumni-success",
      image: "/api/placeholder/400/200",
      readTime: "4 min read"
    }
  ]

  // Sample giving history and impact
  const givingStats = {
    totalRaised: 2847000,
    totalDonors: 1923,
    scholarshipsAwarded: 156,
    projectsFunded: 23,
    impactStories: [
      {
        student: "Maria Rodriguez",
        scholarship: "Engineering Excellence Scholarship",
        story: "Thanks to alumni support, I was able to focus on my studies and graduate debt-free. Now I'm working at Google and giving back to future students.",
        year: "Class of 2023"
      },
      {
        student: "James Chen",
        scholarship: "First-Generation College Fund",
        story: "As the first in my family to attend college, the financial support made my dreams possible. I'm now pursuing a PhD in Computer Science.",
        year: "Class of 2022"
      }
    ]
  }

  const filteredOpportunities = givingOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getProgressPercentage = (raised, goal) => {
    return Math.round((raised / goal) * 100)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Legacy</h1>
          <p className="text-gray-600">
            Support your alma mater and help shape the future of education
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share Impact
          </Button>
          <Button size="sm">
            <Gift className="h-4 w-4 mr-1" />
            Make a Gift
          </Button>
        </div>
      </div>

      {/* Academic Legacy Tabs */}
      <Tabs defaultValue="giving" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="giving" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Giving
          </TabsTrigger>
          <TabsTrigger value="volunteer" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Volunteer
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Impact
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            University News
          </TabsTrigger>
          <TabsTrigger value="recognition" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Recognition
          </TabsTrigger>
        </TabsList>

        {/* Giving Opportunities */}
        <TabsContent value="giving" className="space-y-6">
          {/* Quick Donation */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Make a Quick Gift</CardTitle>
              <CardDescription className="text-blue-700">
                Every contribution makes a difference in a student's life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-blue-900">
                    Donation Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  {[25, 50, 100, 250].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDonationAmount(amount.toString())}
                      className="bg-white"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Giving Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'scholarships', 'facilities', 'programs'].map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Giving Opportunities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={opportunity.urgency === 'high' ? 'destructive' : 
                              opportunity.urgency === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {opportunity.urgency} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {opportunity.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{opportunity.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">
                        {formatCurrency(opportunity.raised)} / {formatCurrency(opportunity.goal)}
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(opportunity.raised, opportunity.goal)} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {getProgressPercentage(opportunity.raised, opportunity.goal)}% funded • {opportunity.donors} donors
                    </p>
                  </div>
                  
                  <div className="text-xs text-blue-600 mb-3 font-medium">
                    Impact: {opportunity.impact}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Gift className="h-4 w-4 mr-1" />
                      Donate
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Volunteer Opportunities */}
        <TabsContent value="volunteer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Give Your Time and Expertise</CardTitle>
              <CardDescription>
                Volunteer opportunities to support current students and university programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {volunteerOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{opportunity.title}</h3>
                        <Badge variant={opportunity.type === 'ongoing' ? 'default' : 'secondary'}>
                          {opportunity.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                      
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Time Commitment:</span>
                          <span className="font-medium">{opportunity.timeCommitment}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium">{opportunity.department}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Current Volunteers:</span>
                          <span className="font-medium">{opportunity.volunteers}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Users className="h-4 w-4 mr-1" />
                          Volunteer
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Impact Stories */}
        <TabsContent value="impact" className="space-y-6">
          {/* Impact Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(givingStats.totalRaised)}
                </div>
                <p className="text-sm text-gray-600">Total Raised</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {givingStats.totalDonors.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Alumni Donors</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {givingStats.scholarshipsAwarded}
                </div>
                <p className="text-sm text-gray-600">Scholarships Awarded</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  {givingStats.projectsFunded}
                </div>
                <p className="text-sm text-gray-600">Projects Funded</p>
              </CardContent>
            </Card>
          </div>

          {/* Student Impact Stories */}
          <Card>
            <CardHeader>
              <CardTitle>Student Success Stories</CardTitle>
              <CardDescription>
                See how your support is making a real difference in students' lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {givingStats.impactStories.map((story, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {story.student.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 mb-1">{story.student}</h4>
                          <p className="text-sm text-blue-700 mb-2">{story.scholarship}</p>
                          <p className="text-sm text-blue-800 mb-2">"{story.story}"</p>
                          <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
                            {story.year}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* University News */}
        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest University News</CardTitle>
              <CardDescription>
                Stay connected with what's happening at your alma mater
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {universityNews.map((news) => (
                  <Card key={news.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-400" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs capitalize">
                              {news.category.replace('-', ' ')}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(news.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{news.readTime}</span>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                          <p className="text-gray-600 mb-3">{news.summary}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Comment
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                            <Button variant="outline" size="sm">
                              Read More
                              <ExternalLink className="h-4 w-4 ml-1" />
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

        {/* Recognition */}
        <TabsContent value="recognition" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Donor Recognition</CardTitle>
                <CardDescription>
                  Celebrating our generous alumni supporters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <Award className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Recognition Levels</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-medium">Platinum Circle</span>
                      <span>$10,000+</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">Gold Society</span>
                      <span>$5,000+</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-medium">Silver Circle</span>
                      <span>$1,000+</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-medium">Bronze Society</span>
                      <span>$500+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Naming Opportunities</CardTitle>
                <CardDescription>
                  Leave a lasting legacy on campus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold mb-1">Classroom Naming</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Name a classroom in the new academic building
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Starting at $25,000</span>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold mb-1">Scholarship Endowment</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Create a permanent scholarship in your name
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Starting at $50,000</span>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold mb-1">Research Lab</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Support cutting-edge research with a named lab
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Starting at $100,000</span>
                      <Button size="sm" variant="outline">Learn More</Button>
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

export default AcademicLegacy

