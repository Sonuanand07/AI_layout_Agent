import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRoute from './routes/chat.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS Configuration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || '*' 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/chat', chatRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from client dist in production
if (NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));
  
  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`✓ Layout Agent Server running on http://localhost:${PORT}`);
  console.log(`✓ Expecting Claude API key in ANTHROPIC_API_KEY env variable`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠ WARNING: ANTHROPIC_API_KEY not set!');
  }
});
