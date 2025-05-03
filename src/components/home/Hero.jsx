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
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/signup" className="btn-primary text-center inline-block">
              Get Started
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/shop" className="bg-white text-secondary font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center inline-block">
              Browse Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};