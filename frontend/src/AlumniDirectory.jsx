import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Users, Search, MapPin, Briefcase, GraduationCap, Mail, Phone } from 'lucide-react';

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const alumni = [
    {
      id: 1,
      name: "Sarah Johnson",
      graduationYear: "2018",
      degree: "Computer Science",
      currentPosition: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      skills: ["React", "Python", "Machine Learning"]
    },
    {
      id: 2,
      name: "Michael Chen",
      graduationYear: "2016",
      degree: "Business Administration",
      currentPosition: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      skills: ["Product Strategy", "Data Analysis", "Leadership"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      graduationYear: "2019",
      degree: "Marketing",
      currentPosition: "Marketing Director",
      company: "Adobe",
      location: "Austin, TX",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      skills: ["Digital Marketing", "Brand Strategy", "Analytics"]
    }
  ];

  const filteredAlumni = alumni.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Alumni Directory</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow graduates and build your professional network
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search alumni by name, company, or degree..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person, index) => (
            <Card key={person.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                      {person.name}
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      Class of {person.graduationYear}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {person.degree}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{person.currentPosition}</p>
                    <p className="text-sm">{person.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">{person.location}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{person.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{person.phone}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full" size="sm">
                    Connect
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;


