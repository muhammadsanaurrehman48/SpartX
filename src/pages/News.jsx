import { motion } from 'framer-motion';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import '../assets/styles/news.css';

// NewsCard component
const NewsCard = ({ title, description, image }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const News = () => {
  const articles = [
    {
      title: 'Latest Automotive Innovations',
      description: 'Discover the latest advancements in automotive technology and how they are shaping the future of driving.',
      image: '/1.jpg',
    },
    {
      title: 'New Model Releases',
      description: 'Check out the newest models hitting the market this year, featuring cutting-edge designs and performance enhancements.',
      image: '/7.jpg',
    },
    {
      title: 'Essential Maintenance Products',
      description: 'Explore the top maintenance products every car owner should have to keep their vehicles in top shape.',
      image: '/6.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBackground />
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Latest News in the Automotive Industry
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <NewsCard 
              key={index} 
              title={article.title} 
              description={article.description} 
              image={article.image} 
            />
          ))}
        </div>
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Latest Industry Updates</h2>
          <p className="text-gray-600">
            Stay up to date with the latest trends and updates in the automotive sector. 
            Our news section brings you comprehensive coverage of industry developments, 
            technological innovations, and maintenance tips.
          </p>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default News;