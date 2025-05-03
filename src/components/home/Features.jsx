// src/components/home/Features.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Importing Heroicons
import { BellIcon, DocumentTextIcon, CogIcon, TruckIcon } from '@heroicons/react/24/outline';

export const Features = () => {
  const features = [
    {
      title: "Maintenance Reminders",
      description:
        "Never miss an oil change or service interval again with our smart reminder system based on your vehicle's needs.",
      icon: <BellIcon className="h-6 w-6 text-blue-800" />,
    },
    {
      title: "Complete Maintenance History",
      description:
        "Keep a detailed digital record of all maintenance work performed on your vehicle.",
      icon: <DocumentTextIcon className="h-6 w-6 text-blue-800" />,
    },
    {
      title: "Find the Right Parts",
      description:
        "Shop for parts specifically recommended for your vehicle's make, model, and year.",
      icon: <CogIcon className="h-6 w-6 text-blue-800" />,
    },
    {
      title: "Doorstep Delivery",
      description:
        "Get auto parts delivered right to your door, with fast and reliable shipping options.",
      icon: <TruckIcon className="h-6 w-6 text-blue-800" />,
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
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need for Vehicle Maintenance
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            SPART-X provides all the tools you need to keep your vehicle in top shape.
          </p>
        </motion.div>

        <div className="mt-16">
          <motion.div
            ref={ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                variants={item}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
