// src/components/home/Hero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/7.jpg"
          alt="Car maintenance"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Maintain Your Vehicle <motion.span 
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Hassle-Free
          </motion.span>
        </motion.h1>
        <motion.p 
          className="mt-6 text-xl text-gray-300 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          SPART-X helps you track maintenance history, get timely reminders, and shop for the right parts for your vehicle.
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
           <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link 
              to="/signup" 
              className="relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-lg overflow-hidden shadow-lg hover:shadow-primary/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-full before:hover:translate-x-[-100%] before:transition-transform before:duration-300"
            >
              <span className="relative z-10">Get Started</span>
              <svg 
                className="w-5 h-5 ml-2 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link 
              to="/shop" 
              className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-secondary font-bold rounded-lg overflow-hidden shadow-lg hover:shadow-white/30 transition-all duration-300 before:absolute before:inset-0 before:bg-secondary before:translate-x-full before:hover:translate-x-[-100%] before:transition-transform before:duration-300 before:opacity-5"
            >
              <span className="relative z-10">Browse Products</span>
              <svg 
                className="w-5 h-5 ml-2 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};