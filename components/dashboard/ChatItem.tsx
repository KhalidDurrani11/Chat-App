
import React from 'react';
import { motion } from 'framer-motion';
import { users, CURRENT_USER_ID } from '../../constants';
import type { Chat } from '../../types';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ChatItem: React.FC<ChatItemProps> = ({ chat, isSelected, onSelect }) => {
  const otherParticipant = chat.participants.find(p => p.id !== CURRENT_USER_ID) || chat.participants[0];
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <motion.div
      variants={itemVariants}
      onClick={onSelect}
      className={`flex items-center p-4 cursor-pointer transition-all duration-300 border-l-4 ${
        isSelected
          ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-pink-500/20 dark:to-orange-500/20 border-indigo-500 dark:border-pink-500 shadow-lg'
          : 'hover:bg-gray-500/10 border-transparent'
      }`}
      whileHover={{ 
        backgroundColor: isSelected 
          ? 'rgba(129, 140, 248, 0.3)' 
          : 'rgba(107, 114, 128, 0.15)',
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative mr-4">
        <img 
          src={otherParticipant.avatarUrl} 
          alt={chat.name} 
          className={`w-12 h-12 rounded-full transition-all duration-300 ${
            isSelected ? 'ring-2 ring-indigo-500 dark:ring-pink-500' : ''
          }`} 
        />
        {otherParticipant.isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className={`font-semibold truncate transition-colors duration-300 ${
            isSelected ? 'text-indigo-700 dark:text-pink-300' : 'text-gray-800 dark:text-gray-200'
          }`}>
            {chat.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{lastMessage.timestamp}</p>
        </div>
        <div className="flex justify-between items-start">
          <p className={`text-sm truncate pr-2 transition-colors duration-300 ${
            isSelected ? 'text-indigo-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300'
          }`}>
            {lastMessage.text}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-indigo-500 dark:bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;
