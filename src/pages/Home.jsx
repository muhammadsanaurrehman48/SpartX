// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { HowItWorks } from '../components/home/HowitWorks';
import { NewsSection } from '../components/home/NewsSection';
import { CallToAction } from '../components/home/CallToAction';
import AnimatedBackground from '../components/common/AnimatedBackground';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="relative min-h-screen bg-gray-50"
    >
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar/>
        <Hero />
        <Features />
        <HowItWorks />
        <NewsSection />
        <CallToAction />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;