
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Settings } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import ChatList from './ChatList';
import { users, CURRENT_USER_ID } from '../../constants';
import type { Chat } from '../../types';

interface SidebarProps {
  onChatSelect: (chat: Chat) => void;
  selectedChatId: string | undefined;
  onProfileOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect, selectedChatId, onProfileOpen, isOpen, onClose }) => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = user ? users[user.id] || users[CURRENT_USER_ID] : users[CURRENT_USER_ID];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="h-full flex flex-col bg-gray-900/90 backdrop-blur-2xl border-r border-gray-700 overflow-hidden shadow-xl"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-700 flex-shrink-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={onProfileOpen}
              >
                <img
                  src={user?.imageUrl || currentUser.avatarUrl}
                  alt={user?.fullName || currentUser.name}
                  className="w-12 h-12 rounded-full ring-2 ring-purple-400/50 shadow-lg"
                />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.fullName || user?.firstName || 'User'}
                </h1>
                <p className="text-sm text-gray-300">AI Conversations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={20} className="text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Settings size={20} className="text-gray-300" />
              </motion.button>
              <button 
                onClick={onClose} 
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <ChatList onChatSelect={onChatSelect} selectedChatId={selectedChatId} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-gradient-to-r from-gray-800/50 to-purple-900/50">
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
