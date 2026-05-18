import express from 'express';
import { callLLM } from '../services/llmService.js';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';
import { validateLayout, validateChatResponse, ensureNormalizedCoordinates } from '../utils/jsonValidator.js';
import {
  resizeArtboard,
  moveNode,
  resizeNode,
} from '../services/layoutTransforms.js';

const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, layout, history } = req.body;

    if (!message || !layout) {
      return res.status(400).json({
        error: 'Missing required fields: message and layout',
      });
    }

    // Validate input layout
    validateLayout(layout);

    // Build the system prompt with current layout context
    const systemPrompt = buildSystemPrompt(layout);

    // Format message history for the LLM
    const formattedMessages = [
      ...(history || []).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Call the LLM
    const llmResponse = await callLLM(systemPrompt, formattedMessages);

    // Validate the response structure
    validateChatResponse(llmResponse);

    // Fix any missing normalized coordinates (safety net for LLM inconsistencies)
    llmResponse.updatedLayout = ensureNormalizedCoordinates(llmResponse.updatedLayout);

    // Validate the updated layout
    validateLayout(llmResponse.updatedLayout);

    // Return the response
    res.json({
      explanation: llmResponse.explanation,
      updatedLayout: llmResponse.updatedLayout,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
});

export default router;
