import React from "react";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const AdvancedAboutSection = () => {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Full-screen background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={assets.barca}
        autoPlay
        loop
        muted
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl px-8 py-12 text-center">
        <motion.h2
          className="text-6xl md:text-8xl font-extrabold text-white tracking-tight"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          About GhanaFund
        </motion.h2>
        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-200"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Revolutionizing crowdfunding with cutting-edge technology. GhanaFund empowers communities to bring dreams to life through transparency, security, and creativity.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="/learn-more"
            className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-2xl transform hover:scale-105 transition duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdvancedAboutSection;
