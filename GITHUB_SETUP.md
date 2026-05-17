# Getting Started with GitHub

## 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `layout-agent`
3. Description: "Chat-based design layout transformation agent with Claude AI"
4. Choose: Public (for portfolio)
5. **Do NOT** initialize with README, .gitignore, or license (we have these)
6. Click "Create repository"

## 2. Push Code to GitHub

```bash
cd layout-agent

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Layout design agent MVP"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/layout-agent.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 3. Verify on GitHub

Visit: `https://github.com/USERNAME/layout-agent`

You should see:
- ✅ All files uploaded
- ✅ README.md displayed
- ✅ `.env` NOT visible (it's in .gitignore)

## 4. (Optional) Deploy to Vercel/Netlify

### Deploy Frontend to Vercel

```bash
npm i -g vercel
cd client
vercel
```

### Deploy Backend to Railway/Render

Instructions depend on platform, but generally:
1. Connect GitHub repo
2. Set environment variables (ANTHROPIC_API_KEY)
3. Deploy

---

**Now your project is on GitHub and ready for sharing! 🚀**
