// src/components/home/HowItWorks.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const HowItWorks = () => {
    const steps = [
      {
        number: "01",
        title: "Create Your Account",
        description: "Sign up for a free account and add your vehicle details including make, model, and year.",
      },
      {
        number: "02",
        title: "Set Up Maintenance Tracking",
        description: "Enter your vehicle's current maintenance status and set your preferences for reminders.",
      },
      {
        number: "03",
        title: "Get Reminders",
        description: "Receive notifications when it's time for oil changes, tire rotations, or other maintenance tasks.",
      },
      {
        number: "04",
        title: "Shop for Parts",
        description: "Browse parts specifically recommended for your vehicle and have them delivered to your door.",
      },
    ];
  
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.3
        }
      }
    };
    
    const item = {
      hidden: { opacity: 0, x: -50 },
      show: { 
        opacity: 1, 
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      }
    };

    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How SPART-X Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get started with SPART-X in just a few simple steps.
            </p>
          </motion.div>
  
          <div className="mt-16">
            <motion.div 
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  variants={item}
                >
                  <motion.div 
                    className="absolute top-0 left-0 -ml-4 mt-2 text-5xl font-extrabold text-primary opacity-20"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="relative">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                  {index !== steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 bg-gray-300"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + (0.2 * index), duration: 0.5 }}
                      viewport={{ once: true }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  };