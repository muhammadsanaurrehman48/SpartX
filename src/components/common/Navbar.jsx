// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Add scroll event listener to create navbar animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`shadow-md transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link to="/" className="flex items-center h-full">
                <img 
                  src="/3.png" 
                  alt="Logo" 
                  className="h-20 w-auto transform hover:rotate-12 transition-transform duration-300" 
                />
              </Link>
              <Link
                to="/"
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                SPART-X
              </Link>
            </div>

            <div className="hidden sm:ml-10 sm:flex sm:space-x-6 items-center">
              {['Home', 'Maintenance', 'Shop', 'News'].map((item, index) => (
                <Link 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`relative overflow-hidden border-transparent text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                    item === 'Home' ? 'border-primary text-gray-900' : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ${
                      hoveredLink === index ? 'translate-x-0' : '-translate-x-full'
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6 transform rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {['Home', 'Maintenance', 'Shop', 'News'].map((item) => (
            <Link 
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`${
                item === 'Home' 
                  ? 'bg-primary border-primary text-white' 
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4 space-x-3">
            <Link 
              to="/login" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-2 rounded-md text-sm font-medium shadow transform hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};