import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';

// Get API key from environment
const getApiKey = (): string | undefined => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    console.log('🔑 API Key found:', apiKey ? 'Yes' : 'No');
    if (apiKey) {
      console.log('🔑 API Key starts with:', apiKey.substring(0, 10) + '...');
    }
    return apiKey;
  } catch (e) {
    console.error('❌ Error getting API key:', e);
    return undefined;
  }
};

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

const initializeGemini = (): GoogleGenerativeAI | null => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('Gemini API key not found. Please set GEMINI_API_KEY in your environment variables.');
    console.error('Current environment variables:', Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API')));
    return null;
  }
  
  if (!genAI) {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Error initializing Gemini AI:', error);
      return null;
    }
  }
  return genAI;
};

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export class GeminiService {
  private model: GenerativeModel | null = null;
  private chat: ChatSession | null = null;

  constructor() {
    console.log('🚀 Initializing GeminiService...');
    const client = initializeGemini();
    if (client) {
      try {
        this.model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
        console.log('✅ Gemini model initialized successfully');
      } catch (error) {
        console.error('❌ Error creating Gemini model:', error);
      }
    } else {
      console.error('❌ Failed to initialize Gemini client');
    }
  }

  async startChat(history: ChatMessage[] = []): Promise<ChatSession> {
    if (!this.model) {
      throw new Error('Gemini model not initialized. Check your API key.');
    }
    
    this.chat = this.model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
    return this.chat;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      if (!this.model) {
        throw new Error('Gemini model not initialized. Check your API key.');
      }

      if (!this.chat) {
        await this.startChat();
      }

      const result = await this.chat!.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw new Error('Failed to get AI response');
    }
  }

  async generateResponse(userMessage: string, context?: string, messageHistory?: Array<{role: 'user' | 'model', content: string}>): Promise<string> {
    try {
      console.log('🤖 Generating response for:', userMessage.substring(0, 50) + '...');
      
      if (!this.model) {
        console.error('❌ Gemini model not initialized. Check your API key.');
        return "I'm sorry, I'm having trouble responding right now. Please check your API key configuration.";
      }

      // Build conversation history for context
      let conversationContext = '';
      if (messageHistory && messageHistory.length > 0) {
        conversationContext = 'Previous conversation:\n';
        messageHistory.slice(-6).forEach(msg => { // Keep last 6 messages for context
          conversationContext += `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}\n`;
        });
        conversationContext += '\n';
      }

      const prompt = `You are chatting casually with a friend. Keep responses short, conversational, and natural. Don't give detailed explanations unless asked. Just respond like you're texting someone.

${conversationContext}${context ? `Context: ${context}\n\n` : ''}User: ${userMessage}

Respond casually:`;

      console.log('📤 Sending prompt to Gemini:', prompt.substring(0, 100) + '...');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('📥 Received response from Gemini:', text.substring(0, 100) + '...');
      return text;
    } catch (error) {
      console.error('❌ Error generating response:', error);
      console.error('🔍 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : undefined
      });
      
      // Return a more helpful error message
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "I'm sorry, there's an issue with my API configuration. Please check the Gemini API key.";
        } else if (error.message.includes('quota')) {
          return "I'm sorry, I've reached my usage limit. Please try again later.";
        } else if (error.message.includes('network')) {
          return "I'm sorry, I'm having network issues. Please check your internet connection and try again.";
        }
      }
      
      return "I'm sorry, I'm having trouble responding right now. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
