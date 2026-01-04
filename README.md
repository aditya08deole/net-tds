# EvaraTDS - Campus Water Quality Monitoring System

A production-ready full-stack application for monitoring campus water quality metrics in real-time.

## 📋 Overview

EvaraTDS is a comprehensive water quality monitoring system featuring:
- Real-time sensor data visualization
- Interactive OpenStreetMap integration
- Role-based access control (Admin/Viewer)
- Modern light-themed responsive UI (Sellin-inspired design)
- Secure Supabase authentication
- **✅ Ready for Netlify deployment**

## ✨ Key Features

- 🔐 **Secure Authentication** - Email/password login with Supabase
- 📊 **Real-time Dashboard** - View TDS, temperature, and sensor status
- 🗺️ **Interactive Map** - OpenStreetMap with sensor locations
- 📱 **Device Management** - Monitor all connected sensors
- ⚙️ **Admin Settings** - Configure water quality thresholds (admin only)
- 🎨 **Modern UI** - Sellin-inspired light theme with smooth animations
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🚀 **Production Ready** - Optimized build with caching

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on `http://localhost:5173`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### 🚀 Deploy to Netlify (Recommended)

**Automatic deployment** - Push to GitHub and Netlify handles the rest!

**Already configured**:
- ✅ `netlify.toml` with build configuration
- ✅ SPA routing redirects
- ✅ Security headers
- ✅ Environment variables setup
- ✅ Asset caching optimization

**Deployment Steps**:
1. Push your code to GitHub
2. Connect GitHub repository to Netlify
3. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Netlify automatically builds and deploys!

## 🔑 Authentication

Default test credentials:
- **Email**: admin@example.com
- **Password**: admin@123

**Roles**:
- **Admin**: Full access to all features and settings
- **Viewer**: Read-only access to dashboards and reports

## 📁 Project Structure

```
figma-tds/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main router
│   │   ├── components/
│   │   │   └── Login.tsx        # Auth component
│   │   └── pages/
│   │       ├── Dashboard.tsx    # Home dashboard
│   │       ├── MapPage.tsx      # Map with sensors
│   │       ├── Devices.tsx      # Device management
│   │       └── Settings.tsx     # Settings (admin)
│   ├── lib/
│   │   ├── auth-service.ts      # Auth logic
│   │   └── supabase.ts          # Supabase client
│   ├── main.tsx                 # React entry
│   └── styles/                  # Global styles
├── netlify.toml                 # Netlify deployment config
├── NETLIFY_QUICKSTART.md        # Quick deployment guide
├── NETLIFY_DEPLOYMENT.md        # Detailed deployment docs
├── index.html                   # HTML entry
├── vite.config.ts              # Vite config
├── tsconfig.json               # TypeScript config
└── package.json
```

## 📦 Dependencies

### Core
- React 18.3.1
- TypeScript
- Vite 6.3.5

### Styling
- Tailwind CSS 4.1.12
- Lucide React icons

### Backend/Auth
- Supabase JS SDK

### Maps
- Leaflet 1.9.4
- React-Leaflet 5.0.0

### UI Components
- Radix UI

### Animation
- Anime.js 4.2.2

## 🚢 Deployment Options

### Option 1: Single Deployment (Recommended for MVP)

Deploy the entire application to Vercel as one unit:

```bash
vercel deploy
```

### Option 2: Separate Frontend/Backend (Scalable)

**Frontend only:**
```bash
cd frontend
vercel deploy
```

**Backend (Future - Serverless Functions):**
```bash
cd api
vercel deploy
```

### Environment Variables

Create `.env.local` in project root:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🛠️ Configuration Files

### vercel.json
Optimized for Vercel deployment with proper build settings.

### vite.config.ts
- React plugin with automatic JSX runtime
- Tailwind CSS integration
- Path alias for `@` imports

### tsconfig.json
- ES2020 target
- JSX with React

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 👥 User Roles

### Admin
- Full access to all features
- Can modify system settings
- Can manage devices
- Can view all data

### Viewer
- Read-only access
- Can view dashboard
- Can view maps and devices
- Cannot modify settings

## 📊 Features

### Dashboard
- Real-time metrics (TDS, Temperature, Sensors, Health)
- Recent activity feed
- System statistics
- Role-based information

### Map
- Interactive OpenStreetMap
- Sensor location markers
- Live sensor data in popups
- Status indicators

### Devices
- Complete device inventory
- Real-time status monitoring
- Battery level tracking
- TDS and temperature readings
- Admin edit capabilities

### Settings
- Water quality thresholds
- Notification preferences
- Security settings
- System information

## 🔒 Security

- Supabase-based authentication
- Role-based access control
- Secure API endpoints
- Environment variable protection

## 📝 Version

**Version:** 1.0.0  
**Last Updated:** January 4, 2026