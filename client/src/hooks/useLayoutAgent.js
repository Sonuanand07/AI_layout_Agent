import { useState, useCallback } from 'react';
import initialLayout from '../data/initialLayout.json';
import { sendChatMessage } from '../utils/api.js';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I\'m your layout design assistant. Try commands like "Convert this to 9:16", "Make the headline smaller", or "Move the product to the center". What would you like to change?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;

      setError(null);
      const userMessage = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const result = await sendChatMessage(text, layout, messages);

        // Update layout if the response contains one
        if (result.updatedLayout) {
          setLayout(result.updatedLayout);
        }

        // Add assistant response
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: result.explanation,
          },
        ]);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Sorry, I encountered an error: ${err.message}`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [layout, messages]
  );

  return {
    layout,
    messages,
    isLoading,
    error,
    sendMessage,
  };
}
