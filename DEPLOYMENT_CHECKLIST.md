# EvaraTDS Netlify Deployment Checklist

Complete this checklist before deploying to Netlify.

## Pre-Deployment Checklist

### 1. Local Testing
- [ ] Run `npm install` - all dependencies installed
- [ ] Run `npm run dev` - dev server starts without errors
- [ ] Test login with admin@example.com / admin@123
- [ ] Navigate through all pages (Dashboard, Map, Devices, Settings)
- [ ] Test responsive design on mobile (F12 -> Toggle device toolbar)
- [ ] Run `npm run build` - build completes successfully
- [ ] Run `npm run preview` - production build works locally

### 2. Code Quality
- [ ] No console errors in browser (F12)
- [ ] No TypeScript errors
- [ ] All imports are correct
- [ ] Environment variables are properly configured
- [ ] .env.example exists with correct variable names

### 3. Git & Repository
- [ ] All files committed: `git add .`
- [ ] Meaningful commit message: `git commit -m "Prepare for Netlify deployment"`
- [ ] Pushed to GitHub: `git push origin main`
- [ ] Repository is public (for Netlify auto-deployment)
- [ ] No sensitive data in repository (.env files ignored)

### 4. Netlify Configuration
- [ ] `netlify.toml` exists and is configured
- [ ] `.netlifyignore` file created
- [ ] Build command is `npm run build`
- [ ] Publish directory is `dist`
- [ ] Node version set to `20` or higher

## Deployment Steps

### Step 1: Connect to Netlify
- [ ] Go to https://app.netlify.com
- [ ] Click "Add new site"
- [ ] Select "Import an existing project"
- [ ] Authorize GitHub access
- [ ] Select your `figma-tds` repository

### Step 2: Configure Build Settings
- [ ] Build command: `npm run build` (auto-filled)
- [ ] Publish directory: `dist` (auto-filled)
- [ ] Node version: `20.10.0` (auto-filled)
- [ ] Click "Deploy site"

### Step 3: Add Environment Variables
**⚠️ IMPORTANT: Do this before your site goes live**

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variables"**
3. Add:
   ```
   Variable name: VITE_SUPABASE_URL
   Value: https://gfxpyztfbrvzpnjqhuxy.supabase.co
   ```
4. Click **Save**
5. Add:
   ```
   Variable name: VITE_SUPABASE_ANON_KEY
   Value: [Your Supabase anon key]
   ```
6. Click **Save**

### Step 4: Redeploy
1. Go to **Deployments**
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete (usually 2-5 minutes)

## Post-Deployment Testing

### Functional Testing
- [ ] Site loads without white screen
- [ ] Login page displays correctly
- [ ] Can login with admin@example.com / admin@123
- [ ] Dashboard loads with all cards visible
- [ ] Map page displays OpenStreetMap
- [ ] Devices page shows device table
- [ ] Settings page accessible (admin only)

### UI/UX Testing
- [ ] Light theme displays correctly
- [ ] All text is readable
- [ ] Buttons are clickable
- [ ] Responsive on mobile (F12)
- [ ] Images/icons load properly
- [ ] No layout shifts or broken styling

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] No console errors (F12)
- [ ] Navigation between pages is smooth
- [ ] Map loads without lag

### Security Testing
- [ ] HTTPS enabled (green lock icon)
- [ ] No mixed content warnings
- [ ] Cookies are secure (if any)
- [ ] No sensitive data in client-side code

## Common Issues & Fixes

### Build Fails
**Check**:
- [ ] All dependencies installed (`npm install`)
- [ ] Node version is 18 or higher
- [ ] No TypeScript errors locally
- [ ] View Netlify Deploy Log for specific errors

### White Screen on Load
**Check**:
- [ ] Environment variables are added in Netlify
- [ ] Variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Values are correct (no extra spaces)
- [ ] Site was redeployed after adding variables
- [ ] Browser console for errors (F12)

### 404 on Page Refresh
**Fix**: Already configured in `netlify.toml` with SPA redirects
- [ ] Verify `netlify.toml` file exists in repo root
- [ ] Includes redirect rule: `from = "/*"`, `to = "/index.html"`, `status = 200`

### Slow Build Times
**Solutions**:
- [ ] Check `.netlifyignore` includes `node_modules`
- [ ] Remove unnecessary files from repository
- [ ] Check for large files in `src/`

### Environment Variables Not Working
**Fix**:
- [ ] Variables must use `VITE_` prefix
- [ ] They are CLIENT-SIDE variables (exposed to users)
- [ ] Redeploy after adding variables
- [ ] Check they appear in Deployments tab's environment

## Deployment Success Checklist

- [ ] Site has unique Netlify subdomain (e.g., `https://evara-tds.netlify.app`)
- [ ] Build shows "Published" status
- [ ] No errors in Deploy Log
- [ ] Site loads without white screen
- [ ] Login works with test credentials
- [ ] All pages are accessible
- [ ] No console errors (F12)
- [ ] HTTPS is enabled
- [ ] Responsive on mobile

## Custom Domain Setup (Optional)

- [ ] Register domain (GoDaddy, Namecheap, etc.)
- [ ] Go to **Site settings** → **Domain management**
- [ ] Click **Add domain**
- [ ] Enter your custom domain
- [ ] Update DNS records (Netlify provides instructions)
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] SSL certificate auto-generated (free)

## Ongoing Maintenance

### Regular Tasks
- [ ] Monitor site performance in Netlify Analytics
- [ ] Check Deploy Log for any warnings
- [ ] Test site monthly
- [ ] Keep dependencies updated (occasionally)
- [ ] Review error tracking (if enabled)

### Monitoring
- [ ] Set up Netlify notifications for failed builds
- [ ] Monitor site uptime
- [ ] Check bandwidth usage
- [ ] Review analytics dashboard

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com

---

## 🎉 Deployment Complete!

Your site is now live and will automatically redeploy whenever you push to GitHub!

**Your Live Site URL**: `https://[site-name].netlify.app`

Get the exact URL from your Netlify dashboard.

---

**Questions?** 
- Check NETLIFY_DEPLOYMENT.md for detailed guide
- Check NETLIFY_QUICKSTART.md for quick reference
- Review Netlify documentation
