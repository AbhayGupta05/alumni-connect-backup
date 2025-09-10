# Alumni Management Platform

A comprehensive full-stack web application that connects alumni with their university community, providing features for networking, event management, career opportunities, and more.

## 🎯 Features

### Core Features
- **Alumni Directory**: Search and filter alumni by department, graduation year, location, and skills
- **Event Management**: Create, browse, and register for alumni events (reunions, networking, workshops)
- **Messaging System**: Direct messaging between alumni members
- **Career Networking**: Job postings and application system
- **Academic Legacy**: Projects and academic contributions
- **Admin Dashboard**: Analytics and management tools for administrators
- **Donation Campaigns**: Fundraising campaigns for university projects

### User Roles
- **Alumni**: Browse directory, attend events, network with peers, post/apply for jobs
- **Administrators**: Manage users, create events, oversee campaigns, access analytics

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Radix UI
- **Backend**: Flask (Python), SQLAlchemy
- **Database**: SQLite (development), PostgreSQL (production)
- **Deployment**: Vercel with serverless functions
- **Authentication**: Session-based with Flask sessions

### Project Structure
```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components and pages
│   │   ├── data/           # Sample data
│   │   ├── utils/          # API client and utilities
│   │   └── lib/            # Utility functions
│   ├── package.json
│   └── vite.config.js
├── api/                     # Flask backend
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route handlers
│   │   ├── utils/          # Backend utilities
│   │   └── index.py        # Main Flask application
│   └── requirements.txt
├── vercel.json             # Deployment configuration
├── WARP.md                 # Warp AI guidance file
├── start-backend.bat       # Backend startup script
└── start-frontend.bat      # Frontend startup script
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alumni-project-updated-file
   ```

2. **Install backend dependencies**
   ```bash
   cd api
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development Setup

#### Option 1: Using Batch Scripts (Windows)
- Double-click `start-backend.bat` to start the Flask server
- Double-click `start-frontend.bat` to start the React development server

#### Option 2: Manual Start

**Start Backend (Terminal 1):**
```bash
cd api
python -m flask --app src.index run --debug --host=0.0.0.0 --port=5000
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 👥 Demo Accounts

### Alumni Account
- **Email**: demo@gmail.com
- **Password**: 1234

### Administrator Account
- **Email**: admin@gmail.com
- **Password**: admin1234

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Alumni Endpoints
- `GET /api/alumni` - Get all alumni with filtering
- `GET /api/alumni/{id}` - Get specific alumni profile
- `PUT /api/alumni/{id}` - Update alumni profile
- `POST /api/alumni/search` - Advanced alumni search

### Events Endpoints
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get specific event
- `POST /api/events/{id}/register` - Register for event
- `DELETE /api/events/{id}/unregister` - Unregister from event

### Jobs Endpoints
- `GET /api/jobs` - Get job listings
- `POST /api/jobs` - Post new job
- `GET /api/jobs/{id}` - Get specific job
- `POST /api/jobs/{id}/apply` - Apply for job

### Messages Endpoints
- `GET /api/messages` - Get user conversations
- `POST /api/messages` - Send message
- `GET /api/messages/conversation/{id}` - Get conversation with user

### Forum Endpoints
- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create forum post
- `POST /api/forum/posts/{id}/like` - Like forum post

### Donations Endpoints
- `GET /api/campaigns` - Get donation campaigns
- `POST /api/campaigns` - Create campaign (admin only)
- `POST /api/donate` - Make donation

## 🎨 Frontend Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts and navigation
- Touch-friendly interface elements

### UI Components
- Radix UI primitives for accessibility
- Custom design system with consistent theming
- Loading states and error handling
- Animated transitions and interactions

### State Management
- React hooks for local state management
- API client with error handling
- Form validation and submission
- Real-time data updates

## 🗄️ Database Schema

### Users Table
- Basic user information and authentication

### Alumni Table
- Extended profile information for alumni
- Career details, skills, and preferences
- Mentorship availability

### Events Table
- Event information and management
- Registration tracking and limits
- Virtual and physical event support

### Jobs Table
- Job postings and applications
- Salary ranges and requirements
- Application status tracking

### Messages Table
- Direct messaging between users
- Forum posts and discussions
- Notification system

### Donations Table
- Campaign management
- Donation tracking and analytics
- Anonymous donation support

## 🚀 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root
3. Follow the deployment prompts
4. Set environment variables in Vercel dashboard

### Environment Variables
- `SECRET_KEY`: Flask secret key
- `DATABASE_URL`: PostgreSQL connection string (production)
- `POSTGRES_URL`: Vercel PostgreSQL URL

## 🛠️ Development

### Adding New Features
1. Create database models in `api/src/models/`
2. Add API routes in `api/src/routes/`
3. Register blueprints in `api/src/index.py`
4. Create frontend components in `frontend/src/components/`
5. Update API client in `frontend/src/utils/api.js`

### Code Style
- Python: Follow PEP 8 guidelines
- JavaScript: Use ESLint configuration
- CSS: Tailwind utility classes with custom components

### Testing
- Backend: Use pytest for API testing
- Frontend: Use Vitest for component testing
- End-to-end: Use Playwright for integration testing

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://radix-ui.com/)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- PostgreSQL dependency may need adjustment for different environments
- File upload functionality not yet implemented
- Email notifications pending SMTP configuration
- Real-time messaging requires WebSocket implementation

## 🔮 Future Enhancements

- [ ] Real-time chat with WebSocket
- [ ] File upload for profiles and resumes
- [ ] Email notification system
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] Integration with LinkedIn API
- [ ] Multi-language support
- [ ] Push notifications

---

**Built with ❤️ by AI Assistant**

For questions or support, please open an issue in the repository.
