import { useState, useMemo, useEffect } from 'react'
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
  Share2,
  Loader2
} from 'lucide-react'
import apiClient from '../utils/api'
import { sampleAlumni } from '../data/sampleData'

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [favorites, setFavorites] = useState(new Set())
  const [connections, setConnections] = useState(new Set())

  // Fetch alumni data from API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getAlumni()
        if (response.success) {
          setAlumni(response.alumni || [])
        } else {
          setError('Failed to load alumni data')
          // Fallback to sample data
          setAlumni(sampleAlumni.map(a => ({
            ...a,
            full_name: a.name,
            current_position: a.currentPosition,
            current_company: a.company
          })))
        }
      } catch (error) {
        console.error('Error fetching alumni:', error)
        setError('Failed to connect to server')
        // Fallback to sample data
        setAlumni(sampleAlumni.map(a => ({
          ...a,
          full_name: a.name,
          current_position: a.currentPosition,
          current_company: a.company
        })))
      } finally {
        setLoading(false)
      }
    }
    
    fetchAlumni()
  }, [])

  // Get unique values for filters from actual data
  const departments = [...new Set(alumni.map(alumni => alumni.department))].filter(Boolean)
  const years = [...new Set(alumni.map(alumni => alumni.graduation_year))].sort((a, b) => b - a).filter(Boolean)
  const locations = [...new Set(alumni.map(alumni => {
    if (alumni.location) {
      return alumni.location.split(',')[1]?.trim() || alumni.location
    }
    return null
  }))].filter(Boolean)

  // Filter alumni based on search and filters
  const filteredAlumni = useMemo(() => {
    return alumni.filter(alumniItem => {
      const name = alumniItem.full_name || alumniItem.name || `${alumniItem.first_name || ''} ${alumniItem.last_name || ''}`.trim()
      const company = alumniItem.current_company || alumniItem.company || ''
      const position = alumniItem.current_position || alumniItem.currentPosition || ''
      const skills = alumniItem.skills ? (Array.isArray(alumniItem.skills) ? alumniItem.skills : JSON.parse(alumniItem.skills || '[]')) : []
      
      const matchesSearch = searchTerm === '' ||
                           name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDepartment = selectedDepartment === 'all' || alumniItem.department === selectedDepartment
      const matchesYear = selectedYear === 'all' || alumniItem.graduation_year?.toString() === selectedYear || alumniItem.graduationYear?.toString() === selectedYear
      const matchesLocation = selectedLocation === 'all' || (alumniItem.location && alumniItem.location.includes(selectedLocation))

      return matchesSearch && matchesDepartment && matchesYear && matchesLocation
    })
  }, [alumni, searchTerm, selectedDepartment, selectedYear, selectedLocation])

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
            {loading ? 'Loading alumni...' : `Connect with ${filteredAlumni.length} alumni from your network`}
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
              Showing {filteredAlumni.length} of {alumni.length} alumni
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading alumni directory...</p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="text-center py-6">
            <div className="text-red-600 mb-2">{error}</div>
            <p className="text-sm text-gray-600">Using sample data for demonstration</p>
          </CardContent>
        </Card>
      )}

      {/* Alumni Grid/List */}
      {!loading && (viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumniItem) => {
            const name = alumniItem.full_name || alumniItem.name || `${alumniItem.first_name || ''} ${alumniItem.last_name || ''}`.trim()
            const company = alumniItem.current_company || alumniItem.company || ''
            const position = alumniItem.current_position || alumniItem.currentPosition || ''
            const skills = alumniItem.skills ? (Array.isArray(alumniItem.skills) ? alumniItem.skills : JSON.parse(alumniItem.skills || '[]')) : []
            const year = alumniItem.graduation_year || alumniItem.graduationYear
            const isMentor = alumniItem.is_mentor || alumniItem.isAvailableForMentoring
            
            return (
            <Card key={alumniItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={alumniItem.profile_image || alumniItem.profileImage} />
                  <AvatarFallback className="text-lg">
                    {name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'AL'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>
                  {position} {company && `at ${company}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  {alumniItem.department} • Class of {year}
                </div>
                {alumniItem.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {alumniItem.location}
                  </div>
                )}
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Mentoring Badge */}
                {isMentor && (
                  <Badge className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Available for Mentoring
                  </Badge>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link to={`/profile/${alumniItem.id}`} className="flex-1">
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
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlumni.map((alumniItem) => {
            const name = alumniItem.full_name || alumniItem.name || `${alumniItem.first_name || ''} ${alumniItem.last_name || ''}`.trim()
            const company = alumniItem.current_company || alumniItem.company || ''
            const position = alumniItem.current_position || alumniItem.currentPosition || ''
            const skills = alumniItem.skills ? (Array.isArray(alumniItem.skills) ? alumniItem.skills : JSON.parse(alumniItem.skills || '[]')) : []
            const year = alumniItem.graduation_year || alumniItem.graduationYear
            const isMentor = alumniItem.is_mentor || alumniItem.isAvailableForMentoring

            return (
            <Card key={alumniItem.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={alumniItem.profile_image || alumniItem.profileImage} />
                    <AvatarFallback className="text-lg">
                      {name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'AL'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {name}
                      </h3>
                      {isMentor && (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="h-3 w-3 mr-1" />
                          Mentoring
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {position} {company && `at ${company}`}
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {alumniItem.department} • Class of {year}
                      </div>
                      {alumniItem.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {alumniItem.location}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{skills.length - 5} more
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {alumniItem.bio}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link to={`/profile/${alumniItem.id}`}>
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
            )
          })}
        </div>
      ))}

      {/* No Results */}
      {!loading && filteredAlumni.length === 0 && (
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

