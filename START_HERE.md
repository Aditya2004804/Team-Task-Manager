# Team Task Manager - Complete Full-Stack Application

## What You Have

This is a **production-ready full-stack Task Management Application** with:

- **React Frontend** with TypeScript, Tailwind CSS, and responsive design
- **Express Backend** with MongoDB, JWT authentication, and role-based access
- **Complete Documentation** for setup, deployment, and architecture
- **Ready to Deploy** to Railway with included deployment guide

## Quick Start (3 Steps)

### 1️⃣ Install Dependencies

**On macOS/Linux:**
```bash
chmod +x install.sh
./install.sh
```

**On Windows:**
```bash
install.bat
```

**Or manually:**
```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### 2️⃣ Start the Application

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

**Terminal 3 - MongoDB (if running locally):**
```bash
mongod
```

### 3️⃣ Open in Browser

Visit: **http://localhost:5173**

Create an account and start using the application!

## Features Included

✅ **User Authentication**
- Signup/Login with JWT
- Password hashing with bcrypt
- Secure session management

✅ **Project Management**
- Create unlimited projects
- Add/remove team members
- Role-based access (Admin/Member)

✅ **Task Tracking**
- Kanban-style task board
- Priority levels (Low, Medium, High)
- Due dates and assignments
- Status tracking (Todo, In Progress, Done)

✅ **Dashboard**
- Statistics and metrics
- Project overview
- Task completion tracking
- Recent activity

✅ **Responsive Design**
- Mobile, tablet, desktop layouts
- Touch-friendly interface
- Fast and lightweight

## File Structure

```
team-task-manager/
├── frontend/                 # React + TypeScript Application
│   ├── src/
│   │   ├── pages/           # 5 page components
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth context
│   │   ├── services/        # API client
│   │   └── types/           # TypeScript definitions
│   └── package.json
│
├── backend/                  # Express + Node.js Server
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   └── middleware/      # Auth & custom middleware
│   └── package.json
│
├── Documentation Files:
│   ├── START_HERE.md        # This file
│   ├── GETTING_STARTED.md   # Setup guide
│   ├── QUICKSTART.md        # 5-minute quick start
│   ├── DEPLOYMENT.md        # Railway deployment
│   ├── ARCHITECTURE.md      # Technical design
│   ├── README.md            # Full documentation
│   └── PROJECT_INDEX.md     # Documentation index
│
└── Installation Scripts:
    ├── install.sh           # macOS/Linux automation
    └── install.bat          # Windows automation
```

## Documentation Guide

| Document | Purpose | Time |
|----------|---------|------|
| **START_HERE.md** | You are here | 2 min |
| **GETTING_STARTED.md** | Detailed setup instructions | 10 min |
| **QUICKSTART.md** | Quick local development | 5 min |
| **DEPLOYMENT.md** | Deploy to Railway | 15 min |
| **ARCHITECTURE.md** | Technical design & API | 20 min |
| **README.md** | Complete documentation | 30 min |

## Requirements

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Text Editor** (VS Code recommended)
- **Terminal** (command line)

## Environment Variables

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

## API Overview

**19 REST Endpoints** covering:
- Authentication (signup, login)
- Projects (CRUD + member management)
- Tasks (CRUD + status updates)
- Dashboard (statistics)

See **ARCHITECTURE.md** for complete API documentation.

## Deployment to Railway

1. Read **DEPLOYMENT.md** (complete step-by-step guide)
2. Create MongoDB Atlas cluster
3. Set up Railway projects
4. Configure environment variables
5. Deploy backend and frontend

Takes about 20-30 minutes from start to live application.

## Technology Stack

**Frontend:**
- React 18.2.5
- TypeScript 6.0.2
- Vite 8.0.10
- Tailwind CSS 4.2.4
- React Router 7.14.2
- Axios 1.15.2

**Backend:**
- Node.js v18+
- Express.js 5.2.1
- MongoDB 7+
- Mongoose 9.6.1
- JWT 9.0.3
- Bcryptjs 3.0.3

## Getting Help

1. **Setup Issues?** → Read GETTING_STARTED.md
2. **Want to Understand?** → Read ARCHITECTURE.md
3. **Ready to Deploy?** → Read DEPLOYMENT.md
4. **Need Details?** → Read README.md
5. **Lost?** → Check PROJECT_INDEX.md for documentation index

## Common Issues

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `backend/.env`

### Port Already in Use
- Change `PORT` in `backend/.env`
- Change port in `vite.config.ts` for frontend

### Dependencies Installation Fails
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### CORS Errors
- Ensure backend runs on correct port
- Verify `VITE_API_URL` in frontend `.env`

## Next Steps

1. ✅ Extract and read this file
2. 📖 Read GETTING_STARTED.md for setup
3. 🚀 Run installation script (`install.sh` or `install.bat`)
4. 💻 Start frontend and backend servers
5. 🧪 Test locally at http://localhost:5173
6. 🌐 Deploy to Railway using DEPLOYMENT.md

## Database Schema

**Users Collection:**
- Email (unique)
- Password (hashed)
- Name
- Created at

**Projects Collection:**
- Name
- Description
- Owner ID
- Members (with roles)
- Created at

**Tasks Collection:**
- Title
- Description
- Project ID
- Assigned to User ID
- Priority (Low, Medium, High)
- Status (Todo, In Progress, Done)
- Due date
- Created at

## API Example

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"John"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Create Project
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Test"}'
```

## Support & Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **React Docs:** https://react.dev/
- **Express Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/
- **Tailwind Docs:** https://tailwindcss.com/docs/

## Build Information

- **Frontend Build:** ~303KB gzipped
- **Total Files:** 47+
- **Lines of Code:** 3,000+
- **Documentation:** 2,400+ lines
- **Build Date:** May 1, 2026
- **Status:** Production-Ready

## Submission Checklist

For assignment submission, you'll need:

- ✅ This complete source code (you have it)
- ✅ Live URL after Railway deployment
- ✅ GitHub repository link
- ✅ README documentation
- ✅ Demo video (2-5 minutes)

See DEPLOYMENT.md for how to get the live URL.

## License

This project is provided as-is for educational purposes.

---

## Ready to Get Started?

**Next Step:** Read **GETTING_STARTED.md** for detailed setup instructions.

Or jump straight to deployment with **DEPLOYMENT.md** if you want to go live quickly.

**Questions?** Check **PROJECT_INDEX.md** for documentation index and quick answers.

---

**Happy coding! 🚀**
