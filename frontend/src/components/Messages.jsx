import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Send,
  Users,
  Star,
  Clock,
  Filter,
  ArrowLeft,
  MoreHorizontal,
  Paperclip,
  Smile,
  Phone,
  Video,
  CheckCheck,
  Check,
  AlertCircle,
  Trash2,
  Archive,
  Flag,
  Heart,
  ThumbsUp,
  Reply,
  Forward,
  Edit3,
  X,
  UserPlus,
  Settings,
  Crown,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Award,
  Coffee,
  Briefcase
} from 'lucide-react'
import { sampleMessages } from '../data/sampleData'

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('messages')
  const [showComposer, setShowComposer] = useState(false)
  const [messages, setMessages] = useState(sampleMessages)
  const [chatMessages, setChatMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [onlineUsers] = useState(['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  // Enhanced sample data
  const enhancedMessages = [
    {
      ...sampleMessages[0],
      fullContent: "Hi there! I saw your profile and was really impressed with your background in software engineering. I'm currently mentoring a few junior developers and would love to discuss potential mentorship opportunities with you. I think we could have some great discussions about career growth and industry trends. Let me know if you're interested!",
      attachments: [],
      reactions: [{ emoji: '👍', count: 2 }, { emoji: '❤️', count: 1 }],
      priority: 'high'
    },
    {
      ...sampleMessages[1],
      fullContent: "Don't miss our upcoming tech networking event on March 22nd. We have confirmed speakers from Google, Microsoft, and several startups. It's going to be an amazing opportunity to connect with fellow alumni and learn about the latest industry trends. Register now as spaces are filling up fast!",
      attachments: [{ name: 'event_flyer.pdf', size: '2.3MB', type: 'pdf' }],
      reactions: [],
      priority: 'normal'
    },
    {
      ...sampleMessages[2],
      fullContent: "Thanks for connecting with me on the platform! I'd love to chat about product management trends and share some insights from my experience at Microsoft. I've been following your work and think we could have some interesting discussions. When would be a good time for a virtual coffee chat?",
      attachments: [],
      reactions: [{ emoji: '☕', count: 1 }],
      priority: 'normal'
    }
  ]

  // Sample chat messages for real-time conversation
  const sampleChatMessages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hey! Thanks for reaching out about mentorship.',
      timestamp: new Date(Date.now() - 300000),
      isMine: false,
      status: 'read'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Absolutely! I\'d love to learn from your experience at Google.',
      timestamp: new Date(Date.now() - 240000),
      isMine: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      content: 'Great! I have some time this Friday afternoon if that works for you. We could do a video call.',
      timestamp: new Date(Date.now() - 180000),
      isMine: false,
      status: 'read'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Perfect! Friday afternoon works great for me. Looking forward to it! 🚀',
      timestamp: new Date(Date.now() - 120000),
      isMine: true,
      status: 'read'
    }
  ]

  // Enhanced forum discussions
  const forumDiscussions = [
    {
      id: 1,
      title: "Career Transition from Engineering to Product Management",
      author: "Sarah Johnson",
      authorRole: "Senior PM at Google",
      replies: 24,
      views: 156,
      lastActivity: "2 hours ago",
      category: "Career",
      tags: ["Product Management", "Career Change", "Engineering"],
      isHot: true,
      isPinned: false,
      hasNewReplies: true
    },
    {
      id: 2,
      title: "Alumni Meetup in San Francisco - March 2024",
      author: "Michael Chen",
      authorRole: "Event Organizer",
      replies: 18,
      views: 89,
      lastActivity: "5 hours ago",
      category: "Events",
      tags: ["Meetup", "San Francisco", "Networking"],
      isHot: false,
      isPinned: true,
      hasNewReplies: false
    },
    {
      id: 3,
      title: "Mentorship Program: Share Your Experience",
      author: "Emily Rodriguez",
      authorRole: "Marketing Director at Adobe",
      replies: 31,
      views: 203,
      lastActivity: "1 day ago",
      category: "Mentorship",
      tags: ["Mentorship", "Experience", "Growth"],
      isHot: true,
      isPinned: false,
      hasNewReplies: true
    },
    {
      id: 4,
      title: "Tech Industry Trends 2024: AI and Beyond",
      author: "David Thompson",
      authorRole: "Engineering Director at Tesla",
      replies: 45,
      views: 312,
      lastActivity: "2 days ago",
      category: "Industry",
      tags: ["AI", "Technology", "Trends"],
      isHot: false,
      isPinned: false,
      hasNewReplies: false
    }
  ]

  // Enhanced mentorship requests
  const mentorshipRequests = [
    {
      id: 1,
      student: "Alex Kumar",
      studentYear: "Senior",
      field: "Software Engineering",
      interests: ["Full Stack Development", "Cloud Computing", "Career Growth"],
      message: "Looking for guidance on transitioning from academia to industry. I'm particularly interested in learning about software architecture and best practices.",
      timestamp: "2024-01-15T10:30:00Z",
      status: "pending",
      urgency: "medium",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      student: "Maria Garcia",
      studentYear: "Graduate Student",
      field: "Data Science",
      interests: ["Machine Learning", "Data Analytics", "Research"],
      message: "Seeking advice on machine learning career path and industry applications. Would love to learn about real-world ML projects.",
      timestamp: "2024-01-14T15:45:00Z",
      status: "accepted",
      urgency: "low",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      student: "James Wilson",
      studentYear: "Junior",
      field: "Product Management",
      interests: ["Product Strategy", "User Research", "Agile"],
      message: "Need help with product strategy and user research methodologies. Planning to pursue PM roles after graduation.",
      timestamp: "2024-01-13T09:15:00Z",
      status: "pending",
      urgency: "high",
      avatar: "/api/placeholder/40/40"
    }
  ]

  const filteredMessages = enhancedMessages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newChatMessage = {
      id: chatMessages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      isMine: true,
      status: 'sent'
    }

    setChatMessages(prev => [...prev, newChatMessage])
    setNewMessage('')
    
    // Simulate typing and response
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const response = {
        id: chatMessages.length + 2,
        sender: selectedMessage?.sender || 'Sarah Johnson',
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        isMine: false,
        status: 'sent'
      }
      setChatMessages(prev => [...prev, response])
    }, 1500)
  }

  const handleMentorshipAction = (requestId, action) => {
    console.log(`${action} mentorship request ${requestId}`)
    // Here you would typically make an API call
  }

  const MessageItem = ({ message, onClick, isSelected }) => (
    <div 
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      } ${
        !message.isRead ? 'bg-blue-25' : 'bg-white'
      }`}
      onClick={() => {
        onClick(message)
        setChatMessages(sampleChatMessages)
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
              {message.sender.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {onlineUsers.includes(message.sender) && (
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <p className={`text-sm font-semibold ${
                !message.isRead ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {message.sender}
              </p>
              {message.priority === 'high' && (
                <Badge className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5">Priority</Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              {message.status === 'read' ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : (
                <Check className="h-3 w-3 text-gray-400" />
              )}
            </div>
          </div>
          
          <p className={`text-sm mb-1 ${
            !message.isRead ? 'font-medium text-gray-900' : 'text-gray-700'
          }`}>
            {message.subject}
          </p>
          
          <p className="text-sm text-gray-600 truncate mb-2">
            {message.preview}
          </p>
          
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex items-center space-x-1">
              {message.reactions.map((reaction, idx) => (
                <span key={idx} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                  {reaction.emoji} {reaction.count}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {!message.isRead && (
          <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Messages & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Communication</span>
                </h1>
                <p className="text-gray-600">Connect, collaborate, and grow with fellow alumni</p>
              </div>
            </div>
            
            <Button
              onClick={() => setShowComposer(!showComposer)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white shadow-sm">
            <TabsTrigger 
              value="messages" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Direct Messages
            </TabsTrigger>
            <TabsTrigger 
              value="forums" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Forums
            </TabsTrigger>
            <TabsTrigger 
              value="mentorship" 
              className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Star className="h-4 w-4" />
              Mentorship
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Direct Messages */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Messages Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 h-[600px] flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                        Inbox
                      </CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">
                        {filteredMessages.filter(m => !m.isRead).length} new
                      </Badge>
                    </div>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10 border-gray-200 focus:border-blue-400"
                      />
                    </div>
                  </CardHeader>
                  
                  <ScrollArea className="flex-1 px-4">
                    <div className="space-y-2">
                      {filteredMessages.map((message) => (
                        <MessageItem 
                          key={message.id} 
                          message={message} 
                          onClick={setSelectedMessage}
                          isSelected={selectedMessage?.id === message.id}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <Card className="shadow-lg border-0 h-[600px] flex flex-col">
                    {/* Chat Header */}
                    <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-white">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                                {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {onlineUsers.includes(selectedMessage.sender) && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold">{selectedMessage.sender}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <span>{selectedMessage.subject}</span>
                              {onlineUsers.includes(selectedMessage.sender) && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {/* Original message */}
                        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-blue-100 text-blue-800">Original Message</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(selectedMessage.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-800">
                            {enhancedMessages.find(m => m.id === selectedMessage.id)?.fullContent || selectedMessage.preview}
                          </p>
                        </div>
                        
                        <Separator />
                        
                        {/* Chat messages */}
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.isMine 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className={`text-xs ${
                                  msg.isMine ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {msg.isMine && (
                                  <CheckCheck className="h-3 w-3 text-blue-200" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {typing && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 px-4 py-2 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex items-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 relative">
                          <Input
                            ref={inputRef}
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                              }
                            }}
                            className="min-h-[40px] pr-12 border-gray-200 focus:border-blue-400"
                          />
                          <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="shadow-lg border-0 h-[600px] flex items-center justify-center">
                    <CardContent className="text-center">
                      <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="h-12 w-12 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Choose a message from your inbox to start chatting with fellow alumni
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Start New Conversation
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Forums */}
          <TabsContent value="forums" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Discussion Forums
                    </CardTitle>
                    <CardDescription>
                      Join conversations with fellow alumni on various topics
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Discussion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {discussion.isPinned && <Crown className="h-4 w-4 text-yellow-500" />}
                            <h4 className="font-bold text-gray-900 hover:text-purple-600 transition-colors">
                              {discussion.title}
                            </h4>
                            {discussion.isHot && (
                              <Badge className="bg-orange-100 text-orange-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                            {discussion.hasNewReplies && (
                              <Badge className="bg-blue-100 text-blue-800">New</Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                                  {discussion.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{discussion.author}</span>
                              <span className="text-purple-600">•</span>
                              <span className="text-xs">{discussion.authorRole}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{discussion.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Mentorship */}
          <TabsContent value="mentorship" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mentorship Requests */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Mentorship Requests
                  </CardTitle>
                  <CardDescription>
                    Students seeking guidance and mentorship from experienced alumni
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mentorshipRequests.map((request) => (
                    <Card key={request.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-green-100 text-green-600 font-bold">
                              {request.student.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900">{request.student}</h4>
                                <p className="text-sm text-gray-600">{request.studentYear} • {request.field}</p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Badge className={`text-xs ${
                                  request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                                  request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {request.urgency}
                                </Badge>
                                <Badge 
                                  variant={request.status === 'accepted' ? 'default' : 'outline'}
                                  className={request.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                                >
                                  {request.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.message}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {request.interests.slice(0, 2).map((interest, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                                  {interest}
                                </Badge>
                              ))}
                              {request.interests.length > 2 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                  +{request.interests.length - 2} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {new Date(request.timestamp).toLocaleDateString()}
                              </span>
                              
                              {request.status === 'pending' ? (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleMentorshipAction(request.id, 'decline')}
                                    className="text-xs px-3 py-1 h-8"
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    Decline
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleMentorshipAction(request.id, 'accept')}
                                    className="text-xs px-3 py-1 h-8 bg-green-600 hover:bg-green-700"
                                  >
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Accept
                                  </Button>
                                </div>
                              ) : (
                                <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-8">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  Message
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Enhanced Mentorship Program Info */}
              <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center">
                    <Award className="h-6 w-6 mr-2" />
                    Alumni Mentorship Program
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Share your experience and guide the next generation of professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* How it works */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-900 mb-3">How it works:</h4>
                    {[
                      { icon: UserPlus, text: 'Sign up as a mentor in your field' },
                      { icon: Users, text: 'Get matched with students seeking guidance' },
                      { icon: Coffee, text: 'Provide career advice and support' },
                      { icon: Award, text: 'Make a lasting impact on their journey' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-green-800 font-medium">{step.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Your impact stats */}
                  <Card className="bg-white/80 backdrop-blur-sm border border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-green-900 mb-3 text-center">Your Impact</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <BookOpen className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-2xl font-bold text-green-600">12</span>
                          </div>
                          <p className="text-xs text-green-700">Students Mentored</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-2xl font-bold text-green-600">4.9</span>
                          </div>
                          <p className="text-xs text-green-700">Average Rating</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-2xl font-bold text-green-600">48</span>
                          </div>
                          <p className="text-xs text-green-700">Hours Contributed</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Briefcase className="h-4 w-4 text-purple-600 mr-1" />
                            <span className="text-2xl font-bold text-green-600">8</span>
                          </div>
                          <p className="text-xs text-green-700">Job Placements</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg">
                      <Settings className="h-4 w-4 mr-2" />
                      Update Mentor Profile
                    </Button>
                    <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                      <Users className="h-4 w-4 mr-2" />
                      View All Mentees
                    </Button>
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

export default Messages

