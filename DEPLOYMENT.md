# Full Stack Deployment Guide

## Option 1: Docker (Local/VPS)

Deploy everything with one command:
```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost
- Backend API: http://localhost:8080/api
- MySQL: localhost:3306

## Option 2: Railway (Recommended - Free Tier Available)

### Deploy Backend + Database:
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add MySQL database from Railway
5. Set environment variables:
   - `SPRING_DATASOURCE_URL`: (from Railway MySQL)
   - `SPRING_DATASOURCE_USERNAME`: (from Railway MySQL)
   - `SPRING_DATASOURCE_PASSWORD`: (from Railway MySQL)
6. Copy your backend URL

### Deploy Frontend on Vercel:
1. Run: `vercel`
2. Update API URLs in frontend to Railway backend URL

## Option 3: Render

### Backend:
1. Go to https://render.com
2. New Web Service → Connect repo
3. Root Directory: `backend`
4. Build: `mvn clean package`
5. Start: `java -jar target/agrilink-backend-1.0.0.jar`
6. Add MySQL database

### Frontend:
1. New Static Site → Connect repo
2. Publish directory: `/`

## Option 4: AWS

### Backend: Elastic Beanstalk
```bash
cd backend
mvn clean package
# Upload JAR to Elastic Beanstalk
```

### Frontend: S3 + CloudFront
```bash
aws s3 sync . s3://your-bucket --exclude "backend/*"
```

### Database: RDS MySQL

## Quick Start (Docker)
```bash
docker-compose up -d
```
