import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the Gemini API client
// NOTE: In a production environment, calls should be proxied through a backend to secure the API KEY.
// For this portfolio demo running client-side, we assume the environment variable is set.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const chatWithGemini = async (userMessage: string, history: { role: 'user' | 'model'; text: string }[]) => {
  if (!apiKey) {
    return "I'm sorry, my brain (API Key) is missing. Please check the configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Convert internal history format to Gemini chat format if needed, 
    // but for simple single-turn or short-session, we can just create a fresh chat
    // or maintain the chat instance. Here we use a stateless approach for simplicity in the service,
    // but in a real app, you'd persist the `chat` object.
    
    // Construct history for the API
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
