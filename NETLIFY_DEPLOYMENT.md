# EvaraTDS - Netlify Deployment Guide

This guide explains how to deploy the EvaraTDS Water Quality Monitoring System to Netlify.

## Prerequisites

Before you start, make sure you have:
- A GitHub account with the repository pushed
- A Netlify account (free tier available at https://netlify.com)
- Supabase project credentials (Project URL and Anon Key)

## Step 1: Prepare Your Repository

### 1.1 Ensure All Files Are in Git

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 1.2 Verify Environment Variables Template

Make sure `.env.example` exists in your repository root:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 2: Connect to Netlify

### Option A: Using Netlify Dashboard (Recommended)

1. **Go to Netlify**: https://app.netlify.com
2. **Click "Add new site"** → **"Import an existing project"**
3. **Choose your Git provider**: Select GitHub
4. **Authorize Netlify** to access your repositories
5. **Select the repository**: Choose `figma-tds` (or your repo name)
6. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20.10.0` (or latest LTS)

### Step 3: Set Environment Variables

1. In Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. **Add environment variables**:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://gfxpyztfbrvzpnjqhuxy.supabase.co`
   
3. **Add another variable**:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `[Your actual Supabase anon key]`

4. **Redeploy** after adding environment variables

## Step 4: Test Your Deployment

1. Wait for the build to complete (usually 2-5 minutes)
2. Check the **Deploy Log** for any errors
3. Once deployed, visit your site at `https://[your-site-name].netlify.app`
4. Test the login functionality:
   - Email: `admin@example.com`
   - Password: `admin@123`

## Troubleshooting

### Build Fails with "Module not found"

**Solution**: Run locally first to verify everything works:
```bash
npm install
npm run build
```

### White Screen / App Not Rendering

**Possible Causes**:
1. Missing environment variables
2. Incorrect Supabase credentials
3. Tailwind CSS not compiling

**Solution**:
- Verify environment variables are set in Netlify
- Check browser console for errors (F12)
- Review Netlify Deploy Log

### 404 on Refresh

**Solution**: This is normal for SPAs. The `netlify.toml` file includes proper redirects:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This redirect is already configured, so all routes should work.

### Environment Variables Not Working

**Check**:
1. Variables are set in Netlify, not in `.env` files
2. They use `VITE_` prefix
3. You redeploy after adding variables
4. They appear in the "Deployments" tab's environment section

## Advanced: Using Netlify CLI

For local testing that matches production:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Link your site
netlify link

# Build locally with Netlify environment
netlify build

# Test the build
netlify start

# Deploy manually
netlify deploy --prod
```

## Configuration Files Explained

### netlify.toml
- **Build command**: Runs `npm run build`
- **Publish directory**: Serves files from `dist/`
- **Redirects**: All routes redirect to `index.html` (SPA routing)
- **Headers**: Security headers and cache policies

### .netlifyignore
Tells Netlify which files/folders to ignore during deployment to save build time

### .env.example
Template for environment variables - never commit actual secrets!

## Performance Optimization

The current configuration includes:

1. **Automatic minification** of CSS/JS
2. **Cache headers** for static assets (1 year)
3. **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
4. **HTTPS** by default

## SSL Certificate

Netlify automatically provides a free SSL certificate for your domain. HTTPS is automatically enabled.

## Custom Domain Setup

1. **In Netlify Dashboard**:
   - Go to **Site settings** → **Domain management**
   - Click **Add domain**
   - Enter your custom domain

2. **Update DNS**:
   - Point your domain's DNS to Netlify's nameservers
   - Or create CNAME record (detailed instructions provided by Netlify)

3. **Wait for DNS propagation** (can take up to 48 hours)

## Continuous Deployment

Every time you push to your repository's main branch:
1. Netlify automatically detects the change
2. Triggers a new build
3. Deploys if build succeeds
4. Provides deploy preview for pull requests

## Rollback

If something goes wrong:
1. Go to **Deploys** tab in Netlify
2. Find a previous successful deployment
3. Click **Publish deploy** to activate it instantly

## Monitoring & Analytics

Netlify provides:
- Deployment history and logs
- Build duration tracking
- Bandwidth usage
- Analytics integrations

## Support & Help

- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs

---

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] `.env.example` created
- [ ] `netlify.toml` configured
- [ ] Netlify account created
- [ ] Site linked to GitHub repository
- [ ] Environment variables added in Netlify
- [ ] Build succeeds without errors
- [ ] Application loads at deployed URL
- [ ] Login functionality works
- [ ] All pages are accessible
- [ ] No console errors in browser (F12)

---

**Your deployed site**: `https://[your-site-name].netlify.app`

Replace `[your-site-name]` with your actual Netlify subdomain or custom domain once configured.
