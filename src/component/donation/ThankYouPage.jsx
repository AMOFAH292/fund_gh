import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  const navigate = useNavigate();

  // Optionally, redirect back to the campaigns page after a delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/campaigns");
    }, 7000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Thank You!
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Your donation has made a difference. We are truly grateful for your
          support.
        </p>
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <svg
            className="w-20 h-20 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
            4.42 3 7.5 3c1.74 0 3.41.81 
            4.5 2.09C13.09 3.81 14.76 3 16.5 
            3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
            6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </motion.div>
        <p className="text-sm text-gray-500">
          Redirecting you back to campaigns shortly...
        </p>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
