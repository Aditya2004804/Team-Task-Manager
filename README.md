# Team Task Manager

A full-stack task management application with role-based access control, built with React, Express.js, and MongoDB.

## Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Project Management**: Create and manage projects with team members
- **Task Tracking**: Create, assign, and track task progress
- **Role-Based Access**: Admin and Member roles with appropriate permissions
- **Dashboard**: Overview of projects, tasks, and progress statistics
- **Task Status**: Track tasks through Todo, In Progress, and Completed states

## Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite (build tool)
- React Router v6 (routing)
- Axios (HTTP client)
- Tailwind CSS (styling)
- Lucide React (icons)

### Backend
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` (frontend) and backend at `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Projects
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Project Members
- `POST /api/projects/:id/members` - Add member to project
- `DELETE /api/projects/:id/members/:userId` - Remove member
- `PUT /api/projects/:id/members/:userId` - Update member role

### Tasks
- `GET /api/projects/:projectId/tasks` - Get project tasks
- `GET /api/projects/:projectId/tasks/:taskId` - Get specific task
- `POST /api/projects/:projectId/tasks` - Create new task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## User Roles & Permissions

### Admin
- Create and delete projects
- Add/remove project members
- Create, edit, and delete tasks
- View all project data

### Member
- View assigned projects
- View and update task status
- Cannot create or delete tasks/projects

## Deployment

### Deploy to Railway

1. Create a Railway account and project
2. Connect your GitHub repository
3. Add environment variables in Railway:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT
   - `PORT` - Server port (5000)
   - `VITE_API_URL` - Backend API URL

4. Deploy both frontend and backend services
5. Get your live URLs and test

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main app with routing
│   │   └── main.tsx        # Entry point
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Main server file
│   └── package.json
│
└── README.md
```

## Testing the Application

1. Sign up with a new account
2. Create a project
3. Create tasks within the project
4. Assign tasks to team members
5. Update task status (Todo → In Progress → Completed)
6. View dashboard for statistics

## Demo Video

See the 2-5 minute demo video showing:
- User authentication flow
- Project creation and management
- Task assignment and status tracking
- Role-based access control
- Dashboard statistics

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify `MONGODB_URI` in backend `.env` file

### API Call Errors
- Check if backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env` file
- Check browser console for detailed error messages

### CORS Issues
- Backend CORS is configured to accept requests from frontend
- Check that URLs match in `.env` files

## Future Enhancements

- Real-time updates with WebSockets
- Task comments and activity logs
- File attachments for tasks
- Email notifications
- Advanced filtering and search
- User profile customization
- Mobile app version

## License

ISC

## Support

For issues or questions, please open an issue in the repository or contact the development team.
