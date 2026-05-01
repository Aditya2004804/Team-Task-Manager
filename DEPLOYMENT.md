# Deployment Guide - Team Task Manager

This guide covers deploying the Team Task Manager application to Railway.

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository with the code
- MongoDB Atlas account for database (https://www.mongodb.com/cloud/atlas)

## Step 1: Setup MongoDB Atlas

1. Create a MongoDB Atlas account and cluster
2. Create a database user with a password
3. Whitelist your Railway IP (allow all 0.0.0.0/0 for development)
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-manager`

## Step 2: Create Railway Projects

### Backend Service

1. Go to Railway.app and create a new project
2. Connect your GitHub repository
3. Select the repository with the code
4. Create a new service for the backend

**Backend Environment Variables:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production
```

**Build Configuration:**
- Root Directory: `backend`
- Start Command: `npm start`
- Install Command: `npm install`

### Frontend Service

1. Create another service in the same Railway project
2. Connect the same GitHub repository

**Frontend Environment Variables:**
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Build Configuration:**
- Root Directory: `frontend`
- Build Command: `npm run build`
- Start Command: `npm run preview` (or configure static site serving)
- Install Command: `npm install`

## Step 3: Configure Railway Settings

### For Backend:
1. Set port to 5000 (Railway will assign a public port)
2. Keep Node.js version at default (v18+)
3. Deploy

### For Frontend:
1. Railway will automatically detect it's a static site (Vite)
2. Configure to serve the `dist` folder
3. Update the `VITE_API_URL` with the actual backend URL
4. Deploy

## Step 4: Generate Public URLs

After deployment:
1. Get your backend public URL from Railway dashboard
2. Update frontend's `VITE_API_URL` environment variable
3. Redeploy frontend
4. Get your frontend public URL

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Sign up with a test account
3. Create a project
4. Create and assign tasks
5. Test all features

## Troubleshooting

### MongoDB Connection Error
- Check connection string in backend environment variables
- Ensure IP whitelist includes Railway IPs
- Test connection locally first

### CORS Issues
- Ensure backend has CORS enabled (already configured in code)
- Check that frontend URL matches allowed origins
- Verify `VITE_API_URL` points to correct backend

### Frontend Shows 404
- Ensure frontend is configured as static site
- Check that build command ran successfully
- Verify `dist` folder contains `index.html`

### Tasks Not Appearing
- Check MongoDB connection is working
- Verify backend logs for errors
- Ensure authenticated requests are working

## Environment Variable Reference

### Backend (.env)
```
PORT=5000                          # Server port
MONGODB_URI=<connection_string>    # MongoDB connection URL
JWT_SECRET=<secret_key>            # JWT signing secret (use strong value)
NODE_ENV=production                # Environment
```

### Frontend (.env)
```
VITE_API_URL=<backend_url>/api     # Backend API base URL
```

## Monitoring

Railway provides built-in monitoring:
- View logs: Dashboard → Service → Logs
- Check deployments: Dashboard → Deployments
- Monitor resource usage: Dashboard → Metrics

## Scaling

For production:
1. Upgrade Railway plan if needed
2. Configure auto-scaling for backend
3. Use CDN for frontend assets (optional)
4. Enable MongoDB backups in Atlas

## Security Recommendations

1. Use strong JWT_SECRET (at least 32 characters)
2. Enable MongoDB authentication
3. Use HTTPS (automatic with Railway)
4. Regularly rotate secrets
5. Implement rate limiting (future enhancement)
6. Add input validation (already implemented)

## Rollback

To rollback to a previous deployment:
1. Go to Railway dashboard
2. Select your service
3. Go to Deployments
4. Click "Revert" on the previous deployment

## Custom Domain

To add a custom domain:
1. In Railway, go to your service settings
2. Add your domain under "Domain"
3. Update DNS records as instructed
4. Wait for DNS propagation

## Support

For Railway-specific issues, visit Railway documentation:
https://docs.railway.app

For application issues, check the logs and error messages in the Railway dashboard.

## Environment Variable Encryption

Railway automatically encrypts all environment variables. You can view and edit them in the Railway dashboard under your service settings.

## Deployment Success Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Backend deployed to Railway with correct env vars
- [ ] Frontend deployed to Railway with correct API URL
- [ ] Can sign up and create account
- [ ] Can create new project
- [ ] Can create and assign tasks
- [ ] Can view dashboard with statistics
- [ ] Task status updates work
- [ ] Role-based access control working
- [ ] Frontend and backend communicate properly
