# Review Doors Documentation

## Overview

A full-stack web application for managing company listings and reviews. Users can register, login, add companies, and write reviews for companies. The application provides a platform for users to discover and evaluate companies based on community reviews.

## Features

- **User Authentication**: Registration and login system with JWT tokens
- **Company Management**: Add and view company listings with details
- **Review System**: Write and view reviews for companies with star ratings
- **Search & Filter**: Filter companies by city and search by name
- **Responsive UI**: Clean and intuitive user interface

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React** with Hooks (useState, useEffect)
- **Axios** for HTTP requests
- **Local Storage** for token persistence

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   ├── companies.js      # Company CRUD operations
│   │   ├── login.js          # User authentication
│   │   ├── review.js         # Review management
│   │   └── users.js          # User management
│   ├── models/
│   │   ├── company.js        # Company schema
│   │   ├── review.js         # Review schema
│   │   └── user.js           # User schema
|   ├── utils/
|   |   ├──config.js          # Environment variables configuration
|   |   ├──logger.js          # Logging errors and messages
|   |   ├──middleware.js      # middlewares
│   ├── app.js                # Express app configuration
│   └── index.js              # Server entry point
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── services/         # API service modules
    │   └── App.jsx           # Main App component
    └── ...
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration
- `GET /api/users` - Get all users (with populated data)

### Companies
- `GET /api/companies` - Get all companies with reviews
- `GET /api/companies/:id` - Get specific company by ID
- `POST /api/companies` - Create new company (authenticated)

### Reviews
- `GET /api/reviews/company/:id` - Get reviews for a specific company
- `POST /api/reviews/company/:id` - Create review for a company (authenticated)

## Data Models

### User
```javascript
{
  username: String (required, unique),
  name: String,
  passwordHash: String,
  companies: [ObjectId], // References to Company
  reviews: [ObjectId]    // References to Review
}
```

### Company
```javascript
{
  company: String (required),
  location: String (required),
  date: Date (required),
  city: String (required),
  user: ObjectId,        // Reference to User
  reviews: [ObjectId]    // References to Review
}
```

### Review
```javascript
{
  name: String (required),
  review: String (required, 5-500 chars),
  rating: Number (required, 1-5),
  user: ObjectId,        // Reference to User
  company: ObjectId,     // Reference to Company
  createdAt: Date
}
```

## Key Features Implementation

### Authentication Flow
1. User registers with username, name, and password
2. Password is hashed using bcrypt before storage
3. User logs in with credentials
4. JWT token is generated and returned
5. Token is stored in localStorage and sent with authenticated requests

### Company Management
- Users can add companies with name, location, founding date, and city
- Companies are displayed in a filterable list
- Each company shows review count and basic information

### Review System
- One review per user per company (enforced by unique index)
- Star rating system (1-5 stars)
- Character limits (5-500 characters)
- Reviews are sorted by creation date (newest first)

### Search and Filtering
- Real-time search by company name
- Filter by city
- Case-insensitive matching

## Component Architecture

### Main Components
- **App.jsx**: Main application component managing state and routing
- **Companies.jsx**: Displays filtered list of companies
- **CompanyReviews.jsx**: Shows company details and reviews
- **Companyform.jsx**: Form for adding new companies
- **Reviewform.jsx**: Form for adding reviews
- **Loginform.jsx**: User login form
- **Signupform.jsx**: User registration form
- **Filter.jsx**: Search and filter controls
- **Togglable.jsx**: Reusable toggle component

### Service Modules
- **companies.js**: Company-related API calls
- **login.js**: Authentication API calls
- **review.js**: Review-related API calls
- **signup.js**: User registration API calls

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Token-based authentication
- **Input Validation**: Required fields and length limits
- **Unique Constraints**: One review per user per company
- **Token Verification**: Middleware for protected routes

## Installation & Setup

### Backend Setup
1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Set environment variables:
   - `MONGODB_URI`: MongoDB connection string
   - `SECRET`: JWT secret key
   - `PORT`: Server port (default: 3001)
4. Start server: `npm start`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Usage Flow

1. **Registration/Login**: Users must register and login to add companies and reviews
2. **Browse Companies**: View all companies with filtering options
3. **Add Company**: Authenticated users can add new companies
4. **View Reviews**: Click on any company to see its reviews
5. **Write Review**: Authenticated users can write one review per company
6. **Search & Filter**: Use search bar and city filter to find specific companies

## Error Handling

- Backend validation for required fields
- Frontend form validation
- JWT token validation
- MongoDB unique constraint handling
- Graceful error messages for users

## Future Enhancements
- Redis Session Management: Replace local storage with Redis for storing user login sessions
  - Implement server-side session storage using Redis
  - Add session expiration and refresh mechanisms
  - Provide better security and session management across devices
- Image upload for companies
- Advanced search filters
- Review editing and deletion
- User profiles and avatars
- Email verification
- Admin panel for content moderation
