# Quick Start Guide - Layout Agent

## ⚡ 5-Minute Local Setup

### 1. Get Your API Key

- Go to [https://console.anthropic.com](https://console.anthropic.com)
- Click **"Create Key"**
- Copy the key (starts with `sk-ant-`)

### 2. Install & Configure

```bash
# Navigate to project
cd d:\layout-agent

# Install dependencies
npm install

# Edit server/.env file
notepad server\.env
```

**Paste this and replace with your key**:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here-replace-this
PORT=3001
NODE_ENV=development
```

### 3. Start Development

```bash
npm run dev
```

**Expected output**:
```
✓ Layout Agent Server running on http://localhost:3001
✓ Vite dev server running at http://localhost:5173
```

### 4. Open in Browser

Visit: **[http://localhost:5173](http://localhost:5173)**

### 5. Test It

Try in the chat:
```
Convert this to 9:16
```

**Expected results**:
- ✅ Chat message appears
- ✅ JSON updates (canvas becomes 1080×1920)
- ✅ Wireframe preview changes
- ✅ Agent explains the change

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# 1. Ensure code is committed
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git push origin main

# 3. Visit https://vercel.com
# 4. Click "Add New Project" → Select layout-agent
# 5. Add ANTHROPIC_API_KEY environment variable
# 6. Click "Deploy"
```

**Your live URL**: https://layout-agent-YOUR-ID.vercel.app

### Option 2: Render

Same process, but use https://render.com instead.

---

## 📋 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "API key not found" | Check `server/.env` exists and has key |
| "Connection refused" | Make sure both dev servers started (`npm run dev`) |
| "Port 3001 in use" | Change PORT in `server/.env` |

---

## 📚 Full Documentation

- **Setup Details**: See `README.md`
- **Deployment Steps**: See `DEPLOYMENT_GUIDE.md`
- **Technical Design**: See `APPROACH.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`

---

**Ready? Start with: `npm run dev`** ✨
```

You should see:
```
✓ Server running on http://localhost:3001
✓ Frontend running on http://localhost:5173
```

### 5. **Open Browser**
Navigate to: **http://localhost:5173**

You should see three panels:
- **Left**: Chat interface
- **Middle**: Wireframe preview
- **Right**: Layout JSON viewer

---

## 💬 Try These Commands

1. **"Convert this to 9:16"**
   - Changes from 1:1 to vertical 9:16 aspect ratio

2. **"Make the headline smaller"**
   - Reduces headline font size by ~20%

3. **"Move the headline to the top"**
   - Repositions headline to top with padding

4. **"Make the product bigger"**
   - Increases product image size

5. **"Move the offer badge higher"**
   - Moves discount badge up

6. **"Keep the product large but move it to center"**
   - Resizes and repositions in one command

---

## 🐛 Troubleshooting

### **"Cannot find module '@anthropic-ai/sdk'"**
```bash
cd server
npm install @anthropic-ai/sdk
```

### **"Port 3001 already in use"**
Change port in `.env`:
```
PORT=3002
```

### **"ANTHROPIC_API_KEY not set"**
Check that `.env` file exists in `server/` directory and has the key:
```bash
cat server/.env
```

### **"Frontend can't connect to backend"**
Make sure backend is running:
```bash
# In separate terminal
npm run dev:server
```

---

## 📁 Project Structure

```
layout-agent/
├── client/        ← React app (port 5173)
├── server/        ← Express API (port 3001)
├── README.md      ← Full documentation
├── APPROACH.md    ← Technical details
└── LICENSE
```

---

## 🔗 Useful Commands

```bash
# Start everything
npm run dev

# Start frontend only (http://localhost:5173)
npm run dev:client

# Start backend only (http://localhost:3001)
npm run dev:server

# Build for production
npm run build

# Check health
curl http://localhost:3001/health
```

---

## 📞 Need Help?

1. Check `.env` exists in `server/` with ANTHROPIC_API_KEY
2. Ensure both servers are running
3. Check browser console (F12) for errors
4. Check terminal logs for backend errors

---

**Ready? Go to http://localhost:5173 and start chatting! 🎉**
