# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Alumni Management Platform - a full-stack web application that connects alumni with their university community. The platform provides features for alumni directory, event management, messaging, career networking, academic legacy projects, and administrative tools.

## Architecture

### Tech Stack
- **Frontend**: React 18 with Vite, React Router, Tailwind CSS, Radix UI components
- **Backend**: Flask (Python) with Flask-CORS
- **Deployment**: Vercel with serverless functions
- **State Management**: React hooks with local state
- **UI Framework**: Tailwind CSS with custom design system using CSS variables

### Project Structure
```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components (pages and reusable UI)
│   │   ├── data/           # Sample data and mock data
│   │   ├── utils/          # API client and utilities
│   │   ├── lib/            # Utility functions (Tailwind merge)
│   │   └── assets/         # Static assets
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── api/                    # Flask backend
│   ├── src/
│   │   └── index.py       # Main Flask application
│   └── requirements.txt   # Python dependencies
└── vercel.json            # Vercel deployment configuration
```

## Development Commands

### Frontend Development
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend Development
```bash
# Navigate to API directory
cd api

# Install dependencies
pip install -r requirements.txt

# For local development, you'll need to run Flask manually:
# Set FLASK_APP environment variable and run Flask
```

### Full Application Testing
The application is configured for Vercel deployment where:
- Frontend builds to `/frontend/dist`
- Backend runs as serverless function at `/api/src/index.py`
- Routes are configured in `vercel.json` for SPA and API routing

## Application Architecture

### Authentication Flow
The app uses a simple authentication state managed in the main `App.jsx`:
- `isAuthenticated` boolean controls access to main application
- `userType` determines if user sees alumni or admin dashboard
- Landing page allows preview access to feature pages without authentication
- Login/register pages handle authentication flow

### Routing Structure
- **Public routes**: Landing page, login, register, and preview pages
- **Authenticated routes**: Dashboard, profile, messages, and full feature access
- **Role-based rendering**: Admin users see `AdminDashboard`, alumni see standard `Dashboard`

### Component Architecture
- **Layout Components**: `Navbar`, `Sidebar` provide consistent navigation
- **Page Components**: Major features like `Dashboard`, `AlumniDirectory`, `Events`, etc.
- **UI Components**: Located in `components/ui/` following Radix UI patterns
- **Data Flow**: Uses sample data from `data/sampleData.js` for demo purposes

### API Integration
- **API Client**: Centralized in `utils/api.js` using fetch API
- **Endpoints**: Comprehensive REST API design covering auth, alumni, events, messages, jobs, etc.
- **Error Handling**: Built-in error handling with try-catch blocks
- **Authentication**: Uses cookies for session management (`credentials: 'include'`)

### Styling System
- **Tailwind CSS**: Primary styling framework
- **Design Tokens**: CSS variables for colors, spacing, and theming
- **Component Variants**: Using `clsx` and `tailwind-merge` for conditional classes
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Animations**: Custom Tailwind animations for accordion and fade effects

### Key Features
1. **Alumni Directory**: Search and filter alumni by various criteria
2. **Event Management**: Create, browse, and register for alumni events  
3. **Messaging System**: Direct messaging between alumni
4. **Career Networking**: Job postings and career growth resources
5. **Academic Legacy**: Projects and academic contributions
6. **Admin Dashboard**: Analytics and management tools for administrators

## Development Notes

### Sample Data
The application currently uses mock data from `sampleData.js` for demonstration. This includes:
- Alumni profiles with career information
- Events with registration details
- Message threads and conversations
- Analytics data for admin dashboard

### API Endpoints
The `api.js` file defines a comprehensive API interface including:
- Authentication endpoints (`/auth/login`, `/auth/register`)
- Alumni management (`/alumni`, `/alumni/search`)
- Event management (`/events`, `/events/:id/register`)  
- Messaging (`/messages`, `/messages/conversation/:id`)
- Forum and jobs functionality
- Donation and campaign management

### UI Patterns
- Cards for content display using `Card` components
- Avatar system for user profiles
- Badge system for status indicators
- Responsive navigation with collapsible sidebar
- Modal patterns using Radix UI primitives

### Development Workflow
1. Frontend changes: Modify React components in `frontend/src/`
2. Backend changes: Update Flask routes in `api/src/index.py`
3. Styling: Use Tailwind classes, extend in `tailwind.config.js` if needed
4. New features: Add API endpoints in `api.js`, create corresponding UI components
5. Testing: Use preview builds and Vercel deployments for testing

The application is designed for easy development with hot reloading on the frontend and straightforward Flask backend development.
