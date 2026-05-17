# Layout Design Agent - Chat-Based Design JSON Transformer

A full-stack application that uses Claude AI to transform design layouts via natural language chat. Users can ask the agent to resize, reposition, and modify design elements through conversational instructions.

## Features

✨ **Chat Interface** - Intuitive text-based design instructions
🎨 **Live Wireframe Preview** - Real-time visual feedback of layout changes
🤖 **Claude Integration** - Advanced LLM understanding of design semantics
📐 **JSON Transformation** - Accurate coordinate and size calculations
💬 **Context-Aware** - Understands follow-up instructions and references
🔒 **Validated Output** - Safe JSON transformations with comprehensive validation

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **LLM**: Claude 3.5 Sonnet (Anthropic API)
- **Language**: JavaScript/JSX

## Prerequisites

- Node.js v18 or newer
- npm or yarn
- An Anthropic API key (get one at https://console.anthropic.com)
- Git

## Installation

### 1. Clone and Navigate

```bash
git clone https://github.com/yourusername/layout-agent.git
cd layout-agent
```

### 2. Set Up Environment Variables

Create `.env` file in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and add your API key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
PORT=3001
NODE_ENV=development
```

⚠️ **Never commit the `.env` file!** It's already in `.gitignore`.

### 3. Install Dependencies

```bash
# Install all dependencies (workspaces)
npm install

# Or install individually:
npm install -w client
npm install -w server
```

## Running the Application

### Development Mode (with auto-reload)

```bash
# Run both frontend and backend simultaneously
npm run dev

# Or run them separately in different terminals:
# Terminal 1 - Backend:
npm run dev:server

# Terminal 2 - Frontend:
npm run dev:client
```

The application will open at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### Production Build

```bash
npm run build
```

## How to Use

1. **Open the app** at http://localhost:5173
2. **View the initial design** - The wireframe preview shows the current layout
3. **Chat with the agent** - Type natural language instructions like:
   - "Convert this to 9:16"
   - "Make the headline smaller"
   - "Move the product to the center"
   - "Make the offer badge higher"
   - "Keep the product large"
4. **Watch it transform** - The layout updates in real-time with explanations

## Example Prompts

```
"Convert this design to 9:16"
→ Changes canvas from 1080×1080 to 1080×1920, repositions all elements

"Make the headline smaller"
→ Reduces headline font size, adjusts text node height

"Move the headline to the top"
→ Repositions headline to top of canvas with padding

"Keep the product large but make it higher"
→ Resizes product appropriately while moving it up

"Change the layout to 16:9 for YouTube"
→ Converts to 1920×1080 widescreen format
```

## Project Structure

```
layout-agent/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── WireframePreview.jsx
│   │   │   └── JsonViewer.jsx
│   │   ├── hooks/
│   │   │   └── useLayoutAgent.js    # Main state management
│   │   ├── utils/
│   │   │   └── api.js              # API communication
│   │   ├── data/
│   │   │   └── initialLayout.json   # Sample design
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express backend
│   ├── routes/
│   │   └── chat.js            # POST /api/chat endpoint
│   ├── services/
│   │   ├── llmService.js      # Claude API wrapper
│   │   └── layoutTransforms.js
│   ├── prompts/
│   │   └── systemPrompt.js    # AI behavior definition
│   ├── utils/
│   │   └── jsonValidator.js   # Output validation
│   ├── index.js               # Server entry point
│   ├── .env.example
│   └── package.json
│
├── README.md                  # This file
├── APPROACH.md               # Technical approach
├── package.json              # Workspace config
└── .gitignore
```

## API Endpoint

### POST `/api/chat`

Transforms layout based on user instruction.

**Request:**
```json
{
  "message": "Convert to 9:16",
  "layout": { ... layout JSON ... },
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "explanation": "Converted canvas to 9:16 aspect ratio",
  "updatedLayout": { ... modified layout ... }
}
```

## Troubleshooting

### Issue: "ANTHROPIC_API_KEY not set"

**Solution**: Make sure you've created `server/.env` with your API key.

```bash
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > server/.env
```

### Issue: Port 3001 already in use

**Solution**: Change the PORT in `.env`:

```
PORT=3002
```

Then update the client to use the new port.

### Issue: Frontend can't connect to backend

**Solution**: Ensure both servers are running:
- Backend: `http://localhost:3001` (or your chosen port)
- Frontend: `http://localhost:5173`

The Vite proxy should redirect `/api` calls to the backend.

### Issue: LLM returns invalid JSON

**Solution**: This is caught and validated. Check the server logs for specific error. The system prompt is tuned to return valid JSON - if issues persist, ensure you're using a recent Claude model.

## Performance & Limitations

- **Response time**: 2-5 seconds per request (Claude API latency)
- **Layout size**: Handles designs with up to 50+ elements efficiently
- **Conversation context**: Maintains last 6 messages for follow-up understanding
- **Concurrent requests**: Single request at a time (UI disables input during processing)

## Extending the Application

### Adding More Transformation Operations

Edit `server/services/layoutTransforms.js` to add new transformation functions:

```javascript
export function rotateElement(layout, nodeId, angle) {
  // Your implementation
}
```

### Customizing the AI Behavior

Edit `server/prompts/systemPrompt.js` to:
- Change how the LLM understands design semantics
- Add new design guidelines
- Adjust transformation preferences

### Changing the Initial Design

Replace `client/src/data/initialLayout.json` with your own design JSON.

## Development

### Tech Choices & Rationale

1. **React + Vite**: Fast hot reload, modern tooling, component-driven
2. **Tailwind CSS**: Rapid UI development, responsive design
3. **Express**: Lightweight, simple, perfect for API servers
4. **Claude API**: Superior reasoning about design semantics
5. **Normalized coordinates**: Layout-agnostic transformations (key insight!)

### Key Insights

- **Normalized coordinates** (0-1 scale) are essential for aspect ratio changes
- **System prompts** > model selection (well-crafted prompts matter more)
- **Validation layers** prevent cascading JSON corruption
- **Conversation context** enables natural follow-up understanding

## Known Limitations

1. **No real-time collaboration** - Single user, no persistence
2. **Canvas size only** - Can't add/remove elements yet (could be extended)
3. **No PSD import** - Works with provided JSON format only
4. **Basic wireframe** - Doesn't render actual assets, just placeholders
5. **No undo/redo** - Each request is independent

## Future Enhancements

- [ ] Persistent design history (SQLite/MongoDB)
- [ ] Add/remove elements support
- [ ] Export to PSD/Figma
- [ ] Real-time multi-user collaboration
- [ ] Advanced image rendering in preview
- [ ] Design templates and presets
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the APPROACH.md for technical details
3. Open an issue on GitHub

---

**Built with ❤️ for design-forward development**
