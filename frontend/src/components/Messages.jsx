import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Send,
  Users,
  Star,
  Clock,
  Filter
} from 'lucide-react'
import { sampleMessages } from '../data/sampleData'

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  // Sample forum discussions
  const forumDiscussions = [
    {
      id: 1,
      title: "Career Transition from Engineering to Product Management",
      author: "Sarah Johnson",
      replies: 12,
      lastActivity: "2 hours ago",
      category: "Career",
      isHot: true
    },
    {
      id: 2,
      title: "Alumni Meetup in San Francisco - March 2024",
      author: "Michael Chen",
      replies: 8,
      lastActivity: "5 hours ago",
      category: "Events",
      isHot: false
    },
    {
      id: 3,
      title: "Mentorship Program: Share Your Experience",
      author: "Emily Rodriguez",
      replies: 15,
      lastActivity: "1 day ago",
      category: "Mentorship",
      isHot: true
    },
    {
      id: 4,
      title: "Tech Industry Trends and Opportunities",
      author: "David Thompson",
      replies: 23,
      lastActivity: "2 days ago",
      category: "Industry",
      isHot: false
    }
  ]

  // Sample mentorship requests
  const mentorshipRequests = [
    {
      id: 1,
      student: "Alex Kumar",
      field: "Software Engineering",
      message: "Looking for guidance on transitioning from academia to industry",
      timestamp: "2024-01-15T10:30:00Z",
      status: "pending"
    },
    {
      id: 2,
      student: "Maria Garcia",
      field: "Data Science",
      message: "Seeking advice on machine learning career path",
      timestamp: "2024-01-14T15:45:00Z",
      status: "accepted"
    },
    {
      id: 3,
      student: "James Wilson",
      field: "Product Management",
      message: "Need help with product strategy and user research",
      timestamp: "2024-01-13T09:15:00Z",
      status: "pending"
    }
  ]

  const filteredMessages = sampleMessages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const MessageItem = ({ message, onClick }) => (
    <div 
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
        !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
      }`}
      onClick={() => onClick(message)}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.avatar} />
          <AvatarFallback>
            {message.sender.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className={`text-sm font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
              {message.sender}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleDateString()}
            </p>
          </div>
          <p className={`text-sm mb-1 ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
            {message.subject}
          </p>
          <p className="text-sm text-gray-600 truncate">
            {message.preview}
          </p>
        </div>
        {!message.isRead && (
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages & Communication</h1>
          <p className="text-gray-600">
            Connect with fellow alumni through messages, forums, and mentorship
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Direct Messages
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Discussion Forums
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Mentorship
          </TabsTrigger>
        </TabsList>

        {/* Direct Messages */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inbox</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <MessageItem 
                      key={message.id} 
                      message={message} 
                      onClick={setSelectedMessage}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={selectedMessage.avatar} />
                        <AvatarFallback>
                          {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                        <CardDescription>
                          From {selectedMessage.sender} • {new Date(selectedMessage.timestamp).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800">
                        {selectedMessage.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Reply</label>
                      <Textarea
                        placeholder="Type your reply..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button>
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a message to read
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from your inbox to view and reply
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Discussion Forums */}
        <TabsContent value="forums" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Discussion Forums</span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </CardTitle>
              <CardDescription>
                Join conversations with fellow alumni on various topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forumDiscussions.map((discussion) => (
                  <div key={discussion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{discussion.title}</h4>
                        {discussion.isHot && (
                          <Badge className="bg-orange-100 text-orange-800">Hot</Badge>
                        )}
                      </div>
                      <Badge variant="outline">{discussion.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span>By {discussion.author}</span>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {discussion.replies} replies
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {discussion.lastActivity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mentorship */}
        <TabsContent value="mentorship" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mentorship Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Mentorship Requests
                </CardTitle>
                <CardDescription>
                  Students seeking guidance and mentorship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{request.student}</h4>
                        <p className="text-sm text-gray-600">{request.field}</p>
                      </div>
                      <Badge 
                        variant={request.status === 'accepted' ? 'default' : 'outline'}
                        className={request.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{request.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(request.timestamp).toLocaleDateString()}
                      </p>
                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Decline</Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mentorship Program Info */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Alumni Mentorship Program</CardTitle>
                <CardDescription className="text-blue-700">
                  Share your experience and guide the next generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">1</span>
                    </div>
                    <p className="text-blue-800">Sign up as a mentor in your field</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">2</span>
                    </div>
                    <p className="text-blue-800">Get matched with students seeking guidance</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">3</span>
                    </div>
                    <p className="text-blue-800">Provide career advice and support</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Your Impact</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-blue-700">Students Mentored</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">4.9</p>
                      <p className="text-xs text-blue-700">Average Rating</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Update Mentor Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Messages

