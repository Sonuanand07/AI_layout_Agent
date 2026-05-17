import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import chatRoute from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/chat', chatRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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
