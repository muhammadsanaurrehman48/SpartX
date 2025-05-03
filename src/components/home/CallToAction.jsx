// src/components/home/CallToAction.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CallToAction = () => {
  return (
    // Using a darker gray background for a sleek look
    <div className="bg-gray-600 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10"
        initial={{ x: 100, y: -100 }}
        animate={{ 
          x: [100, 120, 100], 
          y: [-100, -80, -100],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-10"
        initial={{ x: -50, y: 50 }}
        animate={{ 
          x: [-50, -30, -50], 
          y: [50, 30, 50],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
        {/* Animated heading */}
        <motion.h2 
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-2xl block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to start tracking?
          </motion.span>
          {/* Slightly less bright text for the secondary line */}
          <motion.span 
            className="block text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sign up for SPART-X today.
          </motion.span>
        </motion.h2>
        
        <motion.div 
          className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-md shadow">
            {/* Primary button with a vibrant background and clear hover */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup" className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300">
                Get Started
              </Link>
            </motion.div>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            {/* Secondary button with a less dominant style */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/shop" className="bg-white text-gray-800 font-medium py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300">
                Browse Shop
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};