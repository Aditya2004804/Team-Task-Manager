# Quick Start Guide

Get the Team Task Manager running locally in 5 minutes.

## Prerequisites

- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account

## 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd team-task-manager

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## 2. Configure Environment Variables

**Backend (.env)**
```bash
cd backend
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development" > .env
```

**Frontend (.env)**
```bash
cd ../frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## 3. Start MongoDB (if running locally)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

Or use MongoDB Atlas (cloud):
- Create account at https://mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Update `MONGODB_URI` in backend/.env

## 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend at http://localhost:5173
```

## 5. Access the App

1. Open http://localhost:5173 in your browser
2. Sign up with test account:
   - Email: test@example.com
   - Password: password123
   - Name: Test User
3. Create a project
4. Add tasks and manage them

## Common Commands

```bash
# Frontend
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run linter

# Backend
cd backend
npm run dev          # Start with hot reload
npm start            # Start production
npm run test         # Run tests (if configured)
```

## Project Structure

```
project/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── types/
│   └── package.json
│
├── backend/           # Node + Express app
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── README.md          # Full documentation
├── DEPLOYMENT.md      # Deployment guide
└── QUICKSTART.md      # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - List tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## Testing the App

1. **Sign Up**: Create new account
2. **Create Project**: Click "New Project" on Projects page
3. **Create Task**: Go to project and click "New Task"
4. **Assign Task**: Select a team member (yourself initially)
5. **Update Status**: Move task between Todo, In Progress, Completed
6. **View Dashboard**: See overview of all projects and tasks

## Troubleshooting

### Backend connection error
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
- Make sure backend is running: `npm run dev` in backend folder
- Check `VITE_API_URL` in frontend/.env

### MongoDB connection error
```
Error: Failed to connect to MongoDB
```
- Start MongoDB service
- Check connection string in backend/.env
- Ensure MongoDB is running on port 27017

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Kill process: `lsof -ti:5000 | xargs kill -9`
- Or change PORT in backend/.env

### CORS errors in browser console
- Ensure backend is running
- Check `VITE_API_URL` points to correct backend URL
- Backend CORS is configured for all origins in dev

## Next Steps

1. Deploy to Railway (see DEPLOYMENT.md)
2. Add custom styling (update Tailwind config)
3. Implement additional features
4. Set up CI/CD pipeline
5. Add more tests

## Documentation

- Full README: [README.md](./README.md)
- Deployment Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- API Documentation: See README.md API Endpoints section
- Tailwind CSS: https://tailwindcss.com
- React: https://react.dev
- Express: https://expressjs.com

## Support

For issues:
1. Check error message in console/logs
2. Review README.md troubleshooting section
3. Check MongoDB/backend connection
4. Verify environment variables
5. Create GitHub issue if problem persists

Happy coding!
