
import React from 'react';
import { motion } from 'framer-motion';
import ChatItem from './ChatItem';
import { chats } from '../../constants';
import type { Chat } from '../../types';

interface ChatListProps {
  onChatSelect: (chat: Chat) => void;
  selectedChatId: string | undefined;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const ChatList: React.FC<ChatListProps> = ({ onChatSelect, selectedChatId }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          onSelect={() => onChatSelect(chat)}
        />
      ))}
    </motion.div>
  );
};

export default ChatList;
