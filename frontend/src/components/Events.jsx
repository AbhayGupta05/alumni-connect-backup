import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Filter,
  Search,
  Plus,
  ExternalLink
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { sampleEvents } from '../data/sampleData'

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Filter events based on search and category
  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  // Separate upcoming and past events
  const currentDate = new Date()
  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= currentDate)
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < currentDate)

  const categories = ['all', 'reunion', 'networking', 'workshop', 'mentorship']

  const EventCard = ({ event, isPast = false }) => (
    <Card className={`hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={event.category === 'Reunion' ? 'default' : 'secondary'}>
                {event.category}
              </Badge>
              {event.isRegistered && !isPast && (
                <Badge className="bg-green-100 text-green-800">Registered</Badge>
              )}
              {isPast && (
                <Badge variant="outline">Past Event</Badge>
              )}
            </div>
          </div>
          {event.image && (
            <div className="w-20 h-20 bg-gray-200 rounded-lg ml-4 flex-shrink-0">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-base">
          {event.description}
        </CardDescription>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{event.attendees} attending</span>
            {event.maxAttendees && (
              <span className="text-gray-400">/ {event.maxAttendees} max</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {!isPast ? (
            <>
              <Button 
                className="flex-1"
                variant={event.isRegistered ? "outline" : "default"}
              >
                {event.isRegistered ? "View Details" : "Register"}
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="flex-1">
                View Photos
              </Button>
              <Button variant="outline" className="flex-1">
                Event Summary
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">
            Discover and join alumni events, reunions, and networking opportunities
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
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

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming Events ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Past Events ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming events found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? "Try adjusting your search criteria" 
                    : "Check back soon for new events"}
                </p>
                <Button>Create New Event</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No past events found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || selectedCategory !== 'all' 
                    ? "Try adjusting your search criteria" 
                    : "Past events will appear here"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Featured Events */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Featured Event</CardTitle>
          <CardDescription className="text-blue-700">
            Don't miss our signature annual event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Annual Alumni Reunion 2024
              </h3>
              <p className="text-blue-800 mb-4">
                Join us for our biggest celebration of the year with dinner, networking, 
                campus tours, and special guest speakers. Reconnect with classmates and 
                make new connections.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-700 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  June 15, 2024
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  6:00 PM
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  University Campus
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  156 registered
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Register Now
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Events

