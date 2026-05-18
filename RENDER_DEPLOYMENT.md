# 🚀 Render Deployment Guide

## What Changed (Fixes)

✅ **Build script fixed** - Removed server build step (Node.js doesn't need compilation)
✅ **Start script added** - Render can now run `npm start`
✅ **CORS updated** - Accepts production domains
✅ **Static files serving** - Backend now serves frontend in production
✅ **Environment-aware API** - Frontend auto-detects backend URL

---

## Deploy to Render (One Single Service)

### Step 1: Prepare Your Git Repository
```bash
cd d:\layout-agent
git add .
git commit -m "Fix: Render deployment configuration"
git push origin main
```

### Step 2: Go to Render Dashboard
1. Visit https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **layout-agent** repository

### Step 3: Configure Service

**Name:** `layout-agent` (or any name you want)

**Environment:** Node.js

**Build Command:** 
```
npm install && npm run build
```

**Start Command:** 
```
npm start
```

**Instance Type:** Free (or paid if you want better performance)

### Step 4: Add Environment Variables

Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-YOUR-KEY-HERE` (from https://console.anthropic.com) |
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `CORS_ORIGIN` | `*` |

### Step 5: Deploy

Click **"Create Web Service"** and wait 5-10 minutes for deployment.

---

## What's Happening During Deploy

```
1. Git clone your repo
2. npm install (installs all dependencies)
3. npm run build (builds frontend to dist/ folder)
4. npm start (runs server/index.js)
5. Server starts on port 3001
6. Server serves frontend from dist/
7. Server handles /api/chat requests
8. You get a live URL: https://layout-agent-xxxxx.onrender.com
```

---

## Testing Your Deployed App

### Test 1: Check Health Status
```bash
curl https://layout-agent-xxxxx.onrender.com/health
# Should return: {"status":"ok","timestamp":"2026-05-18T..."}
```

### Test 2: Open in Browser
1. Visit: `https://layout-agent-xxxxx.onrender.com`
2. You should see the chat interface
3. Click the chat input field and send a message

### Test 3: Test a Transformation
```
Send: "Convert this to 9:16"
Expected: 
- Chat shows response
- JSON updates
- Wireframe changes to 9:16 aspect ratio
```

### Test 4: Check Browser Console for Errors
1. Open DevTools (F12)
2. Go to **Console** tab
3. Send a chat message
4. Should NOT see any red errors
5. Should see API call to `/api/chat`

---

## Local Testing (Before Deploying)

### Test 1: Full Local Development

```bash
cd d:\layout-agent

# Install dependencies
npm install

# Create server/.env with your API key
# Windows:
echo ANTHROPIC_API_KEY=sk-ant-YOUR-KEY-HERE > server\.env
echo PORT=3001 >> server\.env
echo NODE_ENV=development >> server\.env

# Start both frontend and backend
npm run dev

# Wait for:
# ✓ Vite ready at http://localhost:5173
# ✓ Server ready at http://localhost:3001

# Open http://localhost:5173
```

### Test 2: Local - Test Backend Endpoint Only

```bash
# Terminal 1: Start only server
npm run dev:server

# Terminal 2: Test the endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Convert this to 9:16",
    "layout": {"canvasWidth":1080,"canvasHeight":1080,"nodes":[]},
    "history": []
  }'

# Should return JSON with explanation and updatedLayout
```

### Test 3: Local - Test Frontend Only

```bash
# Terminal 1: Start only frontend
npm run dev:client

# Terminal 2: Make sure backend is running
npm run dev:server

# Browser: Open http://localhost:5173
# Send: "Make the headline smaller"
# Check browser console for any errors
```

---

## Troubleshooting Deployment

### ❌ Error: "Cannot find module"
**Solution:** Make sure `npm install` ran successfully
```bash
git push origin main  # Re-trigger deploy
# Check build logs in Render dashboard
```

### ❌ Error: "No route found" / "Cannot GET /"
**Solution:** Frontend not being served. The render.yaml has been fixed to:
```yaml
buildCommand: "npm install && npm run build"
startCommand: "npm start"
```

### ❌ Error: "ANTHROPIC_API_KEY not found"
**Solution:** Add it in Render dashboard:
1. Go to your service
2. Click **"Settings"**
3. Scroll to **"Environment"**
4. Click **"Add Environment Variable"**
5. Key: `ANTHROPIC_API_KEY`
6. Value: `sk-ant-YOUR-KEY`
7. Save and **"Manual Redeploy"**

### ❌ Error: "Failed to send message"
**Solution:** 
1. Check API key is valid: https://console.anthropic.com
2. Check frontend console (F12) for exact error
3. Check Render logs: Dashboard → Service → Logs

### ❌ Error: "Cannot GET /health"
**Solution:** Backend not running or URL is wrong
```bash
# Test locally first
curl http://localhost:3001/health
# If this fails, backend isn't running
```

---

## How the Deployment Works

### What Gets Deployed
```
d:\layout-agent/
├── server/                    ← This runs on Render
│   ├── index.js              ← Starts here
│   ├── routes/chat.js        ← Handles /api/chat
│   ├── services/
│   │   ├── llmService.js
│   │   └── layoutTransforms.js
│   └── prompts/
│       └── systemPrompt.js
│
├── client/dist/              ← Built frontend (served by server)
│   ├── index.html
│   ├── assets/
│   │   ├── *.js
│   │   └── *.css
│
└── node_modules/             ← Dependencies (installed by npm install)
```

### Request Flow on Render
```
1. Browser opens: https://layout-agent-xxxxx.onrender.com
2. Server serves: client/dist/index.html
3. Browser loads: index.html + assets
4. User sends: "Convert to 9:16"
5. Frontend POST: /api/chat
6. Server receives: /api/chat route → llmService.js → Claude API
7. Server returns: Updated layout + explanation
8. Frontend updates: Chat + JSON + Wireframe
```

---

## Deploy Script (Quick Deploy)

Save as `deploy.sh` (macOS/Linux) or `deploy.bat` (Windows):

### macOS/Linux: `deploy.sh`
```bash
#!/bin/bash
echo "📦 Building and deploying to Render..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Pushed to GitHub. Render will auto-deploy in 1-2 minutes."
echo "Check: https://dashboard.render.com"
```

### Windows: `deploy.bat`
```batch
@echo off
echo 📦 Building and deploying to Render...
git add .
git commit -m "Deploy: %date% %time%"
git push origin main
echo ✅ Pushed to GitHub. Render will auto-deploy in 1-2 minutes.
echo Check: https://dashboard.render.com
```

**Usage:**
```bash
./deploy.sh  # macOS/Linux
deploy.bat   # Windows (or double-click in Explorer)
```

---

## Environment Variables Reference

### Required for Render
| Variable | Example | Purpose |
|----------|---------|---------|
| `ANTHROPIC_API_KEY` | `sk-ant-xxxx` | Claude API authentication |

### Recommended for Render
| Variable | Example | Purpose |
|----------|---------|---------|
| `NODE_ENV` | `production` | Optimizes for production |
| `PORT` | `3001` | Server port |
| `CORS_ORIGIN` | `*` | Allow all origins (safe for public API) |

---

## Next Steps After Deployment

1. ✅ Test the deployed app
2. ✅ Record a video demo (see VIDEO_SCRIPT.md)
3. ✅ Submit to Compra with your live URL
4. ✅ Share the GitHub repo link

---

## Summary of Fixes Made

### Fixed `package.json`
- ✅ Added root-level `start` script
- ✅ Added `build` script to server
- ✅ Kept `build` focused on client only

### Fixed `server/index.js`
- ✅ Added static file serving for production
- ✅ Updated CORS to use environment variables
- ✅ Added NODE_ENV-aware configuration
- ✅ Added SPA fallback (serves index.html for non-API routes)

### Fixed `client/src/utils/api.js`
- ✅ Auto-detects production vs development
- ✅ Uses `/api` in production (same domain)
- ✅ Uses `localhost:3001` in development

### Fixed `render.yaml`
- ✅ Removed duplicate client service
- ✅ Single unified service for both frontend + backend
- ✅ Updated build and start commands
- ✅ Correct environment variables

---

**Your app is now ready for production deployment!** 🚀
