# Quick Start: Deploy EvaraTDS to Netlify

## 🚀 Fast Deployment (5 minutes)

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push
```

### 2️⃣ Go to Netlify
Visit: https://app.netlify.com

### 3️⃣ Create New Site
- Click **"Add new site"**
- Select **"Import an existing project"**
- Choose **GitHub**
- Authorize Netlify
- Select your **figma-tds** repository

### 4️⃣ Configure Build (Auto-filled)
- **Build command**: `npm run build` ✓
- **Publish directory**: `dist` ✓
- **Node version**: `20` ✓
- Click **"Deploy site"**

### 5️⃣ Add Environment Variables
While site is building:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variables"**
3. Add these variables:

```
VITE_SUPABASE_URL = https://gfxpyztfbrvzpnjqhuxy.supabase.co
VITE_SUPABASE_ANON_KEY = [your-supabase-anon-key]
```

4. **Trigger deploy** after adding variables

### 6️⃣ Test Your Site ✅
- Visit: `https://[site-name].netlify.app`
- Login with: admin@example.com / admin@123
- All features should work!

---

## 📋 What's Already Configured

✅ **netlify.toml** - Build & deploy configuration
✅ **SPA Routing** - All routes redirect to index.html
✅ **Security Headers** - HTTPS, X-Frame-Options, etc.
✅ **.netlifyignore** - Optimized file exclusions
✅ **Environment variables** - Properly set up for Vite
✅ **Build optimization** - Minified CSS/JS, asset caching

---

## 🔧 Troubleshooting

### Build Fails
Check the **Deploy Log** in Netlify for specific errors

### White Screen
- Verify environment variables are set
- Check browser console (F12) for errors
- Ensure Supabase credentials are correct

### 404 on Refresh
This is fixed by `netlify.toml` redirects (already configured)

### Environment Variables Not Working
- Must use `VITE_` prefix in Netlify UI
- Variables are VITE environment variables (client-side)
- Redeploy after adding variables

---

## 📚 Full Guide
See **NETLIFY_DEPLOYMENT.md** for detailed instructions

---

## 🎉 Done!
Your EvaraTDS application is now live on Netlify!

Get your site URL from the Netlify dashboard (usually `https://[random-name].netlify.app`)
