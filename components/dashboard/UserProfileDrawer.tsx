
import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Palette, LogOut, User as UserIcon } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { users, CURRENT_USER_ID } from '../../constants';
import { useTheme } from '../../hooks/useTheme';

interface UserProfileDrawerProps {
  onClose: () => void;
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ${
        theme === 'dark' ? 'bg-pink-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ onClose }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const currentUser = user ? users[user.id] || users[CURRENT_USER_ID] : users[CURRENT_USER_ID];

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 w-full max-w-sm h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl shadow-2xl flex flex-col"
      >
        <div className="p-4 flex items-center justify-between border-b border-white/20 dark:border-black/20">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-500/20">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
          <img 
            src={user?.imageUrl || currentUser.avatarUrl} 
            alt={user?.fullName || currentUser.name} 
            className="w-24 h-24 rounded-full mb-4 ring-4 ring-indigo-500/50 dark:ring-pink-500/50" 
          />
          <h3 className="text-2xl font-bold">{user?.fullName || currentUser.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {user?.emailAddresses[0]?.emailAddress || currentUser.email}
          </p>
        </div>
        
        <div className="flex-1 px-6 space-y-4">
            <h4 className="font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm">Settings</h4>
            <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-500/10">
                    <div className="flex items-center gap-3">
                        <Palette size={20} />
                        <span>Dark Mode</span>
                    </div>
                    <ThemeToggle />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-500/10">
                    <div className="flex items-center gap-3">
                        <Bell size={20} />
                        <span>Notifications</span>
                    </div>
                     {/* Placeholder for notification toggle */}
                     <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-500/10">
                    <div className="flex items-center gap-3">
                        <UserIcon size={20} />
                        <span>Edit Profile</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6 mt-auto border-t border-white/20 dark:border-black/20">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-red-500 font-semibold rounded-lg hover:bg-red-500/10 transition-colors"
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfileDrawer;
