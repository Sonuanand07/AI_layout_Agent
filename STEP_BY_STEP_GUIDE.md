# 📝 STEP-BY-STEP SUBMISSION & DEPLOYMENT GUIDE

## 🎯 Your Complete Roadmap (Takes 30-45 minutes)

This guide walks you through everything step-by-step with no assumptions.

---

## PART 1: LOCAL TESTING (15 minutes)

### Step 1.1: Get Your API Key (2 minutes)

1. **Open your browser** and go to: https://console.anthropic.com/account/keys
2. **Click "Create Key"**
3. **Copy the key** (it looks like: `sk-ant-1234567890abcdef`)
4. **Save it somewhere safe** (you'll need it in a moment)

⚠️ **IMPORTANT**: Never share this key with anyone. It's like a password.

### Step 1.2: Download Node.js (if not installed)

1. Go to: https://nodejs.org/
2. Click the **LTS (Long Term Support)** button
3. Download and install (accept all defaults)
4. Restart your computer

**Verify installation**:
```bash
node --version
# Should show: v18.x.x or higher
```

### Step 1.3: Setup Your Project (5 minutes)

1. **Open PowerShell or Terminal**
2. **Navigate to your project**:
   ```bash
   cd d:\layout-agent
   ```

3. **Run the setup script**:
   ```bash
   setup.bat
   ```
   
   This script will:
   - Check that Node.js is installed ✓
   - Create `server/.env` file
   - Ask you to edit it and add your API key
   - Install all dependencies (npm install)

4. **When prompted, enter your API key**:
   - Open `server/.env` when asked
   - Replace `sk-ant-your-key-here` with your actual key
   - Save and close the file

5. **Wait for dependencies to install** (2-3 minutes)

### Step 1.4: Run Locally (5 minutes)

```bash
npm run dev
```

**Expected output**:
```
✓ Layout Agent Server running on http://localhost:3001
✓ Vite dev server running at http://localhost:5173
```

### Step 1.5: Test in Browser (3 minutes)

1. **Open your browser**
2. **Go to**: http://localhost:5173

3. **Try these commands** in the chat:
   ```
   Convert this to 9:16
   ```
   
   **You should see**:
   - ✅ Chat message appears
   - ✅ Loading indicator briefly
   - ✅ Agent response appears
   - ✅ JSON on the right updates (notice width/height changed)
   - ✅ Wireframe preview changes

4. **Try another command**:
   ```
   Make the headline smaller
   ```

5. **Try a follow-up**:
   ```
   Make it bigger
   ```

**If all of the above work → Continue to Part 2!** ✅

---

## PART 2: GIT & GITHUB SETUP (10 minutes)

### Step 2.1: Download Git (if not installed)

1. Go to: https://git-scm.com/
2. Click **Download for Windows** (or your OS)
3. Install (accept all defaults)
4. Restart Terminal/PowerShell

**Verify**:
```bash
git --version
# Should show version number
```

### Step 2.2: Initialize Git Repository

```bash
cd d:\layout-agent

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Layout agent with Claude integration"
```

**Expected output**:
```
[main (root-commit) abc1234] Initial commit...
 XX files changed, YYY insertions(+)
```

### Step 2.3: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Login** if not already logged in
3. **Fill in the form**:
   - **Repository name**: `layout-agent` (exactly this)
   - **Description**: `Chat-based design layout transformation agent`
   - **Public**: Yes (select Public)
   - **Initialize this repository with**: Leave unchecked (we already have files)
4. **Click "Create repository"**

### Step 2.4: Connect Local to GitHub

After clicking "Create", GitHub shows you some commands. **Copy and run these**:

```bash
# (Replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/layout-agent.git
git branch -M main
git push -u origin main
```

**Expected output**:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
* [new branch]      main -> main
```

### Step 2.5: Verify on GitHub

1. **Go to**: https://github.com/YOUR-USERNAME/layout-agent
2. **Refresh the page**
3. **You should see all your files** ✓

---

## PART 3: DEPLOY TO VERCEL (10 minutes)

Vercel automatically deploys from GitHub. This is the easiest option.

### Step 3.1: Sign Up for Vercel

1. **Go to**: https://vercel.com/signup
2. **Click "Continue with GitHub"**
3. **Authorize Vercel** to access your GitHub account
4. **Verify your email**

### Step 3.2: Import Your Project

1. **On Vercel dashboard**, click **"Add New Project"** or **"New"**
2. **Select GitHub** (if not selected)
3. **Search for** `layout-agent`
4. **Click it to select** it
5. **Click "Import"**

### Step 3.3: Add Environment Variables

1. **On the import screen**, scroll to **"Environment Variables"**
2. **Add two variables**:

   **First variable:**
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Paste your API key from Step 1.1
   - Click **"Add"**

   **Second variable:**
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - Click **"Add"**

3. **Check both variables are listed**

### Step 3.4: Deploy

1. **Click "Deploy"**
2. **Wait 2-5 minutes** - you'll see a progress bar
3. **Once deployment completes**, you'll see:
   ```
   Congratulations! Your project has been deployed!
   ```

### Step 3.5: Get Your Live URL

1. **Copy the URL** shown (looks like):
   ```
   https://layout-agent-xyz123.vercel.app
   ```

2. **Test your live app**:
   - Open the URL in your browser
   - Try: "Convert this to 9:16"
   - Verify it works the same as local

3. **Save this URL** - you'll need it for submission

---

## PART 4: CREATE SUBMISSION DOCUMENTS (5 minutes)

### Step 4.1: Update SUBMISSION.md

This file is already created at `d:\layout-agent\SUBMISSION.md`

**Edit it and add your links**:

Replace `YOUR-USERNAME` and `YOUR-ID` with your actual values:

```markdown
## 🔗 Submission Links

### Repository
```
https://github.com/YOUR-USERNAME/layout-agent
```

### Live Application
```
https://layout-agent-YOUR-ID.vercel.app
```
```

### Step 4.2: Create Final Commit

```bash
cd d:\layout-agent
git add SUBMISSION.md
git commit -m "Add submission links"
git push origin main
```

---

## PART 5: SUBMIT TO COMPRA (2 minutes)

### What to Submit

Prepare these links/files:

1. **GitHub Repository URL**:
   ```
   https://github.com/YOUR-USERNAME/layout-agent
   ```

2. **Live Application URL**:
   ```
   https://layout-agent-YOUR-ID.vercel.app
   ```

3. **Technical Explanation** (already in your repo):
   - `APPROACH.md` - explains technical design

4. **README** (already in your repo):
   - `README.md` - setup instructions

5. **(OPTIONAL) Loom Demo Video** (see section below)

### How to Submit

Submit to Compra using their submission form/email with:

```
Project Name: Layout Agent - Chat-Based Design Transformer

GitHub: https://github.com/YOUR-USERNAME/layout-agent
Live URL: https://layout-agent-YOUR-ID.vercel.app

Description:
A chat-based design transformation agent powered by Claude AI.
Users can modify design layouts through natural language instructions.

Features:
- Real-time chat interface
- Claude LLM integration
- Live JSON transformation
- Wireframe preview
- Multi-turn conversations with context
- Comprehensive error handling

Tech Stack:
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Express.js + Node.js
- LLM: Claude 3.5 Sonnet (Anthropic API)
- Deployment: Vercel

Documentation:
- See APPROACH.md for technical design
- See README.md for setup instructions
```

---

## OPTIONAL: RECORD A LOOM DEMO

A demo video significantly increases chances of acceptance! (3-5 minutes)

### What to Show

1. **Open the live URL** (30 seconds)
   - Show it's working

2. **Chat: "Convert to 9:16"** (1 minute)
   - Explain what happened
   - Point to JSON changes
   - Show wireframe updated

3. **Chat: "Make the headline smaller"** (1 minute)
   - Show transformation
   - Explain coordinate system

4. **Chat: "Move the product to center"** (1 minute)
   - Demonstrate positioning

5. **Explain approach** (30 seconds)
   - Hybrid AI + deterministic design
   - Normalized coordinates

### How to Record

1. Go to: https://www.loom.com/
2. Click **"Start Recording"**
3. Choose **"Browser Tab"** or **"Screen"**
4. Record your demo (max 5 minutes)
5. Click **"Stop"**
6. Click **"Share"**
7. Copy the share link
8. Include in your submission

---

## ✅ FINAL CHECKLIST

Before you submit, verify:

- [ ] Local app works: http://localhost:5173
- [ ] Chat interface functional
- [ ] "Convert to 9:16" updates layout
- [ ] JSON viewer shows updated values
- [ ] Wireframe preview updates
- [ ] Git repository created: https://github.com/YOUR-USERNAME/layout-agent
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel successfully
- [ ] Live URL works: https://layout-agent-YOUR-ID.vercel.app
- [ ] Live app tested and functional
- [ ] API key NOT in repository (check via GitHub)
- [ ] README.md present and clear
- [ ] APPROACH.md explains technical design
- [ ] SUBMISSION.md has your links
- [ ] (Optional) Loom video recorded and linked

**All checked? You're ready to submit!** ✅

---

## 🆘 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Install Node.js from nodejs.org |
| "Cannot find .env" | Run `setup.bat` again |
| "API key not defined" | Check `server/.env` has your key and server restarted |
| "Connection refused" | Ensure `npm run dev` started - should show 2 servers running |
| "Vercel build failed" | Check Vercel logs - usually missing environment variables |
| "Live URL shows 404" | Wait 5 minutes, refresh, or check Vercel deployment status |

**For more issues**: See `TROUBLESHOOTING.md`

---

## 📞 GETTING HELP

If stuck, check these files in order:

1. **QUICKSTART.md** - 5-minute setup summary
2. **TROUBLESHOOTING.md** - Common problems
3. **DEPLOYMENT_GUIDE.md** - Detailed deployment help
4. **APPROACH.md** - How the system works

---

## 🎯 TIME SUMMARY

- **Part 1 (Local Testing)**: 15 minutes
- **Part 2 (GitHub)**: 10 minutes  
- **Part 3 (Vercel Deployment)**: 10 minutes
- **Part 4 (Documentation)**: 5 minutes
- **Part 5 (Submit)**: 2 minutes
- **(Optional Part 6 - Loom Video)**: 10 minutes

**Total Time: 30-45 minutes**

---

## 🚀 YOU'RE READY!

Follow these steps in order, and you'll have a deployed, tested, production-ready application submitted to Compra.

**Next action**: 

```bash
cd d:\layout-agent
setup.bat
```

Then follow the prompts!

**Good luck! 🎉**
