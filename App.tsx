
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { ThemeProvider } from './contexts/ThemeContext';
import ChatDashboard from './components/dashboard/ChatDashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Clerk Auth Component - Auto-forward to sign-in
const ClerkAuthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", filter: 'blur(2px)', transform: 'scale(1.05)'}}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <div className="p-12 space-y-8 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
                  <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    ChatFlow
                  </h1>
                  <p className="text-xl text-blue-100 mb-8">Your AI-powered conversation hub</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center space-x-2"
          >
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In to Continue
              </motion.button>
            </SignInButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="w-full h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <SignedIn key="dashboard">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ChatDashboard />
              </motion.div>
            </SignedIn>
            <SignedOut key="auth">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ClerkAuthPage />
              </motion.div>
            </SignedOut>
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

// Root App with Clerk Provider
function App() {
  const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900">
        <div className="text-center max-w-md mx-auto p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-200 dark:border-red-700">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Configuration Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Clerk authentication is not configured. Please set up your environment variables.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Steps to fix:</h3>
            <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>1. Copy <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env.example</code> to <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env</code></li>
              <li>2. Get your Clerk publishable key from <a href="https://dashboard.clerk.com" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">dashboard.clerk.com</a></li>
              <li>3. Add it to <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code></li>
              <li>4. Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
