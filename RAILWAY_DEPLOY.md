# Railway Deployment Guide

## Step 1: Deploy Backend + Database

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your AgriLink-Hub repository
5. Railway will detect the Spring Boot app

## Step 2: Add MySQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will create a MySQL instance

## Step 3: Configure Backend Environment Variables

Click on your backend service → "Variables" tab and add:

```
SPRING_DATASOURCE_URL=${{MySQL.DATABASE_URL}}
SPRING_DATASOURCE_USERNAME=${{MySQL.MYSQLUSER}}
SPRING_DATASOURCE_PASSWORD=${{MySQL.MYSQLPASSWORD}}
```

Railway will automatically replace these with actual MySQL values.

## Step 4: Set Root Directory

1. Click backend service → "Settings"
2. Set "Root Directory" to: `backend`
3. Build Command: `mvn clean package`
4. Start Command: `java -jar target/agrilink-backend-1.0.0.jar`

## Step 5: Deploy Frontend

### Option A: Railway (Same Project)
1. Click "New" → "Empty Service"
2. Connect same GitHub repo
3. Set Root Directory to: `/` (root)
4. Deploy as static site

### Option B: Vercel (Recommended for Frontend)
1. Run: `vercel`
2. Deploy frontend to Vercel
3. Update API URLs in your frontend files to Railway backend URL

## Step 6: Update Frontend API URLs

After backend is deployed, Railway will give you a URL like:
`https://your-app.railway.app`

Update these files with your Railway backend URL:
- `script.js`
- `auth-check.js`

Replace `http://localhost:8080` with `https://your-app.railway.app`

## Done!

Your app will be live at:
- Backend: `https://your-backend.railway.app`
- Frontend: `https://your-frontend.vercel.app` or Railway URL
