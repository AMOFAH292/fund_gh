import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 relative overflow-hidden">
      <motion.h1
        className="text-9xl font-extrabold tracking-widest"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>
      <motion.p
        className="mt-4 text-2xl md:text-3xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! Page Not Found
      </motion.p>
      <motion.p
        className="mt-2 text-lg md:text-xl text-gray-200 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        The page you're looking for doesn't exist. It might have been removed, renamed, or is temporarily unavailable.
      </motion.p>
      <motion.button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Home
      </motion.button>
      {/* Decorative bouncing arrow */}
      <motion.div
        className="absolute bottom-10 flex justify-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <svg
          className="w-12 h-12 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
