import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import UserProfileDrawer from './UserProfileDrawer';
import { chats, updateCurrentUser } from '../../constants';
import type { Chat } from '../../types';

const ChatDashboard: React.FC = () => {
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Update current user when Clerk user changes
  useEffect(() => {
    if (user) {
      updateCurrentUser(user);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden relative">
      {/* Dark Aesthetic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {isProfileDrawerOpen && <UserProfileDrawer onClose={() => setIsProfileDrawerOpen(false)} />}
      </AnimatePresence>
      
      {/* Sidebar */}
      <div className={`relative transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-full md:w-80 lg:w-96' : 'w-0'} md:block z-10 flex-shrink-0`}>
        <Sidebar
          onChatSelect={setSelectedChat}
          selectedChatId={selectedChat?.id}
          onProfileOpen={() => setIsProfileDrawerOpen(true)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 h-full">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        ) : (
          <div className="flex-1 flex items-center justify-center min-h-0 relative p-4">
            {/* Welcome Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto p-8 relative z-10"
            >
              {/* Main Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="mb-8"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full blur-xl opacity-50"></div>
                  <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-12"
              >
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Welcome to ChatFlow
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
                  Your AI-powered conversation hub. Start chatting with intelligent AI assistants.
                </p>
              </motion.div>
              
              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-300">Intelligent responses powered by Google Gemini</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
                  <p className="text-sm text-gray-300">Protected conversations with Clerk authentication</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time</h3>
                  <p className="text-sm text-gray-300">Instant messaging with smooth animations</p>
                </motion.div>
              </motion.div>

              {/* Quick Start */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-gray-400 mb-4">Select a conversation from the sidebar to get started</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Browse Conversations
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;