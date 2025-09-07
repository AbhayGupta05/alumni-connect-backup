import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, MessageCircle, TrendingUp, GraduationCap, Network, ArrowRight } from 'lucide-react'
import campusImage from '../assets/VH0cmux4E2mp.jpg'

const LandingPage = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Alumni Directory",
      description: "Connect with fellow graduates and build your professional network",
      path: "/directory"
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Event Management",
      description: "Stay updated on reunions, networking events, and university activities",
      path: "/events"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Communication Hub",
      description: "Direct messaging, forums, and mentorship opportunities",
      path: "/communication"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Career Growth",
      description: "Job opportunities, mentorship matching, and professional development",
      path: "/career"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Academic Legacy",
      description: "Maintain connections with your alma mater and support current students",
      path: "/legacy"
    },
    {
      icon: <Network className="h-8 w-8 text-blue-600" />,
      title: "Networking",
      description: "Build meaningful professional relationships within your alumni community",
      path: "/networking"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center group">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3 transition-transform group-hover:scale-110" />
              <h1 className="text-2xl font-bold text-gray-900">Alumni Connect</h1>
            </div>
            <Link to="/login">
              <Button className="relative overflow-hidden group">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect. Engage. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Grow.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The comprehensive alumni management platform that strengthens institutional relationships, 
                facilitates networking, and creates opportunities for mentorship and career growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-gray-50 transition-colors">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src={campusImage} 
                  alt="University Campus" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Solving the Alumni Engagement Challenge
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most educational institutions struggle with scattered alumni data, poor engagement, 
              and missed opportunities for meaningful connections. Alumni Connect provides the solution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-all duration-300 animate-fade-in-left">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  Current Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Scattered alumni data across multiple platforms
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Limited communication through informal channels
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Missed mentorship and networking opportunities
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Poor event attendance and engagement
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Reduced fundraising potential
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Our Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Centralized alumni management system
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Professional networking and communication tools
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Mentorship matching and career opportunities
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Comprehensive event management platform
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Enhanced fundraising and engagement capabilities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Alumni Success
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to build and maintain strong alumni relationships
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.path} key={index} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50">
                  <CardHeader className="pb-4">
                    <div className="mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Explore feature</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-30 translate-y-30 animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Alumni Network?
            </h3>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of institutions already using Alumni Connect to strengthen 
              their alumni relationships and drive meaningful engagement.
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="group relative overflow-hidden px-8 py-4 text-lg">
                <span className="relative z-10 flex items-center">
                  Start Your Demo Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-lg font-bold">Alumni Connect</span>
              </div>
              <p className="text-gray-400">
                Connecting alumni, strengthening institutions, building futures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Alumni Directory</li>
                <li>Event Management</li>
                <li>Communication Tools</li>
                <li>Analytics Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>Training Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Alumni Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

