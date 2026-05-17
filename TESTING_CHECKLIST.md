# Testing & Quality Checklist

Use this checklist before submitting the project.

## ✅ Pre-Launch Checklist

### Setup & Installation
- [ ] `npm install` completes without errors
- [ ] `.env` file created in `server/` with ANTHROPIC_API_KEY
- [ ] Backend starts: `npm run dev:server` → "Server running on port 3001"
- [ ] Frontend starts: `npm run dev:client` → "http://localhost:5173"
- [ ] No errors in console after both start

### Environment
- [ ] API key is valid (test with simple curl request)
- [ ] No `.env` file committed to git
- [ ] `.gitignore` includes `node_modules`, `.env`, `dist`

## ✅ Functional Tests

### Basic Chat Flow
- [ ] Type message → "Convert to 9:16"
- [ ] Message appears in chat with user bubble
- [ ] Loading indicator shows
- [ ] Response appears from assistant
- [ ] Layout JSON updates

### Aspect Ratio Conversions
- [ ] "Convert to 9:16" → 1080×1920 ✓
- [ ] "Convert to 16:9" → 1920×1080 ✓
- [ ] "Convert to 1:1" → back to square ✓
- [ ] Wireframe visibly changes aspect ratio

### Text Transformations
- [ ] "Make headline smaller" → headline fontSize decreases
- [ ] "Make headline bigger" → headline fontSize increases
- [ ] "Change headline to red" → color updates
- [ ] Font changes reflect in preview

### Positioning Commands
- [ ] "Move headline to top" → moves to top area
- [ ] "Center the product" → product centered
- [ ] "Move badge higher" → badge moves up
- [ ] "Move offer lower" → offer moves down

### Context Understanding (Follow-ups)
- [ ] "Convert to 9:16" → Done
- [ ] "Keep the product large" → Product maintains size
- [ ] "Make it bigger" → Refers to product from previous command
- [ ] LLM correctly infers context

### Error Handling
- [ ] Bad API key → Shows error message
- [ ] Network failure → Graceful error
- [ ] LLM returns invalid JSON → Caught and shown as error
- [ ] Chat input disabled during loading
- [ ] Can retry after error

## ✅ UI/UX Tests

### Layout & Responsiveness
- [ ] Three-panel layout visible (chat, preview, JSON)
- [ ] Panels proportional (1/3 each)
- [ ] Scrollable content in each panel
- [ ] No horizontal scroll needed

### Chat Interface
- [ ] Messages display correctly (user on right, assistant on left)
- [ ] Message bubbles styled clearly
- [ ] Auto-scroll to latest message
- [ ] Input field always accessible
- [ ] Send button disabled when loading

### Wireframe Preview
- [ ] Elements rendered as colored boxes
- [ ] Elements update when layout changes
- [ ] Aspect ratio visually correct
- [ ] Element labels/names shown
- [ ] Preview refreshes instantly

### JSON Viewer
- [ ] Shows collapsed view with stats
- [ ] Expand button toggles full JSON
- [ ] Syntax readable (monospace, good contrast)
- [ ] Shows canvas size and element count
- [ ] JSON updates in real-time

## ✅ Data Validation Tests

### JSON Structure
- [ ] All nodes have required properties (id, x, y, width, height, etc.)
- [ ] Normalized coordinates (nx, ny, nw, nh) exist
- [ ] No NaN values in coordinates
- [ ] artboard exists and has children array

### Coordinate Integrity
- [ ] Absolute coords change when normalized coords exist
- [ ] Normalized coords are 0-1 range
- [ ] Element relationships preserved (parent-child)
- [ ] No elements deleted unexpectedly

### Type Safety
- [ ] All strings are strings
- [ ] All numbers are numbers
- [ ] Boolean values are booleans
- [ ] No null values in critical fields

## ✅ Performance Tests

### Response Time
- [ ] API responds within 5 seconds
- [ ] UI remains responsive (no freezing)
- [ ] Can send multiple messages (queue works)

### Data Size
- [ ] Large layouts handled (20+ elements)
- [ ] JSON viewer doesn't crash with expanded view
- [ ] Chat history scrolls smoothly

## ✅ Documentation Tests

### README.md
- [ ] Installation steps are clear and complete
- [ ] Setup can be followed exactly as written
- [ ] Examples provided
- [ ] Troubleshooting section helpful
- [ ] All technical terms explained

### APPROACH.md
- [ ] Technical decisions explained
- [ ] Architecture diagram clear
- [ ] Examples with code snippets
- [ ] Limitations acknowledged
- [ ] Future improvements listed

### QUICKSTART.md
- [ ] 5-minute setup is accurate
- [ ] Commands work as written
- [ ] Troubleshooting covers common issues

### Code Comments
- [ ] Important functions have JSDoc comments
- [ ] Complex logic explained
- [ ] No confusing variable names

## ✅ Git & Deployment Tests

### Version Control
- [ ] `.gitignore` prevents .env from committing
- [ ] No API keys in any tracked files
- [ ] README and docs are present
- [ ] All code files included

### GitHub Readiness
- [ ] Repository name is clear
- [ ] Description is accurate
- [ ] Initial commit message is clear
- [ ] Repo is public (for portfolio)

## ✅ Code Quality

### Frontend
- [ ] No console errors or warnings
- [ ] React hooks used correctly
- [ ] Components are modular
- [ ] No hardcoded values (except defaults)
- [ ] Axios calls have error handling

### Backend
- [ ] No console errors
- [ ] Try-catch blocks around API calls
- [ ] Input validation on all endpoints
- [ ] CORS configured correctly
- [ ] Error responses are informative

### Both
- [ ] Consistent naming conventions
- [ ] Proper async/await usage
- [ ] No memory leaks (components cleanup)
- [ ] Proper state management

## ✅ Security Checks

- [ ] No API keys in code
- [ ] `.env` in `.gitignore`
- [ ] `.env.example` shows required vars
- [ ] No credentials in comments
- [ ] CORS restricted (dev: localhost)
- [ ] Input validated before use

## ✅ Final Pre-Submission

### Code Cleanup
- [ ] Remove `console.log` debugging statements
- [ ] Remove commented-out code
- [ ] Remove unused imports
- [ ] Consistent code formatting

### Documentation Completeness
- [ ] README covers setup, usage, troubleshooting
- [ ] APPROACH explains architecture and decisions
- [ ] QUICKSTART shows how to get running fast
- [ ] Code comments explain complex sections

### Test Results
- [ ] All functional tests passing
- [ ] No errors in console
- [ ] Chat can handle 5+ messages
- [ ] Wireframe updates correctly
- [ ] JSON viewer works

## ✅ Deployment Preparation

### Local Testing
- [ ] Run `npm run dev` from root
- [ ] All features work
- [ ] No startup errors

### Production Ready
- [ ] `npm run build` completes
- [ ] Build folder contains frontend assets
- [ ] Backend has error handling
- [ ] Deployed backend works (can test with curl)

---

## 🧪 Test Command Examples

```bash
# Test backend is running
curl http://localhost:3001/health

# Test chat endpoint (replace KEY)
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "hello",
    "layout": {...initial layout...},
    "history": []
  }'

# Check node_modules installed
ls node_modules | wc -l  # should be many

# Verify env file exists
cat server/.env  # should show your key (don't paste publicly!)
```

---

## 📋 Test Matrix

Create this summary after testing:

| Feature | Status | Notes |
|---------|--------|-------|
| Chat messaging | ✅ Pass | |
| Aspect ratio conversion | ✅ Pass | |
| Text resizing | ✅ Pass | |
| Element positioning | ✅ Pass | |
| Context understanding | ✅ Pass | |
| Error handling | ✅ Pass | |
| Wireframe preview | ✅ Pass | |
| JSON validation | ✅ Pass | |
| Frontend UI | ✅ Pass | |
| Backend API | ✅ Pass | |
| Documentation | ✅ Pass | |

---

## 🚀 Ready to Submit When:

✅ All checkboxes above are checked
✅ Code is committed to GitHub
✅ README, APPROACH, QUICKSTART are complete
✅ No errors in console
✅ Can demonstrate 5 different transformations
✅ Proud of the work! 🎉

---

**Before submitting, do one final manual test from scratch to make sure everything works!**
