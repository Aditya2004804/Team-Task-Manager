# Team Task Manager - Architecture Overview

## System Design

The Team Task Manager is a full-stack web application built with:
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │
        ┌────────────▼────────────┐
        │   React Frontend        │
        │  (Vite - Port 5173)     │
        ├────────────────────────┤
        │ • Pages (Login, etc)   │
        │ • Components           │
        │ • Auth Context         │
        │ • API Client (Axios)   │
        │ • Tailwind CSS         │
        └────────────┬───────────┘
                     │ REST API
                     │
        ┌────────────▼────────────┐
        │  Express.js Backend     │
        │  (Node - Port 5000)     │
        ├────────────────────────┤
        │ • Auth Routes          │
        │ • Project Routes       │
        │ • Task Routes          │
        │ • JWT Middleware       │
        │ • CORS Enabled         │
        └────────────┬───────────┘
                     │ Driver
                     │
        ┌────────────▼────────────┐
        │      MongoDB            │
        │   (Cloud or Local)      │
        ├────────────────────────┤
        │ • Users Collection     │
        │ • Projects Collection  │
        │ • Tasks Collection     │
        └────────────────────────┘
```

## Frontend Architecture

### Directory Structure

```
frontend/src/
├── pages/                 # Page components (route-based)
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   └── ProjectDetail.tsx
│
├── components/            # Reusable UI components
│   ├── Layout.tsx        # Main layout wrapper with navbar
│   ├── common/
│   └── forms/
│
├── context/              # React Context
│   └── AuthContext.tsx   # Authentication state management
│
├── services/             # API client
│   └── api.ts           # Axios instance with interceptors
│
├── hooks/                # Custom React hooks
│   └── useApi.ts        # API call state management
│
├── types/                # TypeScript definitions
│   └── index.ts         # User, Project, Task, Auth types
│
├── App.tsx              # Router setup
├── main.tsx             # React DOM render
└── index.css            # Global Tailwind styles
```

### Key Components

**Layout Component**
- Navigation bar with logout
- Mobile responsive menu
- User name display
- Protected route wrapper

**Authentication Pages**
- Login form with email/password
- Signup form with name field
- Error handling and validation
- Token storage in localStorage

**Dashboard Page**
- Statistics cards (projects, tasks, completed, overdue)
- Recent projects list
- Recent tasks list
- Quick navigation links

**Projects Page**
- Create new project form
- Projects grid view
- Delete project functionality
- Link to project details

**Project Detail Page**
- Kanban-style task board (To Do, In Progress, Completed)
- Task creation form (admin only)
- Task management (move, delete)
- Team members list (admin view)
- Responsive layout for mobile

### State Management

- **AuthContext**: Manages user authentication state and login/logout
- **Component State**: Local component state for forms and UI
- **API Service**: Centralized API client with token injection

### Styling

- **Tailwind CSS v4**: Utility-first CSS framework
- **Custom Colors**: Primary (blue), secondary (purple), status colors
- **Responsive Design**: Mobile-first approach with md/lg breakpoints
- **Reusable Classes**: Consistent spacing, sizing, and typography

## Backend Architecture

### Directory Structure

```
backend/src/
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── projectController.js
│   ├── taskController.js
│   └── dashboardController.js
│
├── routes/              # Express route definitions
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── dashboardRoutes.js
│
├── middleware/          # Express middleware
│   └── auth.js         # JWT verification
│
└── server.js           # Express app setup
```

### Database Models

**User Model**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Project Model**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  admin: String (User ID),
  members: [{
    userId: String,
    role: 'admin' | 'member',
    joinedAt: Date
  }],
  tasks: [ObjectId], // Task IDs
  createdAt: Date,
  updatedAt: Date
}
```

**Task Model**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  projectId: ObjectId,
  assignedTo: String (User ID),
  status: 'todo' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  dueDate: Date (optional),
  createdBy: String (User ID),
  createdAt: Date,
  updatedAt: Date
}
```

### API Routes

```
POST   /api/auth/signup              Create user account
POST   /api/auth/login               Authenticate user
GET    /api/auth/me                  Get current user (auth required)

GET    /api/projects                 Get user's projects (auth required)
GET    /api/projects/:id             Get specific project (auth required)
POST   /api/projects                 Create new project (auth required)
PUT    /api/projects/:id             Update project (admin required)
DELETE /api/projects/:id             Delete project (admin required)

POST   /api/projects/:id/members     Add team member (admin required)
DELETE /api/projects/:id/members/:userId  Remove member (admin required)
PUT    /api/projects/:id/members/:userId  Update member role (admin required)

GET    /api/projects/:projectId/tasks     Get project tasks (auth required)
GET    /api/projects/:projectId/tasks/:taskId  Get specific task (auth required)
POST   /api/projects/:projectId/tasks     Create task (admin required)
PUT    /api/projects/:projectId/tasks/:taskId  Update task (auth required)
DELETE /api/projects/:projectId/tasks/:taskId  Delete task (admin required)

GET    /api/dashboard/stats          Get dashboard statistics (auth required)
```

### Authentication Flow

1. **Signup**
   - User provides email, password, name
   - Password hashed with bcryptjs
   - User created in database
   - JWT token generated and returned

2. **Login**
   - User provides email and password
   - Email looked up in database
   - Password compared with stored hash
   - JWT token generated and returned

3. **Protected Routes**
   - Token sent in Authorization header
   - Auth middleware verifies token
   - User ID extracted from token payload
   - Request proceeds with user context

### Authorization

**Admin Permissions**
- Create, update, delete projects
- Add/remove/update project members
- Create, update, delete tasks

**Member Permissions**
- View assigned projects
- Update own task status
- View project details and tasks

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Tokens**: Signed tokens with 7-day expiration
3. **CORS**: Configured for frontend origin
4. **Input Validation**: Email and password format checks
5. **Access Control**: Role-based authorization checks
6. **Secure Headers**: Standard security headers

## Data Flow Examples

### Creating a Task

1. Admin opens ProjectDetail page
2. Fills task form and submits
3. Frontend sends POST to `/api/projects/:projectId/tasks`
4. Backend verifies:
   - User is authenticated (JWT valid)
   - User is project admin
   - Project exists
5. Creates Task document in MongoDB
6. Adds task ID to Project.tasks array
7. Returns created task to frontend
8. Frontend updates local task list
9. UI updates immediately (Kanban board)

### Updating Task Status

1. Member sees task in "To Do" column
2. Clicks "Start" button on task
3. Frontend sends PUT to `/api/projects/:projectId/tasks/:taskId`
4. Request body: `{ status: 'in-progress' }`
5. Backend verifies:
   - User is authenticated
   - User has access to project
   - Task belongs to project
6. Updates Task.status in MongoDB
7. Returns updated task
8. Frontend updates local state
9. Task card moves to "In Progress" column

## Performance Considerations

1. **Frontend**
   - Vite for fast bundling and HMR
   - React component memoization opportunities
   - Lazy loading of routes (future enhancement)
   - Efficient re-renders with React hooks

2. **Backend**
   - Mongoose query optimization
   - Indexing on frequently searched fields
   - Connection pooling for MongoDB
   - Error handling and logging

3. **Database**
   - User index on email field
   - Project index on admin field
   - Task index on projectId and assignedTo
   - Lean queries where possible

## Scalability

### Current Limitations
- Single MongoDB instance
- Single Node.js server
- No caching layer
- No async job queue

### Future Improvements
- Redis for caching
- Load balancing for multiple Node instances
- Message queue for background jobs
- Database read replicas
- CDN for static assets
- WebSocket for real-time updates

## Testing Strategy

### Frontend Tests (Future)
- Component testing with Vitest
- Integration testing with React Testing Library
- E2E testing with Cypress/Playwright

### Backend Tests (Future)
- Unit tests for controllers
- Integration tests for routes
- Database tests with MongoDB test containers
- JWT and auth tests

### Manual Testing
- User signup and login flow
- Project CRUD operations
- Task management workflow
- Role-based access control
- Error handling and edge cases

## Deployment Architecture

### Development
- Frontend: Vite dev server (hot reload)
- Backend: Nodemon (auto-restart)
- Database: Local MongoDB or Atlas

### Production (Railway)
- Frontend: Static site (React build)
- Backend: Node.js container
- Database: MongoDB Atlas

### Environment Configuration
- Development: localhost URLs
- Production: Railway public URLs
- Environment variables for configuration

## Error Handling

### Frontend
- Try-catch blocks in async operations
- User-friendly error messages
- Form validation with feedback
- Network error handling

### Backend
- Express error middleware
- Validation error responses
- Proper HTTP status codes
- Detailed error logging

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live updates
   - Notifications for task changes
   - Activity feed

2. **Advanced Task Management**
   - Task comments and discussions
   - File attachments
   - Subtasks
   - Time tracking

3. **Collaboration Features**
   - User mentions and notifications
   - Activity history
   - Audit logs

4. **Analytics**
   - Team productivity metrics
   - Task completion trends
   - Time-based analytics

5. **Integration**
   - Calendar integration
   - Email notifications
   - Slack/Teams integration
   - Webhook support

## Conclusion

The Team Task Manager demonstrates a modern full-stack architecture with:
- Clear separation of concerns
- Type-safe TypeScript implementation
- Secure authentication and authorization
- Scalable design patterns
- Production-ready deployment strategy

The architecture supports rapid development while maintaining code quality and security best practices.
