import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  MessageCircle,
  Users,
  Star,
  Download,
  UserPlus,
  Heart,
  Share2
} from 'lucide-react'
import { sampleAlumni } from '../data/sampleData'

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [favorites, setFavorites] = useState(new Set())
  const [connections, setConnections] = useState(new Set())

  // Get unique values for filters
  const departments = [...new Set(sampleAlumni.map(alumni => alumni.department))]
  const years = [...new Set(sampleAlumni.map(alumni => alumni.graduationYear))].sort((a, b) => b - a)
  const locations = [...new Set(sampleAlumni.map(alumni => alumni.location.split(',')[1]?.trim() || alumni.location))]

  // Filter alumni based on search and filters
  const filteredAlumni = useMemo(() => {
    return sampleAlumni.filter(alumni => {
      const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDepartment = selectedDepartment === 'all' || alumni.department === selectedDepartment
      const matchesYear = selectedYear === 'all' || alumni.graduationYear.toString() === selectedYear
      const matchesLocation = selectedLocation === 'all' || alumni.location.includes(selectedLocation)

      return matchesSearch && matchesDepartment && matchesYear && matchesLocation
    })
  }, [searchTerm, selectedDepartment, selectedYear, selectedLocation])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDepartment('all')
    setSelectedYear('all')
    setSelectedLocation('all')
  }

  const toggleFavorite = (alumniId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(alumniId)) {
        newFavorites.delete(alumniId)
      } else {
        newFavorites.add(alumniId)
      }
      return newFavorites
    })
  }

  const toggleConnection = (alumniId) => {
    setConnections(prev => {
      const newConnections = new Set(prev)
      if (newConnections.has(alumniId)) {
        newConnections.delete(alumniId)
      } else {
        newConnections.add(alumniId)
      }
      return newConnections
    })
  }

  const exportDirectory = () => {
    // In a real app, this would generate a CSV or PDF
    alert('Directory export feature would be implemented here')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alumni Directory</h1>
          <p className="text-gray-600">
            Connect with {filteredAlumni.length} alumni from your network
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportDirectory}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, company, position, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Graduation Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAlumni.length} of {sampleAlumni.length} alumni
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={alumni.profileImage} />
                  <AvatarFallback className="text-lg">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{alumni.name}</CardTitle>
                <CardDescription>
                  {alumni.currentPosition} at {alumni.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  {alumni.degree} • Class of {alumni.graduationYear}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {alumni.location}
                </div>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {alumni.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {alumni.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{alumni.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Mentoring Badge */}
                {alumni.isAvailableForMentoring && (
                  <Badge className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Available for Mentoring
                  </Badge>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link to={`/profile/${alumni.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlumni.map((alumni) => (
            <Card key={alumni.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={alumni.profileImage} />
                    <AvatarFallback className="text-lg">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alumni.name}
                      </h3>
                      {alumni.isAvailableForMentoring && (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="h-3 w-3 mr-1" />
                          Mentoring
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {alumni.currentPosition} at {alumni.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {alumni.degree} • Class of {alumni.graduationYear}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {alumni.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {alumni.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {alumni.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{alumni.skills.length - 5} more
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {alumni.bio}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link to={`/profile/${alumni.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredAlumni.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No alumni found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AlumniDirectory

