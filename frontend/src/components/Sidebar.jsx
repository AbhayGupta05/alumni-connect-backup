import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Users, 
  Calendar, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  X,
  UserPlus,
  FileText,
  DollarSign,
  Briefcase,
  GraduationCap,
  Network,
  Hash
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ userType, isOpen, onClose }) => {
  const location = useLocation()

  const alumniNavItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Alumni Directory', path: '/directory' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Hash, label: 'Communication Hub', path: '/communication' },
    { icon: Briefcase, label: 'Career Growth', path: '/career' },
    { icon: GraduationCap, label: 'Academic Legacy', path: '/legacy' },
    { icon: Network, label: 'Networking', path: '/networking' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
  ]

  const adminNavItems = [
    { icon: Home, label: 'Admin Dashboard', path: '/' },
    { icon: Users, label: 'Alumni Directory', path: '/directory' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Hash, label: 'Communication Hub', path: '/communication' },
    { icon: Briefcase, label: 'Career Growth', path: '/career' },
    { icon: GraduationCap, label: 'Academic Legacy', path: '/legacy' },
    { icon: Network, label: 'Networking', path: '/networking' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: UserPlus, label: 'Add Alumni', path: '/add-alumni' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: DollarSign, label: 'Donations', path: '/donations' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const navItems = userType === 'admin' ? adminNavItems : alumniNavItems

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 lg:hidden">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* User type indicator */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                userType === 'admin' 
                  ? "bg-purple-100 text-purple-800" 
                  : "bg-blue-100 text-blue-800"
              )}>
                {userType === 'admin' ? 'Administrator' : 'Alumni Member'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

