import { motion } from 'framer-motion';

const floatingVariants = {
  animate: (custom) => ({
    y: [0, custom.y, 0],
    x: [0, custom.x, 0],
    rotate: [0, custom.rotate, 0],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop",
    }
  })
};

const AnimatedBackground = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        {/* Gear Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          custom={{ y: -15, x: 5, rotate: 360, scale: 1.1, duration: 8 }}
          className="absolute top-20 left-10"
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="#1a365d" className="drop-shadow-lg">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
        </motion.div>

        {/* Engine Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          custom={{ y: -20, x: -10, rotate: -45, scale: 1.05, duration: 6 }}
          className="absolute top-1/3 right-20"
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#2563eb" className="drop-shadow-lg">
            <path d="M7 4v2h3v2H7l-2 2v3H3v-3H1v8h2v-3h2v3h3l2 2h8v-4h2v3h3V9h-3v3h-2V8h-6V6h3V4H7z" />
          </svg>
        </motion.div>

        {/* Wrench Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          custom={{ y: 15, x: 8, rotate: 90, duration: 7 }}
          className="absolute bottom-1/4 left-1/4"
        >
          <svg width="90" height="90" viewBox="0 0 24 24" fill="#1e40af" className="drop-shadow-lg">
            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
          </svg>
        </motion.div>

        {/* Speedometer Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          custom={{ y: -10, x: -5, rotate: 180, duration: 9 }}
          className="absolute bottom-20 right-1/4"
        >
          <svg width="110" height="110" viewBox="0 0 24 24" fill="#3b82f6" className="drop-shadow-lg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2.44-9.44l-2.12 2.12-2.12-2.12a2.996 2.996 0 1 1 4.24 0z" />
          </svg>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-blue-50/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.1, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    </>
  );
};

export default AnimatedBackground;