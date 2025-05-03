// src/components/home/NewsSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const NewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Top 10 Maintenance Tips for Extending Your Car's Life",
      excerpt: "Learn the essential maintenance tasks that can add years to your vehicle's lifespan.",
      image: "/8.jpg",
      date: "April 15, 2025",
    },
    {
      id: 2,
      title: "Electric Vehicle Maintenance: What You Need to Know",
      excerpt: "Discover the unique maintenance requirements for electric vehicles compared to traditional gas engines.",
      image: "/4.jpg",
      date: "April 10, 2025",
    },
    {
      id: 3,
      title: "DIY vs. Professional Maintenance: When to Call the Experts",
      excerpt: "Find out which maintenance tasks you can handle yourself and when it's time to seek professional help.",
      image: "/5.jpg",
      date: "April 5, 2025",
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
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest Automotive News
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Stay up-to-date with the latest automotive maintenance tips and industry news.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {newsArticles.map((article) => (
            <motion.div 
              key={article.id} 
              className="bg-white overflow-hidden shadow-lg rounded-lg"
              variants={item}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 w-full overflow-hidden">
                <motion.img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-primary">
                  {article.date}
                </p>
                <Link to={`/news/${article.id}`} className="block mt-2">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition duration-300">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                    {article.excerpt}
                  </p>
                </Link>
                <div className="mt-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/news/${article.id}`} className="text-primary hover:text-blue-700 font-medium inline-flex items-center">
                      Read more 
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >→</motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/news" className="btn-secondary inline-block">
              View All Articles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};