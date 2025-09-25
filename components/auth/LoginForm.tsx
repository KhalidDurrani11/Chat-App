
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

const FloatingLabelInput = ({ id, label, type, Icon }: { id: string, label: string, type: string, Icon: React.ElementType }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type={type}
            className="block w-full px-4 py-3 text-base text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-pink-500 peer"
            placeholder=" "
            autoComplete="off"
        />
        <label
            htmlFor={id}
            className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 dark:peer-focus:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 flex items-center"
        >
            <Icon className="w-5 h-5 mr-2" /> {label}
        </label>
    </div>
);

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  // TODO: Integrate Clerk login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="p-8 space-y-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-300">Sign in to continue to AetherChat</p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <FloatingLabelInput id="email" label="Email" type="email" Icon={Mail} />
        <FloatingLabelInput id="password" label="Password" type="password" Icon={Lock} />

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:from-pink-500 dark:to-orange-500 dark:hover:from-pink-600 dark:hover:to-orange-600 dark:focus:ring-orange-500 transition-all duration-300"
        >
          <LogIn size={20}/>
          Login
        </motion.button>
      </form>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="font-medium text-indigo-600 dark:text-pink-500 hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
