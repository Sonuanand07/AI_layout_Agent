import axios from 'axios';

// Set VITE_SERVER_URL when deploying (e.g. https://layout-agent-server-6a1m.onrender.com)
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
const API_URL = `${SERVER_URL.replace(/\/+$/, '')}/api`;

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

