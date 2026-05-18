# ✅ Complete Testing Checklist

Use this to verify everything works before submitting.

---

## Phase 1: Local Development Testing

### 1.1 Setup
```bash
cd d:\layout-agent
npm install
```
- [ ] Dependencies installed without errors
- [ ] No warnings about missing peer dependencies

### 1.2 Environment Setup
```bash
cd server
echo ANTHROPIC_API_KEY=sk-ant-YOUR-KEY > .env
echo PORT=3001 >> .env
cd ..
```
- [ ] `.env` file created in `server/` folder
- [ ] API key is valid (test at https://console.anthropic.com)

### 1.3 Start Development Servers
```bash
npm run dev
```
- [ ] Frontend starts at `http://localhost:5173` (should see Vite message)
- [ ] Backend starts at `http://localhost:3001` (should see Express message)
- [ ] No errors in terminal
- [ ] "ANTHROPIC_API_KEY loaded" message appears

### 1.4 Open Frontend
- [ ] Open browser to `http://localhost:5173`
- [ ] Chat interface loads
- [ ] Three panels visible: Chat, Wireframe, JSON
- [ ] Initial layout shows in wireframe (product showcase)
- [ ] Initial JSON shows in JSON viewer

---

## Phase 2: API Health Checks

### 2.1 Test Health Endpoint
```bash
# In another terminal (while servers are running)
curl http://localhost:3001/health
```
- [ ] Returns `{"status":"ok","timestamp":"..."}`
- [ ] HTTP status is 200

### 2.2 Test CORS
```bash
curl -H "Origin: http://localhost:5173" http://localhost:3001/health
```
- [ ] Response includes CORS headers
- [ ] Access-Control-Allow-Origin header present

---

## Phase 3: Chat Interface Testing

### 3.1 Send First Message
1. Click chat input field
2. Type: **"Hello"**
3. Press Enter

- [ ] Message appears in chat (on left side)
- [ ] Typing indicator shows ("AI is thinking...")
- [ ] API response appears after 2-3 seconds
- [ ] Response is readable

### 3.2 Check Browser Console
1. Open DevTools (F12)
2. Go to "Console" tab
3. Send another message

- [ ] No red error messages
- [ ] API call logged: `POST http://localhost:3001/api/chat`
- [ ] Response status is 200

### 3.3 Check Network Tab
1. Go to "Network" tab in DevTools
2. Send a message

- [ ] `api/chat` request appears
- [ ] Request Method: `POST`
- [ ] Status: `200`
- [ ] Response time: 2-5 seconds
- [ ] Response body contains: `explanation` and `updatedLayout`

---

## Phase 4: Layout Transformation Testing

### 4.1 Test 1: Aspect Ratio Change (9:16)

**Send:** `"Convert this to 9:16"`

- [ ] Chat shows response (e.g., "Converted to 9:16...")
- [ ] Wireframe height increases (now taller, narrower)
- [ ] JSON viewer updates (height increases to ~1920)
- [ ] All element coordinates update in JSON
- [ ] No JavaScript errors in console

**Expected wireframe:** Tall rectangular canvas with elements repositioned

---

### 4.2 Test 2: Element Resizing

**Send:** `"Make the headline smaller"`

- [ ] Headline element shrinks in wireframe
- [ ] JSON shows `fontSize` decreased
- [ ] Headline element height decreases in JSON coordinates
- [ ] Other elements unchanged

**Expected wireframe:** Headline text smaller, other elements same size

---

### 4.3 Test 3: Element Movement

**Send:** `"Move the product to the center"`

- [ ] Product image moves to center in wireframe
- [ ] Product's `x` coordinate is approximately `(canvasWidth - productWidth) / 2`
- [ ] Product's `y` coordinate unchanged
- [ ] JSON shows `nx` coordinate close to 0.5

**Expected wireframe:** Product centered horizontally

---

### 4.4 Test 4: Context Understanding

**Send:** `"Make it bigger"`

- [ ] AI understands "it" refers to the product from previous message
- [ ] Product enlarges in wireframe
- [ ] JSON shows increased width/height
- [ ] Message shows AI understood context

**Expected:** "I'll make the product bigger..."

---

### 4.5 Test 5: Complex Multi-Transform

**Send:** `"Convert to 16:9 and move headline to top"`

- [ ] Wireframe becomes wider (16:9 aspect ratio, e.g., 1440×810)
- [ ] Headline moves to top
- [ ] Both transformations applied simultaneously
- [ ] JSON reflects all changes
- [ ] Response explains both changes

**Expected:** Both transformations visible in wireframe

---

## Phase 5: JSON Validation Testing

### 5.1 Check JSON Structure
Send a transformation and check JSON in viewer:

- [ ] Root level has `canvasWidth` and `canvasHeight`
- [ ] Root has `nodes` array
- [ ] Each node has: `id`, `type`, `name`, `x`, `y`, `width`, `height`
- [ ] Each node has: `nx`, `ny`, `nw`, `nh` (normalized coordinates)
- [ ] All numeric values are valid numbers (not NaN)

### 5.2 Validate Coordinates
- [ ] `x >= 0` and `x + width <= canvasWidth`
- [ ] `y >= 0` and `y + height <= canvasHeight`
- [ ] `nx >= 0` and `nx + nw <= 1`
- [ ] `ny >= 0` and `ny + nh <= 1`
- [ ] Relationship: `x ≈ nx * canvasWidth`

---

## Phase 6: Error Handling Testing

### 6.1 Test Invalid API Key
1. Stop servers: Ctrl+C
2. Edit `server/.env`, change API key to invalid value
3. Restart: `npm run dev`
4. Send a message

- [ ] Error message appears in chat
- [ ] Message clearly states API key issue
- [ ] No JavaScript crash
- [ ] Console shows error details

### 6.2 Test Offline Backend
1. Stop backend: Ctrl+C (only stop server, keep frontend running)
2. Try to send a message

- [ ] Error message appears: "Failed to send message"
- [ ] Chat shows connection error
- [ ] No infinite loading state
- [ ] Can retry after restarting server

### 6.3 Test Invalid Message
1. Send: empty string (just spaces)

- [ ] Nothing happens (gracefully ignored)
- [ ] No error message

### 6.4 Test Long Message
1. Send: 500+ character message with special characters

- [ ] Message sends successfully
- [ ] Response handles it

---

## Phase 7: UI/UX Testing

### 7.1 Chat Interface
- [ ] Messages scroll to bottom automatically
- [ ] Typing indicator shows during API call
- [ ] Input field clears after sending
- [ ] Send button is clickable
- [ ] Enter key triggers send

### 7.2 Wireframe Preview
- [ ] Updates in real-time after transformation
- [ ] Elements have different colors
- [ ] Element labels are visible
- [ ] Canvas dimensions shown
- [ ] Scrollable if elements overflow

### 7.3 JSON Viewer
- [ ] Syntax highlighting visible
- [ ] Code is readable
- [ ] Not cut off or horizontally scrolling unnecessarily
- [ ] Expandable/collapsible if using collapsible JSON

### 7.4 Responsive Design
- [ ] Resize browser window (smaller)
- [ ] All three panels still visible or properly reorganized
- [ ] No horizontal scrolling issues
- [ ] Text is readable at 1024x768 resolution

---

## Phase 8: Production Build Testing

### 8.1 Build Frontend
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] `client/dist/` folder created with files:
  - [ ] `index.html`
  - [ ] `assets/index-*.js` (JavaScript)
  - [ ] `assets/index-*.css` (Styles)

### 8.2 Test Production Build Locally
```bash
# Terminal 1: Build for production
npm run build

# Terminal 2: Start server in production mode
cd server
NODE_ENV=production PORT=3001 npm start

# Terminal 3: Test it
curl http://localhost:3001
```

- [ ] Server starts without errors
- [ ] Visiting `http://localhost:3001` shows frontend
- [ ] Chat works
- [ ] Transformations work

### 8.3 Test API Endpoint
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Convert to 9:16",
    "layout": {"canvasWidth":1080,"canvasHeight":1080,"nodes":[]},
    "history": []
  }'
```

- [ ] Returns valid JSON
- [ ] Contains `explanation` field
- [ ] Contains `updatedLayout` field

---

## Phase 9: Deployment Readiness

### 9.1 Git Repository
```bash
git status
```
- [ ] All changes committed
- [ ] `.env` file NOT in repository
- [ ] `node_modules/` NOT in repository
- [ ] `.gitignore` includes: `.env`, `node_modules/`, `dist/`

### 9.2 Environment Variables
- [ ] `.env` exists locally with valid API key
- [ ] `.env` is in `.gitignore`
- [ ] Would not commit accidentally

### 9.3 Documentation
- [ ] README.md is complete and current
- [ ] DEPLOYMENT_GUIDE.md explains Render setup
- [ ] VIDEO_SCRIPT.md ready for recording
- [ ] APPROACH.md explains technical design

---

## Phase 10: Render Deployment Testing

### 10.1 Pre-Deployment
- [ ] GitHub repository is public
- [ ] All code pushed to main branch
- [ ] Render account created (https://render.com)

### 10.2 Deploy to Render
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables:
   - `ANTHROPIC_API_KEY` = your key
   - `NODE_ENV` = production
4. Start deploy

- [ ] Build command runs: `npm install && npm run build`
- [ ] Start command runs: `npm start`
- [ ] No errors in build logs
- [ ] Deployment completes successfully
- [ ] You get a URL like: `https://layout-agent-xxxxx.onrender.com`

### 10.3 Test Deployed App
```bash
# Test health endpoint
curl https://layout-agent-xxxxx.onrender.com/health

# Open in browser
# Visit: https://layout-agent-xxxxx.onrender.com
```

- [ ] Health endpoint returns OK
- [ ] Frontend loads in browser
- [ ] Chat interface visible
- [ ] Can send messages
- [ ] Transformations work
- [ ] No console errors

### 10.4 Test Deployed API
```bash
curl -X POST https://layout-agent-xxxxx.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Convert to 9:16","layout":{"canvasWidth":1080,"canvasHeight":1080,"nodes":[]},"history":[]}'
```

- [ ] Returns valid response with explanation and updatedLayout

---

## Phase 11: Video Demo Recording

### 11.1 Prepare
- [ ] Read VIDEO_SCRIPT.md
- [ ] Open live deployed app
- [ ] Test all demo transformations locally first
- [ ] Set up screen recording (Loom, OBS, etc.)

### 11.2 Record
Following VIDEO_SCRIPT.md:
- [ ] Intro: Explain what the app is
- [ ] Demo 1: Show initial layout
- [ ] Demo 2: Convert to 9:16
- [ ] Demo 3: Move headline
- [ ] Demo 4: Resize element
- [ ] Demo 5: Multi-transform
- [ ] Outro: Mention tech stack and links
- [ ] Total: 3-5 minutes

### 11.3 Upload
- [ ] Upload to Loom or YouTube (unlisted)
- [ ] Get shareable link
- [ ] Video is public/shareable
- [ ] Title mentions "Layout Agent"

---

## Phase 12: Final Submission Checklist

Gather these materials:

- [ ] **GitHub Repository Link** - https://github.com/YOUR-USERNAME/layout-agent
- [ ] **Live App URL** - https://layout-agent-xxxxx.onrender.com
- [ ] **Approach Document** - APPROACH.md (technical design)
- [ ] **Project Summary** - PROJECT_SUMMARY.md (overview)
- [ ] **Video Demo** - Loom/YouTube link (optional but recommended)

### Create Submission File
Create a file named `SUBMISSION.md`:

```markdown
# Layout Agent - Submission

## 🔗 Links

**GitHub:** https://github.com/YOUR-USERNAME/layout-agent
**Live App:** https://layout-agent-xxxxx.onrender.com
**Video Demo:** https://loom.com/share/xxxxx

## 📝 Description

Layout Agent is a chat-based AI design tool that transforms design layouts 
using natural language, powered by Claude 3.5 Sonnet. Users can:
- Convert aspect ratios (e.g., "Convert to 9:16")
- Resize elements (e.g., "Make the headline smaller")
- Reposition elements (e.g., "Move product to center")
- Use context (e.g., "Make it bigger" - understands "it")

## 🏗️ Technical Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Express.js, Node.js
- **AI:** Claude 3.5 Sonnet API
- **Deployment:** Render (full-stack single service)

## ✅ Features Implemented

- [x] Chat interface with multi-turn conversations
- [x] Real-time wireframe preview
- [x] JSON viewer with updates
- [x] Layout transformations (aspect ratio, positioning, sizing)
- [x] Error handling and validation
- [x] Production deployment
- [x] Complete documentation

## 🎯 What It Demonstrates

1. **Full-Stack Web Development** - React frontend + Express backend
2. **LLM Integration** - Effective Claude API usage
3. **Complex Domain Knowledge** - Design layout math
4. **Production-Quality Code** - Error handling, validation
5. **DevOps** - Deployment and environment configuration
```

---

## Summary

| Phase | Status | Notes |
|-------|--------|-------|
| Local Dev | ✅ | Working, tested |
| API Health | ✅ | Health endpoint responds |
| Chat UI | ✅ | Messages send/receive |
| Transformations | ✅ | All types working |
| JSON Validation | ✅ | Coordinates valid |
| Error Handling | ✅ | Graceful degradation |
| Production Build | ✅ | Builds without errors |
| Render Deploy | ✅ | Live and responding |
| Video Demo | ✅ | Recorded and uploaded |
| Submission Ready | ✅ | All materials gathered |

---

**You're ready to submit!** 🎉
