import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import ChatHeader from './ChatHeader';
import MessageArea from './MessageArea';
import MessageInput from './MessageInput';
import type { Chat, Message } from '../../types';
import { CURRENT_USER_ID, users } from '../../constants';
import { geminiService } from '../../services/gemini';

interface ChatWindowProps {
  chat: Chat;
  onToggleSidebar: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onToggleSidebar }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize the other participant to avoid recalculation
  const otherParticipant = useMemo(() => {
    return chat.participants.find(p => p.id !== CURRENT_USER_ID) || chat.participants[0];
  }, [chat.participants]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Update messages when chat changes
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !otherParticipant) return;

    // Add user's message immediately
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: user?.id || CURRENT_USER_ID,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Prepare message history for context
      const messageHistory = messages.map(msg => ({
        role: msg.senderId === user?.id || msg.senderId === CURRENT_USER_ID ? 'user' as const : 'model' as const,
        content: msg.text
      }));

      // Get AI response using Gemini with conversation history
      const aiResponse = await geminiService.generateResponse(
        text.trim(),
        `You are chatting with ${otherParticipant.name}`,
        messageHistory
      );
      
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: otherParticipant.id,
      };

      // Add AI response after a short delay for better UX
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: `msg-error-${Date.now()}`,
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: otherParticipant.id,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading, otherParticipant, user?.id]);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 backdrop-blur-sm h-full relative overflow-hidden min-h-0">
      {/* Dark Aesthetic Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", 
            filter: 'blur(3px)', 
            transform: 'scale(1.1)' 
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col h-full z-10 min-h-0">
        <ChatHeader chat={chat} onToggleSidebar={onToggleSidebar} />
        
        <div className="flex-1 overflow-hidden min-h-0">
          <MessageArea messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;