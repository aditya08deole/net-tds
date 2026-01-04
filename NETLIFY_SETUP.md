# Netlify Deployment Setup

## Environment Variables Required

Go to: **Netlify Dashboard → Site Settings → Environment → Environment Variables**

Add these variables:

### Required Variables

1. **VITE_SUPABASE_URL**
   - Value: `https://gfxpyztfbrvzpnjqhuxy.supabase.co`
   - Description: Your Supabase project URL

2. **VITE_SUPABASE_ANON_KEY**
   - Value: Get from [Supabase Dashboard](https://supabase.com/dashboard/project/gfxpyztfbrvzpnjqhuxy/settings/api)
   - Description: Your Supabase anonymous/public key (starts with "eyJ...")
   - **CRITICAL**: This must be your real JWT token, not a placeholder

## Build Settings

Verify in **Netlify Dashboard → Site Settings → Build & Deploy → Build Settings**:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 20.10.0 (set in netlify.toml)

## Deploy Steps

1. **Add Environment Variables** (see above)
2. **Clear cache and redeploy**:
   - Go to: Deploys → Trigger deploy → Clear cache and deploy site
3. **Verify deployment**:
   - Check build logs for errors
   - Open DevTools (F12) on deployed site and check Console for errors

## Troubleshooting

If you see "Initializing application" stuck:

1. **Check Console Errors**: Open F12 → Console tab on deployed site
2. **Check Network Tab**: Look for failed asset requests (404s)
3. **Verify Environment Variables**: Ensure VITE_SUPABASE_ANON_KEY is set with real JWT token
4. **Check Build Logs**: Look for build warnings or errors

## Local Development

1. Copy `.env.example` to `.env.local`
2. Add your real Supabase anon key
3. Run `npm run dev`

## Important Notes

- The Supabase anon key must be a real JWT token (250+ characters starting with "eyJ...")
- Without valid environment variables, the app will fail silently during initialization
- SPA redirect is configured in both `netlify.toml` and `public/_redirects`
