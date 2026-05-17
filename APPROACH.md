# Approach & Technical Design

## Project Overview

This is a **chat-based layout design transformation agent** that uses Claude AI to intelligently modify design JSON structures based on natural language instructions.

## Core Architecture

### Three-Layer Design

```
┌─────────────────────────────────────┐
│     React Chat UI (Frontend)        │  ← User chat interface + wireframe
├─────────────────────────────────────┤
│     Express API Server              │  ← Route handling, validation
├─────────────────────────────────────┤
│     Claude LLM + Transformers       │  ← Semantic understanding + math
└─────────────────────────────────────┘
```

### Data Flow

```
User Input (Chat) 
    ↓
API Request (message + current layout + history)
    ↓
System Prompt + LLM Processing
    ↓
JSON Validation
    ↓
Updated Layout + Explanation
    ↓
Frontend Update + Wireframe Re-render
```

## Key Design Decisions

### 1. **Normalized Coordinates as First-Class Citizens**

**The Problem**: Design layouts have both absolute (pixel) and relative (0-1) coordinates.

**The Solution**: Treat normalized coordinates (`nx`, `ny`, `nw`, `nh`) as the source of truth.

When canvas size changes (e.g., 1:1 → 9:16), we:
1. Update canvas dimensions
2. Recalculate absolute coords from normalized values

```javascript
// When converting 1080×1080 to 1080×1920:
node.x = node.nx * newWidth   // Recalculate from ratio
node.y = node.ny * newHeight  // Recalculate from ratio
```

This elegant approach ensures **layout-agnostic transformations**.

### 2. **Hybrid AI + Deterministic Approach**

**Why Hybrid?**
- AI excels at semantic understanding: "headline", "product", "badge"
- Determinism excels at math: coordinate calculations, size ratios

**How it works**:
1. **LLM** identifies which elements to transform and how semantically
2. **Backend** validates and executes math-heavy transformations
3. **Validation layer** ensures JSON integrity

**Example**: "Make the headline smaller"
- LLM identifies: `text_1778486306230_8` is the headline
- Backend executes: multiply fontSize and dimensions by 0.8
- Validator confirms: all coordinates remain valid

### 3. **System Prompt as Core Intelligence**

The system prompt is the "AI policy document" - it defines:
- How the agent understands design elements
- What transformations are allowed
- How to balance competing goals (e.g., "keep product large" vs "fit to frame")

Key sections in the prompt:

```
- COORDINATE SYSTEM EXPLANATION
  (Ensures LLM understands nx/ny/nw/nh)

- SEMANTIC ROLES
  (How to identify headline, product, badge, etc.)

- TRANSFORMATION GUIDELINES
  (Rules for safe, sensible modifications)

- OUTPUT FORMAT
  (Strict JSON schema to prevent hallucinations)
```

**Result**: Well-structured output that's easy to validate and parse.

### 4. **Conversation History for Context**

The agent maintains the last 6 messages to understand follow-ups:

```
User: "Convert to 9:16"
Agent: "Done."

User: "Make it bigger"  ← Understands "it" = the product from context
Agent: "Increased product size."
```

Implementation:
- Frontend passes `history` array with last N messages
- LLM uses context to resolve ambiguous references
- Prevents one-shot tool behavior

### 5. **Multi-Layer Validation**

Never trust LLM output directly:

```javascript
try {
  const response = await callLLM(...)      // Might hallucinate JSON
  validateChatResponse(response)             // Catch structural errors
  validateLayout(response.updatedLayout)     // Catch missing fields
  // ... use response safely
} catch (err) {
  // Graceful degradation
}
```

Each validation layer catches different failure modes:
- `validateChatResponse`: Checks response shape
- `validateLayout`: Checks every node has required fields
- JSON.parse: Catches malformed JSON

## Technical Decisions Explained

### Why Claude (not GPT)?

**Criteria evaluated**:
- ✅ JSON output quality (Claude superior)
- ✅ Instruction following (Claude reliable)
- ✅ Reasoning (Claude strong at design/layout reasoning)
- ✅ Cost (competitive)
- ✅ API latency (acceptable)

Claude's structured output and reasoning capabilities make it ideal for deterministic transformations.

### Why React + Vite?

- **Component model**: Chat, preview, JSON viewer as separate concerns
- **Hot reload**: Fast iteration during development
- **TypeScript-ready**: Can add types later
- **Tailwind**: Low-friction styling

### Why Express + Node.js?

- **Simplicity**: Minimal overhead for API needs
- **JavaScript everywhere**: Shared language reduces context switching
- **Ecosystem**: Solid middleware (CORS, error handling)
- **Rapid development**: Perfect for MVPs

## How Instructions Are Processed

### Example: "Convert to 9:16"

**Step 1: Frontend → Backend**
```json
{
  "message": "Convert to 9:16",
  "layout": { ... current layout ... },
  "history": [ ... ]
}
```

**Step 2: Build Prompt**
- System prompt includes: canvas size, element descriptions, rules
- User message: "Convert to 9:16"
- History: Last 6 messages for context

**Step 3: Call LLM**
- Claude reads the prompt
- Identifies aspect ratio 9:16 = 1080×1920
- Calculates new positions using normalized coords
- Returns JSON

**Step 4: Validate**
```javascript
validateLayout(response.updatedLayout)
// ✓ All nodes present
// ✓ All coordinates valid
// ✓ Ratios consistent
```

**Step 5: Return to Frontend**
- Layout updates instantly
- Wireframe re-renders
- Chat shows explanation

## Handling Edge Cases

### Case 1: User asks for impossible task
**"Make headline use 150% of canvas width"**
- LLM recognizes constraint violation
- Returns reasonable interpretation
- Validation ensures result is sane

### Case 2: Ambiguous reference
**"Move it to the top"** (no prior context)
- LLM has no previous message history
- Falls back to default interpretation or asks for clarification
- Avoids corrupting layout

### Case 3: Network timeout
**Backend doesn't respond**
- Frontend catches error
- Shows friendly message
- Doesn't corrupt local state
- User can retry

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| LLM response | 2-5s | Claude API latency |
| JSON parse | <10ms | Validation overhead |
| Layout update | <1ms | React reconciliation |
| Wireframe render | <100ms | Re-layout + paint |
| **Total** | **2-6s** | Dominated by LLM |

**Optimization opportunities**:
- Implement streaming responses (reduce apparent latency)
- Cache similar transformations
- Batch operations

## Semantic Understanding

The system prompt teaches Claude about design patterns:

```
ELEMENTS IT UNDERSTANDS:
- Product → main focal point, keep prominent
- Headline → largest text, primary message
- Offer badge → eye-catching, motivational
- Background → full-size image, coverage
```

This semantic layer is crucial. Without it, Claude might:
- Make the product small when "converting to 9:16"
- Miss the visual hierarchy
- Create unbalanced layouts

**With the prompt**: Claude reasons like a designer.

## Testing Strategy

### Functional Tests
```
✓ "Convert to 9:16" → 1080×1920 canvas
✓ "Make headline smaller" → reduced fontSize + height
✓ "Move product up" → updated y and ny coordinates
✓ Conversation context → follow-ups resolve correctly
✓ Error handling → graceful failures
```

### Validation Tests
```
✓ All nodes retain IDs
✓ Coordinates are numbers
✓ Normalized values between 0-1
✓ No elements added/removed
```

## Known Limitations & Why

| Limitation | Reason | Fix |
|-----------|--------|-----|
| No element add/remove | Requires UUID generation, structure updates | DB + ID manager |
| No undo/redo | Single request model | Session store + history |
| No persistence | MVP scope | Database (Firebase/Supabase) |
| Single user | No auth/isolation | Auth layer + DB |
| Basic wireframe | Asset rendering complex | Image proxy + cache |

## Future Improvements

### Short Term
- [ ] Add "undo" via history playback
- [ ] Export transformed design as JSON
- [ ] Save design versions

### Medium Term
- [ ] Support element addition/deletion
- [ ] Real image preview (not placeholders)
- [ ] Batch operations ("Move all text up")
- [ ] Design templates

### Long Term
- [ ] Figma integration (import/export)
- [ ] Real-time collaboration
- [ ] Mobile app
- [ ] Design system enforcement

## Metrics & Monitoring

What to track:
- LLM response time (latency)
- Validation success rate (reliability)
- Most common instructions (usage)
- Error types (debugging)
- User satisfaction (surveys)

## Lessons Learned

1. **Normalized coordinates are magic** - They unlock simple math for complex transformations
2. **System prompts matter more than model** - A great 3.5 with good prompt beats mediocre 4 with bad prompt
3. **Validation is non-negotiable** - Always assume LLM can hallucinate
4. **Context is everything** - Conversation history makes AI feel smarter
5. **Keep it simple** - Three-layer architecture beats "AI does everything"

---

**This approach balances AI reasoning with deterministic safety, enabling robust design transformations.**
