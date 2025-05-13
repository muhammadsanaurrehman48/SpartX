import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import '../assets/styles/news.css';

// NewsCard component with enhanced animations
const NewsCard = ({ title, description, image, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="h-48 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <motion.button
          className="mt-4 text-blue-600 font-medium inline-flex items-center"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Read more <span className="ml-2">→</span>
        </motion.button>
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
    {
      title: 'Electric Vehicle Revolution',
      description: 'How electric vehicles are transforming the automotive industry and what it means for maintenance services.',
      image: '/4.jpg',
    },
    {
      title: 'DIY Maintenance Guide',
      description: 'Step-by-step guides for common maintenance tasks you can perform at home to save time and money.',
      image: '/5.jpg',
    },
    {
      title: 'Future of Auto Repairs',
      description: 'Exploring how AI and smart technology are revolutionizing the way we diagnose and repair vehicles.',
      image: '/8.jpg',
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <NewsCard 
              key={index} 
              title={article.title} 
              description={article.description} 
              image={article.image}
              delay={index} 
            />
          ))}
        </div>

        {/* Featured Article Section */}
        <motion.div 
          className="bg-white rounded-lg shadow-xl p-8 mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Featured Article: The Future of Automotive Maintenance</h2>
          
          <motion.img 
            src="/featured-article.jpg" 
            alt="Future of Automotive Maintenance"
            className="w-full h-96 object-cover rounded-lg mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          />

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              The automotive industry is undergoing a dramatic transformation with the rise of electric vehicles, 
              autonomous driving technologies, and connected car systems. These changes are not just affecting 
              how we drive, but also how we maintain our vehicles.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Smart Diagnostics</h3>
            <p className="text-gray-700 mb-4">
              Modern vehicles are equipped with sophisticated sensors and diagnostic systems that can predict 
              maintenance needs before problems occur. This predictive maintenance approach is revolutionizing 
              how we service vehicles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <motion.img 
                src="/diagnostic-1.jpg" 
                alt="Smart Diagnostics System"
                className="rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img 
                src="/diagnostic-2.jpg" 
                alt="Maintenance Process"
                className="rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Role of AI</h3>
            <p className="text-gray-700 mb-6">
              Artificial Intelligence is playing an increasingly important role in vehicle maintenance. 
              From automated diagnostic systems to predictive maintenance algorithms, AI is helping to make 
              vehicle maintenance more efficient and accurate than ever before.
            </p>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg mb-8"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-3">Key Takeaways</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Predictive maintenance is becoming the new standard</li>
                <li>AI-powered diagnostics improve accuracy and efficiency</li>
                <li>Connected car systems enable real-time monitoring</li>
                <li>Electric vehicles require new maintenance approaches</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default News;