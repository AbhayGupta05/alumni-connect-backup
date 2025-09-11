import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, School, Shield, Mail, CheckCircle, Lock, Users, BookOpen, Award, Calendar, Globe, ArrowRight, ChevronRight, Clock, Bell, UserPlus } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section with Navbar */}
      <header className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/20 to-indigo-400/10 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-400/10 to-blue-400/20 rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">Alumni Connect</span>
          </div>
          <div className="flex items-center space-x-1">
            <Link to="/login" className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30">
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-16 md:pb-24 flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left md:pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              <span className="block">Connect. Engage.</span>
              <span className="block text-blue-200">Grow.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
              The comprehensive alumni management platform that strengthens institutional relationships, facilitates networking, and creates opportunities for mentorship and career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/login" className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-50 flex items-center justify-center transition-all">
                <CheckCircle className="w-5 h-5 mr-2" />
                Secure Institutional Login
              </Link>
              <a href="#how-it-works" className="text-white bg-blue-600/30 font-medium py-3 px-6 rounded-lg hover:bg-blue-600/40 flex items-center justify-center">
                Learn How It Works
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          <div className="hidden md:block flex-1 mt-10 md:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="University campus" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-medium">Exclusive Access Platform</p>
                  <p className="text-sm text-blue-100">Institution-verified alumni network</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Badges */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 flex flex-wrap justify-around gap-4 border border-white/20">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-blue-200" />
              <span className="ml-2 text-sm text-white">Secure & GDPR Compliant</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-200" />
              <span className="ml-2 text-sm text-white">Institutional Verification</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-200" />
              <span className="ml-2 text-sm text-white">Invitation-Only Access</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-blue-200" />
              <span className="ml-2 text-sm text-white">Global Network</span>
            </div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Alumni Connect Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our exclusive platform ensures only verified alumni and students can join through a secure, institution-managed process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold absolute -top-5 left-6">1</div>
              <School className="h-10 w-10 text-blue-600 mb-4 mt-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Institution Registration</h3>
              <p className="text-gray-600">
                Educational institutions are manually registered by our administrators, who create and provide secure admin credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold absolute -top-5 left-6">2</div>
              <Users className="h-10 w-10 text-blue-600 mb-4 mt-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Import & Invitations</h3>
              <p className="text-gray-600">
                Institution admins upload verified alumni and student data, and the system automatically sends secure invitation links.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold absolute -top-5 left-6">3</div>
              <UserPlus className="h-10 w-10 text-blue-600 mb-4 mt-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Account Creation</h3>
              <p className="text-gray-600">
                Alumni verify their identity through graduation year validation and create their password to access the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed specifically for educational institutions and their alumni networks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Alumni Directory</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive, searchable database of institution alumni with privacy controls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Award className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mentorship Program</h3>
              <p className="text-gray-600 text-sm">
                Connect current students with alumni mentors for career guidance and support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Calendar className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Events Management</h3>
              <p className="text-gray-600 text-sm">
                Organize and promote reunions, webinars, and networking events for the community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Bell className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Communication</h3>
              <p className="text-gray-600 text-sm">
                Secure messaging system for alumni-to-alumni and alumni-to-student interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50K+</p>
              <p className="text-blue-100">Alumni Connected</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">500+</p>
              <p className="text-blue-100">Institutions</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">98%</p>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">24/7</p>
              <p className="text-blue-100">Platform Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Connect Your Institution?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team to learn how your educational institution can join the Alumni Connect platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@alumniconnect.edu" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact for Access
            </a>
            <Link to="/login" className="bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center">
              Existing Institution? Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold text-white">Alumni Connect</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Alumni Connect. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Secure Institutional Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
