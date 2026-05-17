# Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### ❌ "npm command not found"
**Cause**: Node.js not installed
**Solution**:
1. Download from https://nodejs.org (LTS version)
2. Install and restart terminal
3. Verify: `node --version` and `npm --version`

#### ❌ "EACCES: permission denied"
**Cause**: Permission issues on Linux/Mac
**Solution**:
```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

#### ❌ "Module not found: @anthropic-ai/sdk"
**Cause**: Dependencies not installed
**Solution**:
```bash
cd server
npm install @anthropic-ai/sdk
cd ..
```

---

### API Key Issues

#### ❌ "ANTHROPIC_API_KEY not set"
**Cause**: Missing `.env` file or empty key
**Solution**:
```bash
# 1. Create .env in server/
cd server
cat > .env << EOF
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3001
NODE_ENV=development
EOF
cd ..

# 2. Verify it worked
cat server/.env
```

#### ❌ "Invalid API key"
**Cause**: Wrong key format or expired key
**Solution**:
1. Go to https://console.anthropic.com
2. Generate a new API key
3. Copy it carefully (no extra spaces)
4. Update `.env` file
5. Restart server: `npm run dev:server`

#### ❌ "API rate limited / 429 error"
**Cause**: Too many requests too fast
**Solution**:
- Wait a few seconds between requests
- Check Anthropic dashboard for current limits
- Contact Anthropic support if limit is low

---

### Port Issues

#### ❌ "Port 3001 already in use"
**Cause**: Another app using port 3001
**Solution**:

**Option 1: Change the port**
```bash
# Edit server/.env
PORT=3002

# Update frontend proxy in client/vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:3002',  // Change 3001 to 3002
    changeOrigin: true,
  },
}
```

**Option 2: Kill the app using the port**
```bash
# Find what's using port 3001
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Kill it
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

#### ❌ "Frontend can't reach backend"
**Cause**: Port mismatch or backend not running
**Solution**:
```bash
# 1. Check backend is running
curl http://localhost:3001/health
# Should return: {"status":"ok",...}

# 2. If not running, start it
npm run dev:server

# 3. Check vite.config.js points to correct port
cat client/vite.config.js | grep target
```

---

### Running Issues

#### ❌ `npm run dev` fails to start
**Cause**: Missing dependencies or port conflict
**Solution**:
```bash
# 1. Clean install
rm -rf node_modules
npm install

# 2. Start separately
npm run dev:server  # Terminal 1
npm run dev:client  # Terminal 2
```

#### ❌ "Cannot find file: ./initialLayout.json"
**Cause**: Data file missing
**Solution**:
```bash
# Verify file exists
ls -la client/src/data/initialLayout.json

# If missing, it was created in setup
# If really gone, recreate it with provided JSON
```

#### ❌ Vite shows "File not found" errors
**Cause**: Import path incorrect
**Solution**:
- Check all imports use correct paths
- Use relative paths: `./data/file.json` not `/data/file.json`
- Verify files exist where imported

---

### Runtime Issues

#### ❌ Chat sends but no response
**Cause**: Backend error or API call failed
**Solution**:
```bash
# 1. Check browser console (F12)
# Should show error message

# 2. Check backend logs
# Terminal running server should show error

# 3. Verify API key
echo $ANTHROPIC_API_KEY
# Should show your key

# 4. Test API directly
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message":"hello",
    "layout":{...},
    "history":[]
  }'
```

#### ❌ Wireframe not updating
**Cause**: Layout JSON invalid or React not re-rendering
**Solution**:
- Check browser console for errors
- Verify layout JSON structure is valid
- Open DevTools → React tab → see state change
- Hard refresh browser: `Ctrl+Shift+R`

#### ❌ JSON viewer shows "[object Object]"
**Cause**: Layout JSON circular reference
**Solution**:
- Unlikely in this app, but if it happens:
- Check server logs for parsing errors
- Validate layout structure manually

---

### Mac-Specific Issues

#### ❌ "Command not found: npm"
**Solution**: Install Node.js from https://nodejs.org

#### ❌ Port permission denied
**Solution**:
```bash
# Ports < 1024 need sudo on Mac
# Use ports >= 1024 instead
PORT=3001  # ✅ Works without sudo
PORT=80    # ❌ Needs sudo
```

---

### Windows-Specific Issues

#### ❌ "npm: The term 'npm' is not recognized"
**Solution**:
- Restart terminal after installing Node.js
- Or manually add to PATH: `C:\Program Files\nodejs\`

#### ❌ "command not found: curl"
**Solution**: Use PowerShell instead of CMD
```powershell
Invoke-WebRequest -Uri http://localhost:3001/health
```

#### ❌ "ENOENT: no such file or directory"
**Cause**: Path issues with Windows backslashes
**Solution**: Use forward slashes in code
```javascript
// ❌ Wrong
import layout from 'client\src\data\initialLayout.json'

// ✅ Right
import layout from './data/initialLayout.json'
```

---

### Linux-Specific Issues

#### ❌ "EACCES: permission denied"
**Solution**:
```bash
# Make npm work without sudo
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

#### ❌ Port 5173 or 3001 already in use
**Solution**:
```bash
# Find process using port
sudo lsof -i :3001

# Kill it
sudo kill -9 <PID>
```

---

### React-Specific Issues

#### ❌ React component not rendering
**Cause**: Return value missing or wrong
**Solution**:
```javascript
// ❌ Wrong
function Component() {
  <div>...</div>  // Missing return
}

// ✅ Right
function Component() {
  return <div>...</div>
}
```

#### ❌ "hooks can only be used inside a function component"
**Cause**: Hook used in non-component file
**Solution**: Move hook calls inside React component

---

### Express/Backend Issues

#### ❌ "Cannot find module 'express'"
**Solution**:
```bash
cd server
npm install express
```

#### ❌ CORS error in browser console
**Cause**: Backend not accepting frontend requests
**Solution**:
```javascript
// In server/index.js, verify CORS is set up:
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
```

#### ❌ "res.json is not a function"
**Cause**: Express middleware not initialized
**Solution**: Ensure `express.json()` is used
```javascript
app.use(express.json());  // ← Add this line
```

---

### Claude API Issues

#### ❌ "Unexpected token < in JSON"
**Cause**: LLM returning HTML error instead of JSON
**Solution**:
- Check API key is valid
- Check API isn't overloaded (check Anthropic status)
- Retry in a few seconds

#### ❌ "Model not found: claude-3-5-sonnet"
**Cause**: Wrong model name or model not available
**Solution**:
- Use correct model: `claude-3-5-sonnet-20241022`
- Check available models at https://console.anthropic.com

#### ❌ "Invalid prompt format"
**Cause**: Prompt contains invalid characters or structure
**Solution**:
- Check system prompt in `server/prompts/systemPrompt.js`
- Ensure JSON is valid
- Test with curl and simpler prompt

---

## 🆘 Still Stuck?

### Debug Checklist

Before asking for help, verify:
- [ ] `node --version` shows v18+
- [ ] `.env` file exists with API key
- [ ] `npm install` completed without errors
- [ ] Backend starts: `npm run dev:server`
- [ ] Frontend starts: `npm run dev:client`
- [ ] Browser console (F12) shows no errors
- [ ] Terminal logs show no errors
- [ ] Ports 3001 and 5173 are not in use

### Getting Help

1. **Check relevant section above** in this file
2. **Review error message carefully** - it usually tells you what's wrong
3. **Check terminal logs** - backend errors show there
4. **Check browser console** - frontend errors show there (F12)
5. **Search GitHub issues** for similar problems
6. **Create issue** with:
   - Full error message
   - What you tried
   - What OS you're on
   - Output of `npm --version` and `node --version`

---

## 📞 Quick Support Checklist

```bash
# Verify everything is set up
node --version          # Should be 18+
npm --version           # Should exist
cat server/.env         # Should show your key
ls client/src/data/*.json  # Should show initialLayout.json

# Test each component
curl http://localhost:3001/health  # Backend health
curl http://localhost:5173         # Frontend running

# Check no errors
npm run dev 2>&1 | grep -i error   # Should be empty
```

---

**If all else fails, try the nuclear option:**

```bash
# Complete clean install
rm -rf node_modules package-lock.json
npm install
npm run dev:server  # In one terminal
npm run dev:client  # In another terminal
```

---

**99% of issues are:**
1. Missing `.env` file
2. Wrong API key
3. Dependencies not installed
4. Port already in use
5. Not running both servers

Start with these! 🚀
