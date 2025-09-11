import { useMemo, useState } from 'react'
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
  Clock,
  Globe,
  University,
  Crown,
  UserCheck,
  Download,
  Edit,
  Trash2,
  Shield,
  Sparkles
} from 'lucide-react'

const ModernAcademicLegacy = ({ currentUser = { id: 1, role: 'alumni', institution: 'University of Technology' } }) => {
  const [donationAmount, setDonationAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeScope, setActiveScope] = useState('institution')

  // Role-based permissions
  const permissions = useMemo(() => {
    switch (currentUser?.role) {
      case 'student':
        return {
          canDonate: false,
          canVolunteer: true,
          canCreateCampaigns: false,
          canEditCampaigns: false,
          canDeleteCampaigns: false,
          canExport: false,
          canAccessGlobalData: false,
          scopeAccess: 'institution-only'
        }
      case 'alumni':
        return {
          canDonate: true,
          canVolunteer: true,
          canCreateCampaigns: false,
          canEditCampaigns: false,
          canDeleteCampaigns: false,
          canExport: false,
          canAccessGlobalData: true,
          scopeAccess: 'institution-and-global'
        }
      case 'admin':
        return {
          canDonate: true,
          canVolunteer: true,
          canCreateCampaigns: true,
          canEditCampaigns: true,
          canDeleteCampaigns: true,
          canExport: true,
          canAccessGlobalData: true,
          scopeAccess: 'all'
        }
      default:
        return {}
    }
  }, [currentUser?.role])

  // Sample giving opportunities
  const allGivingOpportunities = [
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
      impact: "Supports 15 students annually",
      institution: 'University of Technology',
      is_global: false
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
      impact: "Benefits 500+ engineering students",
      institution: 'University of Technology',
      is_global: false
    },
    {
      id: 3,
      title: "Global Alumni Emergency Fund",
      description: "Support alumni communities worldwide during crisis situations",
      goal: 500000,
      raised: 320000,
      donors: 456,
      category: "emergency",
      urgency: "high",
      image: "/api/placeholder/300/200",
      impact: "Assists 200+ alumni globally",
      institution: 'Global Alumni Network',
      is_global: true
    },
    {
      id: 4,
      title: "Alumni Mentorship Program",
      description: "Fund the expansion of our mentorship program to reach more students",
      goal: 50000,
      raised: 32000,
      donors: 89,
      category: "programs",
      urgency: "low",
      image: "/api/placeholder/300/200",
      impact: "Connects 100+ student-mentor pairs",
      institution: 'University of Technology',
      is_global: false
    }
  ]

  // Sample volunteer opportunities
  const allVolunteerOpportunities = [
    {
      id: 1,
      title: "Guest Lecturer Program",
      description: "Share your expertise by giving guest lectures to current students",
      timeCommitment: "2-4 hours per semester",
      skills: ["Industry Experience", "Public Speaking"],
      department: "All Departments",
      volunteers: 45,
      type: "ongoing",
      institution: 'University of Technology',
      is_global: false
    },
    {
      id: 2,
      title: "Global Alumni Webinar Series",
      description: "Conduct virtual sessions for alumni worldwide on industry trends",
      timeCommitment: "2 hours per quarter",
      skills: ["Expertise", "Online Presentation"],
      department: "Global Programs",
      volunteers: 123,
      type: "online",
      institution: 'Global Alumni Network',
      is_global: true
    },
    {
      id: 3,
      title: "Career Fair Participation",
      description: "Represent your company and help students explore career opportunities",
      timeCommitment: "1 day per year",
      skills: ["Recruiting", "Career Guidance"],
      department: "Career Services",
      volunteers: 78,
      type: "event",
      institution: 'University of Technology',
      is_global: false
    },
    {
      id: 4,
      title: "Student Project Mentoring",
      description: "Guide senior students through their capstone projects",
      timeCommitment: "3-5 hours per month",
      skills: ["Technical Expertise", "Project Management"],
      department: "Engineering",
      volunteers: 32,
      type: "ongoing",
      institution: 'University of Technology',
      is_global: false
    }
  ]

  // Sample university news and updates
  const allUniversityNews = [
    {
      id: 1,
      title: "University Ranks #15 in National Engineering Programs",
      summary: "Our engineering program has been recognized for excellence in innovation and student outcomes",
      date: "2024-01-15",
      category: "achievement",
      image: "/api/placeholder/400/200",
      readTime: "3 min read",
      institution: 'University of Technology',
      is_global: false
    },
    {
      id: 2,
      title: "Global Alumni Network Reaches 1 Million Members",
      summary: "The worldwide alumni community celebrates this milestone with virtual events across continents",
      date: "2024-01-14",
      category: "milestone",
      image: "/api/placeholder/400/200",
      readTime: "4 min read",
      institution: 'Global Alumni Network',
      is_global: true
    },
    {
      id: 3,
      title: "New Research Center for Sustainable Technology Opens",
      summary: "State-of-the-art facility will focus on renewable energy and environmental solutions",
      date: "2024-01-12",
      category: "facilities",
      image: "/api/placeholder/400/200",
      readTime: "5 min read",
      institution: 'University of Technology',
      is_global: false
    },
    {
      id: 4,
      title: "Alumni Startup Acquired for $50M",
      summary: "Tech company founded by Class of 2018 graduates acquired by major corporation",
      date: "2024-01-10",
      category: "alumni-success",
      image: "/api/placeholder/400/200",
      readTime: "4 min read",
      institution: 'University of Technology',
      is_global: false
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

  // Scope filtering
  const filterByScope = (items) => {
    if (currentUser?.role === 'student') {
      return items.filter(item => !item.is_global && item.institution === currentUser?.institution)
    }
    if (activeScope === 'global') {
      return items.filter(item => item.is_global === true)
    }
    return items.filter(item => item.institution === currentUser?.institution || !item.is_global)
  }

  // Derived, filtered datasets
  const givingOpportunities = useMemo(() => filterByScope(allGivingOpportunities), [activeScope, currentUser])
  const volunteerOpportunities = useMemo(() => filterByScope(allVolunteerOpportunities), [activeScope, currentUser])
  const universityNews = useMemo(() => filterByScope(allUniversityNews), [activeScope, currentUser])

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Academic Legacy</h1>
              {currentUser?.role === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
              {currentUser?.role === 'student' && <UserCheck className="h-4 w-4 text-blue-500" />}
            </div>
            <p className="text-gray-600">Support your alma mater and help shape the future of education</p>
          </div>
          <div className="flex items-center gap-2">
            {permissions.canExport && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share Impact
            </Button>
            {permissions.canDonate && (
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Gift className="h-4 w-4 mr-1" />
                Make a Gift
              </Button>
            )}
            {permissions.canCreateCampaigns && (
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Plus className="h-4 w-4 mr-1" />
                New Campaign
              </Button>
            )}
          </div>
        </div>

        {/* Scope tabs for Alumni/Admin; Students see institution-only */}
        {permissions.scopeAccess !== 'institution-only' && (
          <div className="flex items-center space-x-2 p-4 bg-white/80 backdrop-blur-sm rounded-lg border">
            <Button
              variant={activeScope === 'institution' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveScope('institution')}
              className={activeScope === 'institution' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
            >
              <University className="h-4 w-4 mr-1" />
              Institution
            </Button>
            <Button
              variant={activeScope === 'global' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveScope('global')}
              className={activeScope === 'global' ? 'bg-teal-500 hover:bg-teal-600' : ''}
            >
              <Globe className="h-4 w-4 mr-1" />
              Global
            </Button>
            <div className="text-sm text-gray-600 ml-2">
              {activeScope === 'institution' ? (
                <span>🏛️ Supporting {currentUser?.institution}</span>
              ) : (
                <span>🌍 Supporting global alumni initiatives</span>
              )}
            </div>
          </div>
        )}

        {/* Academic Legacy Tabs */}
        <Tabs defaultValue="giving" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="giving" className="flex items-center gap-2 data-[state=active]:bg-emerald-100">
              <Gift className="h-4 w-4" />
              Giving
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex items-center gap-2 data-[state=active]:bg-emerald-100">
              <Users className="h-4 w-4" />
              Volunteer
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2 data-[state=active]:bg-emerald-100">
              <TrendingUp className="h-4 w-4" />
              Impact
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-emerald-100">
              <BookOpen className="h-4 w-4" />
              University News
            </TabsTrigger>
            <TabsTrigger value="recognition" className="flex items-center gap-2 data-[state=active]:bg-emerald-100">
              <Award className="h-4 w-4" />
              Recognition
            </TabsTrigger>
          </TabsList>

          {/* Giving Opportunities */}
          <TabsContent value="giving" className="space-y-6">
            {/* Quick Donation */}
            {permissions.canDonate && (
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-900">
                    <Sparkles className="h-5 w-5" />
                    Make a Quick Gift
                  </CardTitle>
                  <CardDescription className="text-emerald-700">
                    Every contribution makes a difference in a student's life
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2 text-emerald-900">
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
                          className="bg-white hover:bg-emerald-50"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search and Filter */}
            <Card className="bg-white/80 backdrop-blur-sm">
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
                    {['all', 'scholarships', 'facilities', 'programs', 'emergency'].map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`capitalize ${
                          selectedCategory === category ? 'bg-emerald-500 hover:bg-emerald-600' : 'hover:bg-emerald-50'
                        }`}
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
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 rounded-t-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={opportunity.urgency === 'high' ? 'destructive' : 
                                  opportunity.urgency === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {opportunity.urgency} priority
                        </Badge>
                        <Badge className={`text-xs ${opportunity.is_global ? 'bg-teal-100 text-teal-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {opportunity.is_global ? 'Global' : 'Institution'}
                        </Badge>
                      </div>
                      {permissions.canEditCampaigns && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-6 px-1">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {permissions.canDeleteCampaigns && (
                            <Button size="sm" variant="ghost" className="h-6 px-1 text-red-500">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Badge variant="outline" className="text-xs capitalize mb-2">
                      {opportunity.category}
                    </Badge>
                    
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
                    
                    <div className="text-xs text-emerald-600 mb-3 font-medium">
                      🎆 Impact: {opportunity.impact}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        disabled={!permissions.canDonate}
                      >
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
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Give Your Time and Expertise
                </CardTitle>
                <CardDescription>
                  Volunteer opportunities to support current students and university programs {activeScope === 'global' ? 'worldwide' : `at ${currentUser?.institution}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {volunteerOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{opportunity.title}</h3>
                            <Badge className={`text-xs ${opportunity.is_global ? 'bg-teal-100 text-teal-700' : 'bg-emerald-100 text-emerald-700'}`}>
                              {opportunity.is_global ? 'Global' : 'Institution'}
                            </Badge>
                          </div>
                          <Badge variant={opportunity.type === 'ongoing' ? 'default' : 
                                         opportunity.type === 'online' ? 'secondary' : 'outline'}>
                            {opportunity.type}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                        
                        <div className="space-y-2 text-sm mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Time Commitment:
                            </span>
                            <span className="font-medium">{opportunity.timeCommitment}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              Department:
                            </span>
                            <span className="font-medium">{opportunity.department}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Current Volunteers:
                            </span>
                            <span className="font-medium text-emerald-600">{opportunity.volunteers}</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Required Skills:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                            disabled={!permissions.canVolunteer}
                          >
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
    </div>
  )
}

export default ModernAcademicLegacy

