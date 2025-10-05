# 🚀 Yummi API Deployment Guide - Render.com

## Overview
This guide will help you deploy the Yummi API to Render.com with PostgreSQL database.

## Prerequisites
- GitHub repository with your code
- Render.com account (sign up with GitHub)
- Cloudinary account for image storage

---

## 📊 Phase 1: Create PostgreSQL Database

### Step 1: Login to Render.com
1. Go to [render.com](https://render.com)
2. Sign in with your GitHub account

### Step 2: Create PostgreSQL Database
1. Click **"New +"** → **"PostgreSQL"**
2. **Name**: `yummi-api-db` (or your preferred name)
3. **Region**: Choose closest to your users
4. **PostgreSQL Version**: `15` (recommended)
5. **Plan**: Free tier is fine for development
6. Click **"Create Database"**

### Step 3: Get Database Connection String
1. Wait for database to be created (2-3 minutes)
2. Go to database dashboard
3. Copy the **"Internal Database URL"** (recommended for Render services)
   - Format: `postgres://username:password@hostname:5432/database`
   - Internal URL is faster and more secure
4. **Alternative**: Use "External Database URL" if you need external access
5. Save this URL - you'll need it for the web service

---

## 🌐 Phase 2: Create Web Service

### Step 4: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `VOSolyanik/project-yummi-api`
3. **Branch**: `main`

### Step 5: Configure Build Settings
- **Name**: `yummi-api` (or your preferred name)
- **Region**: **Same as your database** (important!)
- **Build Command**: `npm install`
- **Start Command**: `npm run build && npm start`

### Step 6: Set Environment Variables
```bash
# Core App Settings
NODE_ENV=production
PORT=10000
JWT_SECRET=your-very-secure-random-string-at-least-32-characters-long

# Database (Use Internal Database URL from Step 3)
DATABASE_URL=postgres://username:password@hostname:5432/database
DB_SSL=true

# CORS (Your Frontend URLs - comma separated)
CORS_ORIGIN=https://your-frontend.netlify.app,https://your-custom-domain.com

# Cloudinary (From your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 7: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Monitor the build logs

---

## ✅ Phase 3: Verify Deployment

### Step 8: Check Deployment Logs
1. Go to your web service dashboard
2. Click **"Logs"** tab
3. Look for success indicators:
   - ✅ `Database authenticated successfully`
   - ✅ `Server running on port 10000`
   - ✅ `Executing (default): SELECT...` (migration logs)

### Step 9: Test API Endpoints
Your API will be available at: `https://your-service-name.onrender.com`

Test these endpoints:
- `GET /api/categories`
- `GET /api/areas`
- `GET /api/ingredients`
- `GET /api/testimonials`

---

## 🔧 Environment Variables Reference

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `DATABASE_URL` | PostgreSQL connection | `postgres://user:pass@host:5432/db` |
| `DB_SSL` | Enable SSL for database | `true` |
| `JWT_SECRET` | JWT signing secret | `your-32-char-secret` |

### Optional Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `CORS_ORIGIN` | Allowed frontend URLs | `https://app.com,https://www.app.com` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `secret123` |

---

## 🐛 Troubleshooting Common Issues

### Build Failures
**Issue**: `npm install` fails
- **Solution**: Check `package.json` dependencies
- **Solution**: Ensure Node version matches `.nvmrc` (18.20.4)

**Issue**: Build timeout
- **Solution**: Remove unnecessary dependencies
- **Solution**: Upgrade to paid plan for more build time

### Database Connection Issues
**Issue**: `getaddrinfo ENOTFOUND` error
- **Solution**: Verify `DATABASE_URL` is correct
- **Solution**: Ensure database and web service are in **same region**
- **Solution**: Use **Internal Database URL**, not External

**Issue**: SSL connection error
- **Solution**: Set `DB_SSL=true` for Render PostgreSQL
- **Solution**: Check database allows SSL connections

### Migration Issues
**Issue**: Migrations fail during build
- **Solution**: Check migration files for syntax errors
- **Solution**: Ensure database exists and is accessible
- **Solution**: Check Sequelize config uses `DATABASE_URL`

### Runtime Issues
**Issue**: Server crashes with memory error
- **Solution**: Free tier has 512MB RAM limit
- **Solution**: Optimize code or upgrade to paid plan

**Issue**: CORS errors from frontend
- **Solution**: Add frontend URL to `CORS_ORIGIN`
- **Solution**: Include both `https://app.com` and `https://www.app.com`

---

## 🔄 Phase 4: Continuous Deployment

### Auto-Deploy Setup
1. In your web service dashboard → **"Settings"**
2. **Auto-Deploy**: `Yes` (deploys on every git push)
3. **Branch**: `main`

### Manual Deploy
1. Go to web service dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🌍 Phase 5: Custom Domain (Optional)

### Step 10: Add Custom Domain
1. In web service dashboard → **"Settings"**
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain: `api.yourdomain.com`
5. Update DNS records as instructed by Render
6. Update `CORS_ORIGIN` environment variable to include new domain

---

## 🧪 Local Testing Before Deploy

Test your build process locally:
```bash
# Install dependencies
npm install

# Test build command (runs migrations + seeding)
npm run build

# Test start command
npm start
```

This simulates exactly what Render will do during deployment.

---

## 📋 Final Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Internal Database URL copied and saved
- [ ] Web service connected to GitHub repository
- [ ] Build command: `npm install`
- [ ] Start command: `npm run build && npm start`
- [ ] All environment variables configured
- [ ] Database and web service in same region
- [ ] `NODE_ENV=production`
- [ ] `DB_SSL=true`
- [ ] `JWT_SECRET` is secure (32+ characters)
- [ ] `CORS_ORIGIN` includes frontend URLs
- [ ] Cloudinary credentials are correct
- [ ] Auto-deploy enabled
- [ ] API endpoints tested and working

---

## 🎉 Success!

Your Yummi API should now be live at:
`https://your-service-name.onrender.com`

**Database Features Available:**
- ✅ User authentication & JWT
- ✅ Recipe CRUD operations
- ✅ Categories, Areas, Ingredients
- ✅ User favorites & follows
- ✅ File uploads via Cloudinary
- ✅ Testimonials
- ✅ Swagger API documentation

---

## 📞 Support

If you encounter issues:
1. Check Render logs first
2. Review this troubleshooting guide
3. Verify all environment variables
4. Test locally with same commands
5. Check Render status page for outages

**Happy deploying! 🚀**