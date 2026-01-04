# EvaraTDS Deployment Guide

This guide explains how to deploy EvaraTDS on Vercel in different configurations.

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Account** - For repository connection
3. **Supabase Project** - Get your credentials from Supabase dashboard

## Option 1: Single Deployment (Recommended for MVP)

Deploy the entire application as one unit on Vercel.

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/evara-tds.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Visit https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub repository
4. Configure settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

In Vercel Dashboard:
1. Go to Settings > Environment Variables
2. Add these variables:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

**Result:** Your app is live at `https://your-project.vercel.app`

---

## Option 2: Separate Frontend/Backend (Scalable)

Deploy frontend and backend separately for better scalability.

### Step 1: Restructure Project

```bash
# Create separate projects
mkdir evara-tds-frontend
mkdir evara-tds-backend

# Move current app to frontend
cp -r src index.html vite.config.ts package.json evara-tds-frontend/

# Copy backend template
cp -r api evara-tds-backend/
```

### Step 2: Frontend Deployment

**In `evara-tds-frontend` folder:**

```bash
cd evara-tds-frontend
git init
git add .
git commit -m "Frontend deployment"
git push -u origin main
```

1. Go to https://vercel.com/new
2. Import the frontend repository
3. Add environment variables
4. Deploy

**Result:** Frontend at `https://evara-tds-frontend.vercel.app`

### Step 3: Backend Deployment (Future)

Create serverless API functions in `api/` folder:

```
api/
├── auth.ts          # Authentication endpoints
├── sensors.ts       # Sensor data endpoints
└── devices.ts       # Device management endpoints
```

Deploy separately to scale independently.

---

## Option 3: Monorepo with Turborepo

For advanced scalability with shared packages.

### Structure

```
evara-tds/
├── apps/
│   ├── frontend/    # Vite React app
│   └── backend/     # API functions
├── packages/
│   ├── common/      # Shared types
│   └── ui/          # Shared components
└── turbo.json
```

### Deploy with Monorepo

```bash
vercel --prod
```

Vercel automatically detects and deploys both frontend and backend.

---

## Environment Variables

### Frontend (.env.local)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
DATABASE_URL=postgresql://...
```

---

## Vercel Configuration

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "env": {
    "VITE_SUPABASE_URL": {
      "description": "Supabase project URL"
    },
    "VITE_SUPABASE_ANON_KEY": {
      "description": "Supabase anonymous key"
    }
  }
}
```

---

## Troubleshooting

### Build Fails with Missing Dependencies

```bash
npm install
npm audit fix
npm run build
```

### Environment Variables Not Loading

- Check Vercel Dashboard > Settings > Environment Variables
- Ensure variable names match exactly (case-sensitive)
- Redeploy after adding variables

### Port Already in Use

```bash
lsof -i :5174
kill -9 <PID>
npm run dev
```

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Performance Optimization

### 1. Enable Caching

In `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### 2. Optimize Images

- Use WebP format
- Implement lazy loading
- Compress with tools like TinyPNG

### 3. Code Splitting

Vite automatically splits code for better performance.

### 4. Monitor Analytics

Use Vercel Analytics to monitor performance:
- https://vercel.com/docs/analytics

---

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard > Deployments
2. Find the previous working deployment
3. Click "Promote to Production"

---

## Cost Estimation

- **Vercel:** Free tier includes 100GB bandwidth/month
- **Supabase:** Free tier includes 500MB database storage
- **Domain:** $12-15/year (optional)

---

## Next Steps

1. ✅ Deploy application
2. ⬜ Set up domain (optional)
3. ⬜ Configure custom analytics
4. ⬜ Add database backups
5. ⬜ Implement CI/CD pipeline

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Community: https://vercel.com/community
