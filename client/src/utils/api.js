import axios from 'axios';

// Configuration for API endpoint
// In production (Render): Use relative path since frontend & backend are same domain
// In development: Use localhost:3001
const API_URL = 
  import.meta.env.MODE === 'production' || typeof window === 'undefined'
    ? '/api'
    : `http://localhost:3001/api`;

export async function sendChatMessage(message, layout, history) {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message,
      layout,
      history: history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to send message to server');
  }
}

