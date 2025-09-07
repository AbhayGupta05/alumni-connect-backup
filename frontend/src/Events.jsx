import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, Users, Star, Filter } from 'lucide-react';

const Events = () => {
  const [filter, setFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2024",
      date: "2024-10-15",
      time: "6:00 PM - 11:00 PM",
      location: "University Main Campus",
      description: "Join us for our biggest alumni gathering of the year with dinner, networking, and entertainment.",
      attendees: 250,
      category: "reunion",
      featured: true,
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Tech Industry Networking Mixer",
      date: "2024-09-20",
      time: "7:00 PM - 9:00 PM",
      location: "Silicon Valley Tech Hub",
      description: "Connect with fellow alumni working in the tech industry. Light refreshments provided.",
      attendees: 85,
      category: "networking",
      featured: false,
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Career Development Workshop",
      date: "2024-09-25",
      time: "2:00 PM - 5:00 PM",
      location: "Downtown Conference Center",
      description: "Professional development session covering resume building, interview skills, and career transitions.",
      attendees: 45,
      category: "professional",
      featured: false,
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Alumni Mentorship Program Launch",
      date: "2024-10-01",
      time: "6:30 PM - 8:30 PM",
      location: "University Alumni Center",
      description: "Launch event for our new mentorship program connecting experienced alumni with recent graduates.",
      attendees: 120,
      category: "mentorship",
      featured: true,
      image: "/api/placeholder/400/200"
    }
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Upcoming Events</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with your alumni community through exciting events and networking opportunities
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="transition-all duration-200"
          >
            All Events
          </Button>
          <Button 
            variant={filter === 'reunion' ? 'default' : 'outline'}
            onClick={() => setFilter('reunion')}
            className="transition-all duration-200"
          >
            Reunions
          </Button>
          <Button 
            variant={filter === 'networking' ? 'default' : 'outline'}
            onClick={() => setFilter('networking')}
            className="transition-all duration-200"
          >
            Networking
          </Button>
          <Button 
            variant={filter === 'professional' ? 'default' : 'outline'}
            onClick={() => setFilter('professional')}
            className="transition-all duration-200"
          >
            Professional Development
          </Button>
          <Button 
            variant={filter === 'mentorship' ? 'default' : 'outline'}
            onClick={() => setFilter('mentorship')}
            className="transition-all duration-200"
          >
            Mentorship
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-fade-in-up ${
                event.featured ? 'ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-white' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {event.title}
                      </CardTitle>
                      {event.featured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <CardDescription className="text-gray-600">
                      {event.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-purple-500" />
                    <span className="text-sm font-medium">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-3 text-purple-500" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-purple-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-purple-500" />
                    <span className="text-sm">{event.attendees} attendees expected</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-100 text-purple-800 capitalize"
                  >
                    {event.category}
                  </Badge>
                  
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in-up">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Want to Host an Event?</h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Have an idea for an alumni event? We'd love to help you organize and promote it to our community.
              </p>
              <Button variant="secondary" size="lg">
                Propose an Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Events;


