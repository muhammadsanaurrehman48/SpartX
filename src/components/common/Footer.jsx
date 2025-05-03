// src/components/common/Footer.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [hoveredIcons, setHoveredIcons] = useState({
    facebook: false,
    instagram: false,
    twitter: false
  });
  
  const socialIcons = [
    {
      name: 'facebook',
      path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    },
    {
      name: 'instagram',
      path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 001.153-1.772A4.902 4.902 0 005.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
    },
    {
      name: 'twitter',
      path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
    }
  ];

  return (
    <footer className="bg-gray-800 text-gray-100 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-80"></div>
      
      {/* Animated dots/particles (subtle effect) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white h-2 w-2 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="transform transition-all duration-500 hover:translate-y-1">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              SPART-X
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </h3>
            <p className="text-gray-300 transition-colors duration-300 hover:text-white">
              Your one-stop platform for hassle-free vehicle maintenance tracking and auto parts shopping.
            </p>
          </div>
          
          {['Quick Links', 'Support'].map((section, sectionIdx) => {
            const links = sectionIdx === 0 
              ? [{path: '/', text: 'Home'}, {path: '/shop', text: 'Shop'}, {path: '/maintenance', text: 'Maintenance'}, {path: '/news', text: 'News'}]
              : [{path: '/contact', text: 'Contact Us'}, {path: '/faq', text: 'FAQ'}, {path: '/privacy', text: 'Privacy Policy'}, {path: '/terms', text: 'Terms of Service'}];
            
            return (
              <div key={section} className="transform transition-all duration-500 group hover:translate-y-1">
                <h3 className="text-lg font-semibold mb-4 relative inline-block group-hover:text-blue-300 transition-colors duration-300">
                  {section}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                </h3>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link.text} className="transform transition-all duration-200 hover:translate-x-1">
                      <Link to={link.path} className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                        <span className="bg-blue-500 h-0 w-0 rounded-full mr-0 transition-all duration-200 group-hover:h-1.5 group-hover:w-1.5 group-hover:mr-1.5"></span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          
          <div className="transform transition-all duration-500 hover:translate-y-1">
            <h3 className="text-lg font-semibold mb-4 relative inline-block group-hover:text-blue-300 transition-colors duration-300">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </h3>
            <div className="flex space-x-4">
              {socialIcons.map(icon => (
                <a 
                  key={icon.name}
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onMouseEnter={() => setHoveredIcons(prev => ({ ...prev, [icon.name]: true }))}
                  onMouseLeave={() => setHoveredIcons(prev => ({ ...prev, [icon.name]: false }))}
                >
                  <span className="sr-only">{icon.name}</span>
                  <svg 
                    className={`h-6 w-6 transform ${hoveredIcons[icon.name] ? 'scale-125' : 'scale-100'} transition-all duration-300`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d={icon.path} 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-300 text-center animate-pulse">
            &copy; {new Date().getFullYear()} SPART-X. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};