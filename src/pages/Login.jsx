import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Car, Store } from 'lucide-react';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('carOwner'); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  async function loginShopOwner (email, password) {
    try {
      const response = await fetch('http://localhost:8080/shopowner/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      // Try to get detailed error message if available
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error:", errorData || response.statusText);
        setErrors({ ...errors, password: "Invalid email or password" });
        return; // Exit if there's an error
      }
  
      const data = await response.json();
      window.localStorage.setItem("userType", "shopOwner");
      window.localStorage.setItem('login', true);
      navigate("/shop", { state: { data } });
  
    } catch (error) {
      console.error("Network error during registration:", error);
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  }
  
  async function loginCarOwner (email, password) {
    try {
      const response = await fetch('http://localhost:8080/carowner/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      // Try to get detailed error message if available
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error:", errorData || response.statusText);
        setErrors({ ...errors, password: "Invalid email or password" });
        return; // Exit if there's an error
      }
  
      const data = await response.json();
      window.localStorage.setItem("userType", "carOwner");
      window.localStorage.setItem('login', true);
      navigate("/shop", { state: { data } });
  
    } catch (error) {
      console.error("Network error during registration:", error);
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      if (userType === 'carOwner') {
        loginCarOwner(formData.email, formData.password).finally(() => {
          setIsLoading(false);
        });
      }
      else if (userType === 'shopOwner') {
        loginShopOwner(formData.email, formData.password).finally(() => {
          setIsLoading(false);
        });
      }
    };
}

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements - identical to SignUp */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-5"
            style={{
              height: `${Math.random() * 200 + 50}px`,
              width: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'pulse 10s infinite ease-in-out'
            }}
          ></div>
        ))}
      </div>

      <div className="z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src="/3.png"
              alt="SPART-X Logo"
              className="h-24 w-auto"
            />
          </motion.div>

          <motion.h2
            className="text-4xl font-extrabold text-white mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              SPART-X
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Maintain Your Vehicle Hassle-Free
          </motion.p>
        </div>

        <motion.div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="px-6 py-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-blue-400">Welcome Back</h3>
              <p className="text-gray-400 mt-1">Sign in to your account</p>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
                  <div
                    className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${userType === 'carOwner'
                      ? 'bg-blue-600 bg-opacity-30 border-2 border-blue-500 transform scale-105'
                      : 'bg-gray-800 bg-opacity-40 border-2 border-gray-700 hover:bg-gray-700'
                      }`}
                    onClick={() => setUserType('carOwner')}
                  >
                    <Car
                      size={32}
                      className={`mb-2 ${userType === 'carOwner' ? 'text-blue-400' : 'text-gray-400'}`}
                    />
                    <span className="text-white font-medium">Car Owner</span>
                  </div>

                  <div
                    className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${userType === 'shopOwner'
                      ? 'bg-purple-600 bg-opacity-30 border-2 border-purple-500 transform scale-105'
                      : 'bg-gray-800 bg-opacity-40 border-2 border-gray-700 hover:bg-gray-700'
                      }`}
                    onClick={() => setUserType('shopOwner')}
                  >
                    <Store
                      size={32}
                      className={`mb-2 ${userType === 'shopOwner' ? 'text-purple-400' : 'text-gray-400'}`}
                    />
                    <span className="text-white font-medium">Shop Owner</span>
                  </div>
                </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-400 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-400 font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;