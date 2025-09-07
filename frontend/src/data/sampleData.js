// Sample alumni data for the demo
export const sampleAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    graduationYear: 2018,
    degree: "Computer Science",
    department: "Engineering",
    currentPosition: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/sarahjohnson",
    bio: "Passionate software engineer with 6+ years of experience in full-stack development. Currently working on cloud infrastructure at Google.",
    skills: ["JavaScript", "Python", "React", "Node.js", "AWS"],
    interests: ["Technology", "Mentoring", "Travel"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: true,
    lastActive: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    graduationYear: 2015,
    degree: "Business Administration",
    department: "Business",
    currentPosition: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    linkedin: "linkedin.com/in/michaelchen",
    bio: "Product management professional with expertise in enterprise software and user experience design.",
    skills: ["Product Management", "UX Design", "Data Analysis", "Agile"],
    interests: ["Product Strategy", "Innovation", "Basketball"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: true,
    lastActive: "2024-01-14"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    graduationYear: 2020,
    degree: "Marketing",
    department: "Business",
    currentPosition: "Digital Marketing Manager",
    company: "Adobe",
    location: "Austin, TX",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    linkedin: "linkedin.com/in/emilyrodriguez",
    bio: "Creative marketing professional specializing in digital campaigns and brand strategy.",
    skills: ["Digital Marketing", "Content Strategy", "SEO", "Social Media"],
    interests: ["Creative Writing", "Photography", "Yoga"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: false,
    lastActive: "2024-01-13"
  },
  {
    id: 4,
    name: "David Thompson",
    graduationYear: 2012,
    degree: "Mechanical Engineering",
    department: "Engineering",
    currentPosition: "Engineering Director",
    company: "Tesla",
    location: "Palo Alto, CA",
    email: "david.thompson@email.com",
    phone: "+1 (555) 456-7890",
    linkedin: "linkedin.com/in/davidthompson",
    bio: "Experienced engineering leader with a focus on sustainable technology and electric vehicles.",
    skills: ["Mechanical Engineering", "Team Leadership", "Product Development", "CAD"],
    interests: ["Sustainability", "Electric Vehicles", "Hiking"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: true,
    lastActive: "2024-01-12"
  },
  {
    id: 5,
    name: "Lisa Wang",
    graduationYear: 2019,
    degree: "Data Science",
    department: "Computer Science",
    currentPosition: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 567-8901",
    linkedin: "linkedin.com/in/lisawang",
    bio: "Data scientist passionate about machine learning and recommendation systems.",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    interests: ["AI/ML", "Data Visualization", "Cooking"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: true,
    lastActive: "2024-01-11"
  },
  {
    id: 6,
    name: "James Wilson",
    graduationYear: 2016,
    degree: "Finance",
    department: "Business",
    currentPosition: "Investment Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    email: "james.wilson@email.com",
    phone: "+1 (555) 678-9012",
    linkedin: "linkedin.com/in/jameswilson",
    bio: "Finance professional with expertise in investment analysis and portfolio management.",
    skills: ["Financial Analysis", "Investment Strategy", "Risk Management", "Excel"],
    interests: ["Finance", "Economics", "Tennis"],
    profileImage: "/api/placeholder/150/150",
    isAvailableForMentoring: false,
    lastActive: "2024-01-10"
  }
]

// Sample events data
export const sampleEvents = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2024",
    date: "2024-06-15",
    time: "18:00",
    location: "University Campus - Main Hall",
    description: "Join us for our annual reunion celebration with dinner, networking, and campus tours.",
    category: "Reunion",
    attendees: 156,
    maxAttendees: 200,
    isRegistered: false,
    image: "/api/placeholder/400/200"
  },
  {
    id: 2,
    title: "Tech Industry Networking Night",
    date: "2024-03-22",
    time: "19:00",
    location: "San Francisco - Tech Hub",
    description: "Connect with fellow alumni working in the tech industry. Featuring guest speakers from major tech companies.",
    category: "Networking",
    attendees: 89,
    maxAttendees: 100,
    isRegistered: true,
    image: "/api/placeholder/400/200"
  },
  {
    id: 3,
    title: "Career Development Workshop",
    date: "2024-04-10",
    time: "14:00",
    location: "Virtual Event",
    description: "Learn about career advancement strategies, resume building, and interview techniques.",
    category: "Workshop",
    attendees: 234,
    maxAttendees: 300,
    isRegistered: false,
    image: "/api/placeholder/400/200"
  },
  {
    id: 4,
    title: "Alumni Mentorship Program Launch",
    date: "2024-05-05",
    time: "16:00",
    location: "University Campus - Student Center",
    description: "Launch event for our new mentorship program connecting alumni with current students.",
    category: "Mentorship",
    attendees: 67,
    maxAttendees: 150,
    isRegistered: true,
    image: "/api/placeholder/400/200"
  }
]

// Sample messages data
export const sampleMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    subject: "Mentorship Opportunity",
    preview: "Hi! I saw your profile and would love to discuss potential mentorship opportunities...",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    sender: "Alumni Association",
    subject: "Upcoming Tech Networking Event",
    preview: "Don't miss our upcoming tech networking event on March 22nd. Register now...",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    sender: "Michael Chen",
    subject: "Product Management Discussion",
    preview: "Thanks for connecting! I'd love to chat about product management trends...",
    timestamp: "2024-01-13T09:15:00Z",
    isRead: false,
    avatar: "/api/placeholder/40/40"
  }
]

// Sample analytics data for admin dashboard
export const sampleAnalytics = {
  totalAlumni: 2847,
  activeMembers: 1923,
  upcomingEvents: 8,
  totalDonations: 156780,
  monthlyGrowth: 12.5,
  engagementRate: 68.3,
  
  graduationYearDistribution: [
    { year: '2020-2024', count: 456 },
    { year: '2015-2019', count: 789 },
    { year: '2010-2014', count: 623 },
    { year: '2005-2009', count: 445 },
    { year: '2000-2004', count: 334 },
    { year: 'Before 2000', count: 200 }
  ],
  
  departmentDistribution: [
    { department: 'Engineering', count: 892, percentage: 31.3 },
    { department: 'Business', count: 654, percentage: 23.0 },
    { department: 'Arts & Sciences', count: 543, percentage: 19.1 },
    { department: 'Medicine', count: 398, percentage: 14.0 },
    { department: 'Law', count: 234, percentage: 8.2 },
    { department: 'Other', count: 126, percentage: 4.4 }
  ],
  
  locationDistribution: [
    { location: 'California', count: 567 },
    { location: 'New York', count: 423 },
    { location: 'Texas', count: 389 },
    { location: 'Washington', count: 234 },
    { location: 'Massachusetts', count: 198 },
    { location: 'Other', count: 1036 }
  ],
  
  monthlyEngagement: [
    { month: 'Jan', logins: 1234, events: 45, messages: 567 },
    { month: 'Feb', logins: 1456, events: 52, messages: 634 },
    { month: 'Mar', logins: 1678, events: 48, messages: 723 },
    { month: 'Apr', logins: 1543, events: 61, messages: 689 },
    { month: 'May', logins: 1789, events: 55, messages: 756 },
    { month: 'Jun', logins: 1923, events: 67, messages: 834 }
  ]
}

