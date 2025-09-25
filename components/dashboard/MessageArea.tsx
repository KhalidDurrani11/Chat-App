import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import type { Message } from '../../types';
import { CURRENT_USER_ID } from '../../constants';

interface MessageAreaProps {
  messages: Message[];
  isTyping: boolean;
}

const TypingIndicator = () => (
    <motion.div 
        className="flex items-center space-x-1.5 p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
    >
        <span className="sr-only">Typing...</span>
        <motion.div
            className="h-2 w-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
            className="h-2 w-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        ></motion.div>
        <motion.div
            className="h-2 w-2 bg-purple-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        ></motion.div>
    </motion.div>
);


const MessageArea: React.FC<MessageAreaProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto p-4 space-y-4">
      <AnimatePresence>
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isSender={msg.senderId === CURRENT_USER_ID}
            showAvatar={index === 0 || messages[index - 1].senderId !== msg.senderId}
          />
        ))}
      </AnimatePresence>
       {isTyping && (
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
           >
                <div className="bg-gray-700/80 backdrop-blur-xl rounded-2xl rounded-bl-none shadow-lg max-w-sm flex items-center border border-gray-600/50">
                    <TypingIndicator />
                </div>
           </motion.div>
       )}
    </div>
  );
};

export default MessageArea;