# 🎬 Video Demo Script (Loom or Screen Recording)

**Duration:** 3-5 minutes  
**Platform:** Loom, OBS, or ScreenFlow

---

## Pre-Recording Checklist

- [ ] Live app is deployed and working
- [ ] API key is valid (test locally first)
- [ ] Browser is at full screen or maximized
- [ ] Browser console is closed (F12 hidden)
- [ ] Microphone is working
- [ ] Internet connection is stable

---

## Recording Script

### Intro (30 seconds)

**Script:**
```
"Hi! I'm showing you the Layout Agent - a chat-based AI design tool.

This app lets you transform design layouts using natural language,
powered by Claude AI. 

Let me show you how it works."
```

**What to do:**
1. Open the live URL in browser
2. Show the interface (chat on left, wireframe in middle, JSON on right)
3. Don't click anything yet, just pan camera across the UI

---

### Demo 1: Initial Layout (1 minute)

**Script:**
```
"Here's our starting layout - a product showcase with headline,
product image, and offer badge. The canvas is 1080 by 1080 pixels."
```

**What to do:**
1. Show the wireframe preview
2. Point out the three elements:
   - Headline at top ("Luxury Comfort...")
   - Product image in middle
   - Offer badge at bottom right
3. Point to JSON viewer showing the coordinates

---

### Demo 2: Aspect Ratio Change (1 minute)

**Script:**
```
"Now, let's say I want this to be 9:16 - tall and narrow, like a mobile phone.
Watch what happens."
```

**What to do:**
1. Click on the chat input field
2. Type: **"Convert this to 9:16"**
3. Press Enter or click Send
4. **WAIT** for response (2-3 seconds)
5. Point to the wireframe - show it's now taller
6. Point to JSON - show coordinates updated
7. Read the assistant message explaining what changed

---

### Demo 3: Element Repositioning (1 minute)

**Script:**
```
"Great! Now it's 9:16. Let me move the headline to the top of the new layout."
```

**What to do:**
1. Type: **"Move the headline to the top"**
2. Press Enter
3. Point to wireframe - headline moved higher
4. Point to JSON - show y coordinate decreased
5. Read the response

---

### Demo 4: Follow-up Context (1 minute)

**Script:**
```
"Notice how it understands context. When I say 'Make it bigger',
the AI knows 'it' refers to the product from before."
```

**What to do:**
1. Type: **"Make the product bigger"**
2. Press Enter
3. Point to wireframe - product is now larger
4. Point to JSON - show width/height increased
5. Explain: "Each transformation updates the JSON in real-time"

---

### Demo 5: Complex Transformation (1 minute)

**Script:**
```
"You can also combine multiple instructions in one message."
```

**What to do:**
1. Type: **"Convert to 16:9 and center the headline"**
2. Press Enter
3. Show wireframe transformed to wider format
4. Show headline is centered horizontally
5. Point to console/network tab briefly to show API call

---

### Outro (30 seconds)

**Script:**
```
"That's the Layout Agent! It's a full-stack application built with:
- React for the frontend
- Express.js for the backend
- Claude AI for intelligent transformations

The code is on GitHub, and it's deployed on Render.
Thanks for watching!"
```

**What to do:**
1. Show GitHub link in description
2. Show Render/deployed URL
3. Brief mention of the tech stack
4. End with a thank you

---

## Loom Recording Tips

### Record Like This

**Start at 720p or higher**
- Loom settings: Quality → 1080p (if you have good internet)
- Microphone: Enabled
- Webcam: Disabled (just screen)

**During Recording**
- Speak clearly and not too fast
- Pause between sections (2-3 seconds)
- Read the on-screen messages from the AI
- Click slowly so UI changes are visible
- Point to elements you're talking about

**Camera Movement**
- Click in chat → type message → enter
- Wait for response
- Look at JSON (point with cursor)
- Look at wireframe (pan camera)

### Upload to Loom
1. Click **"Share"** in Loom
2. Get the shareable link (e.g., loom.com/share/xxxxx)
3. Set to **"Viewable by anyone with link"**
4. Copy link

---

## Alternative: YouTube/Screen Recording

If not using Loom, you can record locally:

### macOS: QuickTime
```bash
# Open QuickTime Player
# File → New Screen Recording
# Select area → Record
```

### Windows: Built-in Screen Recording
```bash
# Press Windows Key + Shift + S to record
# Or use Xbox Game Bar (Windows Key + G)
```

### Any OS: OBS (Free)
1. Download OBS: https://obsproject.com/
2. Add source: Display Capture
3. Configure audio: Microphone
4. Click "Start Recording"
5. Perform the demo
6. Click "Stop Recording"

---

## Chat Messages to Use in Video

### Message 1: Convert Aspect Ratio
**Input:** "Convert this to 9:16"
**Expected:** Canvas becomes 1080×1920, elements reposition

### Message 2: Resize Element
**Input:** "Move the headline to the top"
**Expected:** Headline moves higher, coordinates update

### Message 3: Understand Context
**Input:** "Make the product bigger"
**Expected:** Product grows, maintains other elements

### Message 4: Multi-Transform
**Input:** "Convert to 16:9 and center the headline"
**Expected:** Canvas becomes 1080×606, headline centers

---

## What NOT to Show

❌ Don't show API key in chat  
❌ Don't show error messages (test first!)  
❌ Don't show browser console unless explaining an error  
❌ Don't show source code (save for tech explanation)  
❌ Don't show loading screens for too long (edit out if needed)  

---

## Script Template You Can Copy

```markdown
[SECTION: INTRO - 30 SEC]
"Hi, I'm showing you the Layout Agent..."

[SECTION: DEMO 1 - 1 MIN]
"Here's our starting layout..."
[Action: Point at wireframe, show JSON]

[SECTION: DEMO 2 - 1 MIN]
"Now convert to 9:16"
[Action: Type message, press enter, wait for response]
[Action: Point at changed wireframe]

[SECTION: DEMO 3 - 1 MIN]
"Move the headline"
[Action: Type message, wait for response]

[SECTION: DEMO 4 - 1 MIN]
"Make the product bigger"
[Action: Type message, wait for response]

[SECTION: OUTRO - 30 SEC]
"That's the Layout Agent! Built with..."
```

---

## Recording Tips

| Tip | Reason |
|-----|--------|
| Use 1080p resolution | Shows details clearly |
| Speak slowly | Viewers can follow along |
| Pause after each action | Let changes sink in |
| Point with cursor | Draw attention to important parts |
| Use zoom (Cmd/Ctrl +) if text is small | Make UI readable |
| Record in good lighting | Professional appearance |
| Test audio level | Don't be too loud or quiet |

---

## Final Checklist Before Submitting

- [ ] Video shows the interface clearly
- [ ] All 4+ transformations work
- [ ] AI responses are readable
- [ ] JSON and wireframe updates visible
- [ ] Audio is clear and not too loud
- [ ] Total duration is 3-5 minutes
- [ ] Include Loom/video link in submission
- [ ] Include GitHub link in submission
- [ ] Include deployed URL in submission

---

**Video is the cherry on top!** Even without it, your app is submission-ready. ✨
