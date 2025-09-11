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
              <div className="flex items-center mb-6">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  #1 Alumni Management Platform
                </Badge>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect. Engage. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Grow.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The comprehensive alumni management platform that strengthens institutional relationships, 
                facilitates networking, and creates opportunities for mentorship and career growth.
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span>Secure & GDPR Compliant</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Easy Setup</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Global Access</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <span className="relative z-10 flex items-center">
                      Start Free Demo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-gray-50 transition-colors group">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
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

      {/* Statistics Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Active Alumni</div>
              <div className="text-sm text-gray-500 mt-1">Worldwide Network</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-gray-600 font-medium">Institutions</div>
              <div className="text-sm text-gray-500 mt-1">Trust Our Platform</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
                98%
              </div>
              <div className="text-gray-600 font-medium">Satisfaction</div>
              <div className="text-sm text-gray-500 mt-1">User Rating</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Support</div>
              <div className="text-sm text-gray-500 mt-1">Always Available</div>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Institutions
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what alumni coordinators and university administrators are saying about Alumni Connect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Alumni Connect transformed our engagement rates by 300%. The platform is intuitive and our alumni love the networking features."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SJ
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Alumni Director, Stanford University</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "The mentorship matching feature has created incredible opportunities for our students. Setup was seamless and support is outstanding."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    MC
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-600">VP Alumni Relations, MIT</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Our fundraising campaigns are now 5x more effective. The platform's analytics help us understand our alumni better than ever."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    ER
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                    <div className="text-sm text-gray-600">Development Director, Harvard</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of institutions already using Alumni Connect to strengthen 
              their alumni relationships and drive meaningful engagement.
            </p>
            
            {/* Benefits list */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>30-Day Free Trial</span>
              </div>
              <div className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span>Cancel Anytime</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="group relative overflow-hidden px-8 py-4 text-lg">
                  <span className="relative z-10 flex items-center">
                    Start Your Free Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                Contact Sales
              </Button>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              Trusted by 500+ institutions worldwide • No credit card required
            </p>
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

