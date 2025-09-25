
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Smile, Paperclip, Send, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  }, [text, isLoading, onSendMessage]);

  return (
    <div className="p-4 bg-gray-800/50 backdrop-blur-xl border-t border-gray-700/50 flex-shrink-0 relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <motion.button 
          type="button" 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Smile className="text-gray-300" size={18} />
        </motion.button>
        
        <motion.button 
          type="button" 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Paperclip className="text-gray-300" size={18} />
        </motion.button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isLoading ? "AI is thinking..." : "Type a message..."}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={!text.trim() || isLoading}
          className={`p-3 rounded-2xl text-white transition-all duration-200 ${
            !text.trim() || isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-purple-500 to-blue-600 hover:shadow-lg'
          }`}
          whileHover={!isLoading && text.trim() ? { scale: 1.05 } : {}}
          whileTap={!isLoading && text.trim() ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;
