# Getting Started with Team Task Manager

## Welcome! 👋

This guide will help you get the Team Task Manager up and running in just a few minutes.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)
- **Git** (optional, for version control)

## Installation Options

### Option 1: Automated Installation (Recommended)

#### On macOS/Linux:
```bash
chmod +x install.sh
./install.sh
```

#### On Windows:
```bash
install.bat
```

This will automatically:
- Install all frontend dependencies
- Install all backend dependencies
- Create `.env` files with default values
- Set up the project structure

### Option 2: Manual Installation

#### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### Step 3: Create Environment Files

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

## Running Locally

### Step 1: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud/atlas)
2. Update `MONGODB_URI` in `backend/.env` with your connection string

### Step 2: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected to: mongodb://localhost:27017/task-manager
```

### Step 3: Start Frontend Server

Open a new terminal and run:
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v8.0.10  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

## First Time Setup

1. **Create an Account**
   - Click "Sign Up"
   - Enter email, password, and name
   - Submit to create your account

2. **Create a Project**
   - Click "Create New Project" on the Projects page
   - Enter project name and description
   - Click "Create"

3. **Add Team Members**
   - Open a project
   - Click "Members" tab
   - Enter team member email and select role (Admin/Member)
   - Click "Add Member"

4. **Create Tasks**
   - In project, click "Create New Task"
   - Enter task title, description, priority, and due date
   - Assign to team member
   - Click "Create"

5. **Track Progress**
   - Drag tasks between columns (Todo → In Progress → Done)
   - Check Dashboard for statistics

## Key Features to Try

### Authentication
- Sign up with new email
- Login with credentials
- Session persists in localStorage

### Project Management
- Create unlimited projects
- Add/remove team members
- Set admin or member roles

### Task Management
- Create tasks with priority
- Assign tasks to team members
- Update task status via drag-and-drop
- Set due dates

### Dashboard
- View statistics (total projects, tasks, completion rate)
- See recent activity
- Track project progress

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running: `mongod`
- Or update `MONGODB_URI` to your MongoDB Atlas connection string
- Check that the connection string is correct in `backend/.env`

### "CORS error in console"
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env` matches backend URL
- Verify CORS is enabled in backend

### "Port 5000 or 5173 already in use"
- Find and kill the process using the port
- Or change the port in `.env` file

### "npm install fails"
- Delete `node_modules` folder and `package-lock.json`
- Clear npm cache: `npm cache clean --force`
- Try installing again: `npm install`

## Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/dist/`

### Build Backend
Backend runs directly from source in production

## Deploying to Railway

1. **Read DEPLOYMENT.md** for detailed Railway instructions
2. **Set up MongoDB Atlas** for production database
3. **Configure environment variables** on Railway
4. **Deploy frontend and backend** separately

## Project Structure

```
team-task-manager/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app with routes
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── backend/               # Express server
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── server.js     # Main server file
│   ├── package.json
│   └── .env
│
├── README.md             # Full documentation
├── QUICKSTART.md         # 5-minute setup
├── DEPLOYMENT.md         # Railway deployment guide
├── ARCHITECTURE.md       # Technical design
└── install.sh / install.bat  # Installation scripts
```

## Available Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start server normally

## Documentation

- **README.md** - Complete project documentation
- **QUICKSTART.md** - 5-minute quick start
- **DEPLOYMENT.md** - Production deployment guide
- **ARCHITECTURE.md** - Technical architecture
- **PROJECT_INDEX.md** - All documentation index

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks` - Get project tasks
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Need Help?

1. **Check the documentation** - Start with README.md
2. **Read QUICKSTART.md** - For quick answers
3. **Check ARCHITECTURE.md** - For technical details
4. **Review console logs** - Look for error messages
5. **Check MongoDB connection** - Verify connection string

## Next Steps

1. ✅ Complete Getting Started (you are here)
2. ⚙️ [Read QUICKSTART.md](QUICKSTART.md) for more details
3. 🚀 [Deploy with DEPLOYMENT.md](DEPLOYMENT.md)
4. 📚 [Understand architecture with ARCHITECTURE.md](ARCHITECTURE.md)

## Tips for Success

- Keep `.env` files safe and never commit them
- Use strong JWT_SECRET in production
- Enable HTTPS when deploying
- Use MongoDB Atlas for production (not local)
- Keep dependencies updated
- Monitor error logs in production

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

**Backend:**
- Express.js for REST API
- MongoDB for database
- Mongoose for data modeling
- JWT for authentication
- Bcryptjs for password hashing

## License

This project is open source and available for educational use.

---

**You're all set! Start building with Team Task Manager.** 🚀

For detailed information, refer to the other documentation files in this project.
