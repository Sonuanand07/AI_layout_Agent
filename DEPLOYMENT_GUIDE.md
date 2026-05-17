# Layout Agent - Complete Deployment Guide

This guide covers:
1. ✅ **Local Development Setup** 
2. ✅ **GitHub Repository Setup**
3. ✅ **Deployment to Vercel** (Recommended for beginners)
4. ✅ **Deployment to Render** (Full-stack alternative)
5. ✅ **Submission to Compra**

---

## Phase 1: Local Development Setup

### Step 1.1: Prerequisites

Ensure you have installed:
- **Node.js 18+**: [https://nodejs.org/](https://nodejs.org/) (LTS recommended)
- **Git**: [https://git-scm.com/](https://git-scm.com/)
- **VS Code** (or any editor)

**Verify installation**:
```bash
node --version   # Should be v18 or higher
npm --version    # Should be v8 or higher
git --version    # Should be v2 or higher
```

### Step 1.2: Get Your Anthropic API Key

1. Go to [https://console.anthropic.com/account/keys](https://console.anthropic.com/account/keys)
2. Click **"Create Key"**
3. Copy the key (starts with `sk-ant-`)
4. **NEVER share this key** - it's like a password

### Step 1.3: Set Up Local Environment

1. **Open PowerShell/Terminal** in your project directory:
   ```bash
   cd d:\layout-agent
   ```

2. **Create `.env` file in the `server/` folder**:
   ```bash
   # On Windows PowerShell:
   notepad server\.env
   ```

3. **Paste this into the file and save**:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   PORT=3001
   NODE_ENV=development
   ```
   Replace `xxxxxxxxxxxxx` with your actual API key.

4. **Important**: `.env` is in `.gitignore` - it won't be committed to GitHub ✅

### Step 1.4: Install Dependencies

```bash
# Install root dependencies
npm install

# This automatically installs:
# - server/node_modules/
# - client/node_modules/
```

### Step 1.5: Run Locally

```bash
# Start both frontend (Vite on :5173) and backend (:3001) in parallel
npm run dev
```

**Expected output**:
```
✓ Layout Agent Server running on http://localhost:3001
✓ Vite app ready at http://localhost:5173
```

**In your browser**, open: [http://localhost:5173](http://localhost:5173)

### Step 1.6: Test It Works

Try these commands in the chat:
- ✅ "Convert this to 9:16"
- ✅ "Make the headline smaller"
- ✅ "Move the product to center"

If the layout JSON updates → **Everything works!** 🎉

---

## Phase 2: GitHub Repository Setup

### Step 2.1: Initialize Git

```bash
# Navigate to project root
cd d:\layout-agent

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Layout agent with Claude integration"
```

### Step 2.2: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name**: `layout-agent`
3. **Description**: "Chat-based design layout transformation agent"
4. **Visibility**: Public (so you can share the link)
5. **Do NOT initialize** with README (we already have one)
6. Click **"Create repository"**

### Step 2.3: Connect Local to GitHub

After creating the repo on GitHub, you'll see commands like:

```bash
# Replace USERNAME with your GitHub username
git remote add origin https://github.com/USERNAME/layout-agent.git
git branch -M main
git push -u origin main
```

Run these commands **exactly** in your PowerShell terminal.

### Step 2.4: Verify on GitHub

1. Refresh [https://github.com/USERNAME/layout-agent](https://github.com/USERNAME/layout-agent)
2. You should see all your files uploaded ✅

---

## Phase 3: Deployment to Vercel (Recommended)

Vercel is perfect for this project because:
- ✅ Automatic deployments from GitHub
- ✅ Free tier is generous
- ✅ Fast, global CDN
- ✅ One-click rollback

### Step 3.1: Sign Up for Vercel

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Verify your email

### Step 3.2: Import Your Project

1. On Vercel dashboard, click **"Add New Project"** → **"Import Git Repository"**
2. Find your `layout-agent` repo
3. Click **"Import"**

### Step 3.3: Configure Environment Variables

1. On the import screen, under **"Environment Variables"**:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Paste your API key (from Step 1.2)
   - Click **"Add"**

2. Also add:
   - **Name**: `NODE_ENV`
   - **Value**: `production`

3. Click **"Deploy"**

### Step 3.4: Wait for Deployment

Vercel will:
1. Clone your GitHub repo
2. Install dependencies
3. Build the frontend and backend
4. Deploy to a live URL

**Deployment takes 2-5 minutes**. You'll see a progress bar.

### Step 3.5: Your Live URL

Once deployment finishes, Vercel shows your URL, like:
```
https://layout-agent-abc123.vercel.app
```

**Share this URL!** It's your live application. 🚀

---

## Phase 4: Deployment to Render (Alternative)

Use Render if you want a simpler full-stack hosting with free tier.

### Step 4.1: Sign Up for Render

1. Go to [https://render.com/](https://render.com/)
2. Click **"Get Started"** → **"Sign up with GitHub"**
3. Authorize Render
4. Verify email

### Step 4.2: Create Backend Service

1. On Render dashboard, click **"New +"** → **"Web Service"**
2. Select your `layout-agent` repository
3. **Name**: `layout-agent-server`
4. **Environment**: Node.js
5. **Build Command**: `npm run build`
6. **Start Command**: `npm start`
7. **Plan**: Free

### Step 4.3: Add Environment Variables

Before deploying, click **"Advanced"** and add:
- **Key**: `ANTHROPIC_API_KEY`
- **Value**: Your API key

### Step 4.4: Deploy Backend

Click **"Create Web Service"**. Wait for deployment (2-5 minutes).

Once done, you'll see a URL like:
```
https://layout-agent-server.onrender.com
```

### Step 4.5: Create Frontend Service

1. Click **"New +"** → **"Static Site"**
2. Select your `layout-agent` repository
3. **Name**: `layout-agent-client`
4. **Build Command**: `cd client && npm run build`
5. **Publish Directory**: `client/dist`

### Step 4.6: Configure Frontend

Add environment variable:
- **Key**: `VITE_API_URL`
- **Value**: Your backend URL (from 4.4)

Click **"Create Static Site"** and wait.

Your frontend URL:
```
https://layout-agent-client.onrender.com
```

---

## Phase 5: Submission to Compra

### What to Submit

You need:
1. ✅ **GitHub Repository Link**
2. ✅ **Live Deployment URL** (Vercel or Render)
3. ✅ **README.md** (setup instructions) ← Already good
4. ✅ **APPROACH.md** (technical explanation) ← Already good
5. ⭐ **(Optional) Loom Video** (3-5 min walkthrough)

### Step 5.1: Create Loom Video (Optional but Impressive)

A quick 3-5 minute video showing:

1. **Opening the app** (30 sec)
2. **Chat with examples** (2 min):
   - "Convert to 9:16" → See JSON update
   - "Make headline smaller" → See changes
   - "Move product higher" → See follow-up understanding
3. **JSON viewer** (30 sec) - Show full layout
4. **Wireframe preview** (30 sec) - Show visual changes

**To record**:
1. Go to [https://www.loom.com/](https://www.loom.com/) (free account)
2. Click **"Start Recording"**
3. Share your screen, interact with the app
4. Click **"Stop"** when done
5. Copy the link

### Step 5.2: Submission Format

Create a `SUBMISSION.md` file in your repo root:

```markdown
# Layout Agent - Submission

## Project Links

- **GitHub Repository**: https://github.com/USERNAME/layout-agent
- **Live Application**: https://layout-agent-abc123.vercel.app
- **Loom Walkthrough**: https://www.loom.com/share/xxxxx (optional)

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **LLM**: Claude 3.5 Sonnet (Anthropic API)

## Key Features Implemented

✅ Chat-based design transformation
✅ Real-time JSON updates
✅ Wireframe preview
✅ Conversation context for follow-ups
✅ Aspect ratio conversion (1:1 → 9:16)
✅ Element positioning and resizing
✅ Comprehensive error handling

## How to Test

1. Open the live URL
2. Try: "Convert this to 9:16"
3. Try: "Make the headline smaller"
4. Try: "Move the product to the center"
5. Watch the JSON and preview update in real-time

## Architecture Highlights

- **Normalized coordinates** as source of truth
- **Hybrid AI + deterministic** transformations
- **Multi-layer validation** for safety
- **Conversation history** for context
- **Claude API** for semantic understanding

See APPROACH.md for detailed technical design.
```

### Step 5.3: Final Checklist

Before submitting, verify:

- [ ] GitHub repo is public
- [ ] All files are pushed to GitHub
- [ ] Live URL works (no 404s)
- [ ] Chat accepts messages
- [ ] Layout JSON updates on transformations
- [ ] Wireframe preview works
- [ ] README has complete setup instructions
- [ ] APPROACH.md explains technical design
- [ ] SUBMISSION.md has all links
- [ ] (Optional) Loom video uploaded

---

## Troubleshooting

### Q: "ANTHROPIC_API_KEY is not defined"
**A**: Check your `.env` file in `server/` folder. Make sure:
- File name is exactly `.env`
- Contains: `ANTHROPIC_API_KEY=sk-ant-...`
- No quotes around the key
- File is in `server/` folder, not root

Restart the server: `npm run dev`

### Q: "Failed to fetch from /api/chat"
**A**: Make sure backend is running on port 3001:
```bash
npm run dev:server
```
Check browser console (F12) for exact error.

### Q: Vercel deployment fails
**A**: Common causes:
1. Missing API key in Vercel env vars
2. Syntax error in code (check Vercel build logs)
3. Missing package.json fields

### Q: Changes pushed to GitHub but Vercel hasn't updated
**A**: Vercel auto-deploys when you push. If not:
1. Go to Vercel dashboard
2. Click your project
3. Click **"Deployments"**
4. Click **"Redeploy"** on latest commit

### Q: "Cannot find module '@anthropic-ai/sdk'"
**A**: Run `npm install` in both root and `server/` folders:
```bash
npm install
cd server && npm install
```

---

## Tips for Success

1. **Test locally first** before deploying
2. **Use Chrome DevTools** (F12) to debug API calls
3. **Check deployment logs** if something goes wrong
4. **Commit frequently** with meaningful messages
5. **Keep your API key secret** - never push `.env` to GitHub

---

## Next Steps After Submission

1. **Collect feedback** from Compra reviewers
2. **Iterate on improvements**:
   - Better prompt engineering
   - More sophisticated transformations
   - Support for more design operations
3. **Consider enhancements**:
   - Undo/redo functionality
   - Multiple layouts
   - Export to image/PDF
4. **Open-source the project** (if desired)

---

**Good luck! 🚀 You've built something awesome.**

Questions? Check the TROUBLESHOOTING.md file or the project README.
