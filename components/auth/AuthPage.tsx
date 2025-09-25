
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 opacity-80 dark:opacity-60"></div>
       <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/authbg/1920/1080')", filter: 'blur(8px)', transform: 'scale(1.1)'}}></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoginView ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="z-10 w-full max-w-md"
        >
          {isLoginView ? (
            <LoginForm onLoginSuccess={onLoginSuccess} onSwitchToSignup={() => setIsLoginView(false)} />
          ) : (
            <SignupForm onSignupSuccess={onLoginSuccess} onSwitchToLogin={() => setIsLoginView(true)} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
