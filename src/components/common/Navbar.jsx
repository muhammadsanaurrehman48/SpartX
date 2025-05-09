import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

async function carOwnerLogout() {
  const response = await fetch('http://localhost:8080/carowner/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.ok) {
    console.log('Logged out successfully');
    window.localStorage.removeItem('login');
    window.localStorage.removeItem('userType');
    window.location.reload();
  } else {
    console.error('Failed to log out');
  }
}

async function shopOwnerLogout() {
  const response = await fetch('http://localhost:8080/shopowner/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.ok) {
    window.localStorage.removeItem('login');
    window.localStorage.removeItem('userType');
    window.location.reload();
  } else {
    console.error('Failed to log out');
  }
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const isLoggedIn = window.localStorage.getItem('login') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`relative shadow-md transition-all duration-300 ${scrolled ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Automotive-themed SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 100">
        <g>
          <path
            d="M0,50 Q250,30 500,50 T1000,50"
            fill="none"
            stroke={scrolled ? '#ffffff' : '#1e3a8a'}
            strokeWidth="2"
            className="animate-[tireTrack_10s_linear_infinite]"
          />
          <circle
            cx="100"
            cy="50"
            r="10"
            fill={scrolled ? '#ffffff' : '#1e3a8a'}
            className="animate-[gearRotate_5s_linear_infinite]"
          />
          <circle
            cx="900"
            cy="50"
            r="10"
            fill={scrolled ? '#ffffff' : '#1e3a8a'}
            className="animate-[gearRotate_5s_linear_infinite_reverse]"
          />
        </g>
      </svg>
      <style>
        {`
          @keyframes tireTrack {
            0% { transform: translateX(0); }
            100% { transform: translateX(-1000px); }
          }
          @keyframes gearRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all duration-300"
              >
                SPART-X
              </Link>
            </div>

            <div className="hidden sm:ml-10 sm:flex sm:space-x-6 items-center">
              {['Home', 'Maintenance', 'Shop', 'News'].map((item, index) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`relative overflow-hidden text-sm font-medium transition-colors duration-200 ${
                    scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  } ${item === 'Home' ? 'text-blue-500' : ''}`}
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
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => {
                    const userType = window.localStorage.getItem('userType');
                    if (userType === 'carOwner') carOwnerLogout();
                    else if (userType === 'shopOwner') shopOwnerLogout();
                  }}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6 transform rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

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
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4 space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow transform hover:scale-105 transition-all duration-300"
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => {
                    const userType = window.localStorage.getItem('userType');
                    if (userType === 'carOwner') carOwnerLogout();
                    else if (userType === 'shopOwner') shopOwnerLogout();
                  }}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-2 rounded-md text-sm font-medium shadow transform hover:scale-105 transition-all duration-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};