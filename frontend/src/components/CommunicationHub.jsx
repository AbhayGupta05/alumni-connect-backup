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
  Send, 
  Search, 
  Users, 
  Plus,
  Pin,
  Heart,
  Reply,
  MoreHorizontal,
  Bell,
  Filter,
  Hash,
  UserPlus,
  Settings
} from 'lucide-react'

const CommunicationHub = () => {
  const [newMessage, setNewMessage] = useState('')
  const [newPost, setNewPost] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('general')

  // Sample data for messages and forums
  const directMessages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hey! Thanks for connecting. I'd love to discuss the mentorship program.",
      timestamp: "2024-01-15T10:30:00Z",
      avatar: "/api/placeholder/40/40",
      isRead: false
    },
    {
      id: 2,
      sender: "Michael Chen",
      message: "Great meeting you at the networking event! Let's grab coffee soon.",
      timestamp: "2024-01-14T15:45:00Z",
      avatar: "/api/placeholder/40/40",
      isRead: true
    },
    {
      id: 3,
      sender: "Emily Rodriguez",
      message: "I saw your post about the marketing workshop. Very insightful!",
      timestamp: "2024-01-13T09:15:00Z",
      avatar: "/api/placeholder/40/40",
      isRead: true
    }
  ]

  const forumChannels = [
    { id: 'general', name: 'General Discussion', members: 1247, unread: 5 },
    { id: 'career', name: 'Career Advice', members: 892, unread: 12 },
    { id: 'tech', name: 'Tech Talk', members: 634, unread: 3 },
    { id: 'networking', name: 'Networking', members: 756, unread: 8 },
    { id: 'mentorship', name: 'Mentorship', members: 423, unread: 2 },
    { id: 'events', name: 'Events & Meetups', members: 567, unread: 7 }
  ]

  const forumPosts = [
    {
      id: 1,
      author: "David Thompson",
      title: "Tips for transitioning into management roles",
      content: "After 8 years in engineering, I recently moved into a director role. Here are some key insights I've learned about making this transition...",
      timestamp: "2024-01-15T14:20:00Z",
      avatar: "/api/placeholder/40/40",
      likes: 24,
      replies: 8,
      channel: 'career',
      isPinned: true,
      tags: ['management', 'career-growth', 'leadership']
    },
    {
      id: 2,
      author: "Lisa Wang",
      title: "Machine Learning trends in 2024",
      content: "As someone working in data science at Netflix, I wanted to share some observations about where ML is heading this year...",
      timestamp: "2024-01-14T11:45:00Z",
      avatar: "/api/placeholder/40/40",
      likes: 18,
      replies: 12,
      channel: 'tech',
      isPinned: false,
      tags: ['machine-learning', 'data-science', 'trends']
    },
    {
      id: 3,
      author: "James Wilson",
      title: "NYC Alumni Meetup - February 20th",
      content: "Planning another meetup for our NYC-based alumni! We'll be meeting at the rooftop bar in Manhattan. RSVP below!",
      timestamp: "2024-01-13T16:30:00Z",
      avatar: "/api/placeholder/40/40",
      likes: 31,
      replies: 15,
      channel: 'events',
      isPinned: false,
      tags: ['nyc', 'meetup', 'networking']
    }
  ]

  const mentorshipRequests = [
    {
      id: 1,
      requester: "Alex Kumar",
      field: "Software Engineering",
      experience: "Recent Graduate",
      description: "Looking for guidance on breaking into the tech industry, particularly in full-stack development.",
      timestamp: "2024-01-15T09:00:00Z",
      avatar: "/api/placeholder/40/40",
      status: "open"
    },
    {
      id: 2,
      requester: "Maria Garcia",
      field: "Product Management",
      experience: "2 years",
      description: "Seeking mentorship on transitioning from engineering to product management.",
      timestamp: "2024-01-14T14:30:00Z",
      avatar: "/api/placeholder/40/40",
      status: "matched"
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would create the post
      console.log('Creating post:', newPost)
      setNewPost('')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Hub</h1>
          <p className="text-gray-600">
            Connect, share, and collaborate with fellow alumni
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-1" />
            Notifications
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Channel
          </Button>
        </div>
      </div>

      {/* Communication Tabs */}
      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mentorship
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        {/* Direct Messages */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Direct Messages</span>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {directMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        !message.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                      }`}
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
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {message.sender}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <CardDescription>Senior Software Engineer at Google</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hey! Thanks for connecting. I'd love to discuss the mentorship program.</p>
                        <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hi Sarah! I'd be happy to chat about mentorship opportunities. When would be a good time for you?</p>
                        <p className="text-xs text-blue-100 mt-1">10:45 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Forums */}
        <TabsContent value="forums" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Channel List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {forumChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChannel === channel.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Hash className="h-4 w-4" />
                          <span className="font-medium">{channel.name}</span>
                        </div>
                        {channel.unread > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {channel.members} members
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Forum Posts */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Hash className="h-5 w-5" />
                      <span>{forumChannels.find(c => c.id === selectedChannel)?.name}</span>
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      New Post
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Create Post */}
                  <div className="border rounded-lg p-4">
                    <Textarea
                      placeholder="Share something with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Add Tags</Button>
                        <Button variant="outline" size="sm">Attach File</Button>
                      </div>
                      <Button onClick={handleCreatePost}>Post</Button>
                    </div>
                  </div>

                  {/* Forum Posts */}
                  {forumPosts
                    .filter(post => post.channel === selectedChannel)
                    .map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{post.author}</h3>
                              <span className="text-sm text-gray-500">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </span>
                              {post.isPinned && (
                                <Badge variant="outline" className="text-xs">
                                  <Pin className="h-3 w-3 mr-1" />
                                  Pinned
                                </Badge>
                              )}
                            </div>
                            
                            <h4 className="font-medium text-lg mb-2">{post.title}</h4>
                            <p className="text-gray-600 mb-3">{post.content}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <Reply className="h-4 w-4 mr-1" />
                                  {post.replies}
                                </Button>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Mentorship */}
        <TabsContent value="mentorship" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <CardDescription>
                  Help fellow alumni by offering your expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>
                            {request.requester.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{request.requester}</h4>
                            <Badge 
                              variant={request.status === 'open' ? 'default' : 'secondary'}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Field:</strong> {request.field}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Experience:</strong> {request.experience}
                          </p>
                          <p className="text-sm text-gray-700 mb-3">
                            {request.description}
                          </p>
                          <div className="flex space-x-2">
                            <Button size="sm">Offer Mentorship</Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
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
                <CardTitle>Become a Mentor</CardTitle>
                <CardDescription>
                  Share your expertise and help guide the next generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Make an Impact?</h3>
                  <p className="text-gray-600 mb-4">
                    Join our mentorship program and help fellow alumni advance their careers.
                  </p>
                  <Button className="mb-4">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Become a Mentor
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Mentorship Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Expand your professional network</li>
                    <li>• Develop leadership skills</li>
                    <li>• Give back to your alma mater</li>
                    <li>• Gain fresh perspectives</li>
                    <li>• Build meaningful relationships</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Announcements */}
        <TabsContent value="announcements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>University Announcements</CardTitle>
              <CardDescription>
                Stay updated with the latest news from your alma mater
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-1">
                        New Alumni Center Opening
                      </h4>
                      <p className="text-blue-800 text-sm mb-2">
                        We're excited to announce the opening of our new state-of-the-art Alumni Center on campus. Join us for the grand opening ceremony on March 15th.
                      </p>
                      <p className="text-xs text-blue-600">Posted 2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-500 rounded-full p-2">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        Annual Giving Campaign Launch
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        Help us reach our goal of $2M for student scholarships. Every contribution makes a difference in a student's educational journey.
                      </p>
                      <p className="text-xs text-gray-500">Posted 1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        Distinguished Alumni Award Nominations Open
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        Nominate outstanding alumni who have made significant contributions to their field and community. Deadline: April 30th.
                      </p>
                      <p className="text-xs text-gray-500">Posted 2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CommunicationHub

