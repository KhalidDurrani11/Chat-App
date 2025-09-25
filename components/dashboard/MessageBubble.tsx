
import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types';
import { users } from '../../constants';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
  showAvatar: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender, showAvatar }) => {
  const senderInfo = users[message.senderId];

  const bubbleClasses = isSender
    ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl rounded-br-md shadow-lg'
    : 'bg-white/90 dark:bg-slate-700/90 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50';

  const alignmentClasses = isSender ? 'justify-end' : 'justify-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-end gap-3 ${alignmentClasses} mb-4`}
    >
      {!isSender && showAvatar && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex-shrink-0"
        >
          <img 
            src={senderInfo.avatarUrl} 
            alt={senderInfo.name} 
            className="w-10 h-10 rounded-full ring-2 ring-white/50 dark:ring-slate-600/50 shadow-md" 
          />
        </motion.div>
      )}
      {!isSender && !showAvatar && (
        <div className="w-10 flex-shrink-0"></div>
      )}
      
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-xs md:max-w-md lg:max-w-lg`}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`px-5 py-3 ${bubbleClasses}`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </motion.div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 font-medium"
        >
          {message.timestamp}
        </motion.span>
      </div>
      
      {isSender && showAvatar && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex-shrink-0"
        >
          <img 
            src={senderInfo.avatarUrl} 
            alt={senderInfo.name} 
            className="w-10 h-10 rounded-full ring-2 ring-white/50 dark:ring-slate-600/50 shadow-md" 
          />
        </motion.div>
      )}
      {isSender && !showAvatar && (
        <div className="w-10 flex-shrink-0"></div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
