import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

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
    throw new Error(
      error.response?.data?.error || 'Failed to send message to server'
    );
  }
}
