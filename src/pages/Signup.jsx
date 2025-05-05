import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Car, Store } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

const SignUp = () => {
  const [userType, setUserType] = useState('carOwner');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    shop_name: '',
    address: '',
    city: '',
    country: '',
    shop_number: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone_number.replace(/[^\d]/g, ''))) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/^[A-Za-z0-9@$!%*?&]+$/.test(formData.password)) {
      newErrors.password = "Password must only contain alphabets, numbers, or special characters (no spaces)";
    } else if (!/[A-Za-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter and one number";
    }


    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function createShopOwner(data) {
    try {
      const response = await fetch('http://127.0.0.1:8080/shopowner/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Try to get detailed error message if available
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error:", errorData || response.statusText);
        window.location.reload(); // Reload the page to reset the form
        setErrors({ server: errorData?.message || "Registration failed" });
        return;
      }
  
      navigate('/login'); // Redirect to login page
  
    } catch (error) {
      console.error("Network error during registration:", error);
      setErrors({ server: "Network error. Please try again." });
      window.location.reload(); // Reload the page to reset the form
    }
  }
  
  async function createCarOwner(data) {
    try {
      const response = await fetch('http://127.0.0.1:8080/carowner/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Try to get detailed error message if available
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error:", errorData || response.statusText);
        window.location.reload(); // Reload the page to reset the form
        setErrors({ server: errorData?.message || "Registration failed" });
        return;
      }
      
      navigate('/login'); // Redirect to login page
    
    } catch (error) {
      console.error("Network error during registration:", error);
      window.location.reload(); // Reload the page to reset the form
      setErrors({ server: "Network error. Please try again." });
    }
  }

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (userType === 'shopOwner' && !formData.shop_number.trim()) {
      if (!formData.shop_number.trim()) {
        newErrors.phone_number = "Shop Phone number is required";
      } else if (!/^\d{11}$/.test(formData.shop_number.replace(/[^\d]/g, ''))) {
        newErrors.phone_number = "Please enter a valid 10-digit phone number";
      }
    }

    if (userType === 'shopOwner' && !formData.shop_name.trim()) {
      newErrors.shop_name = "Shop name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  //Create Refs for form Elements
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    if (validateStep2()) {
      // Here you would handle form submission to backend
      // console.log("Form submitted with:", formData);
      // For now just log the data
      if (userType === 'carOwner') {
        const success = createCarOwner({
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phone_number,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: "CAR_OWNER",
          address: {
            street: formData.address,
            city: {
              cityName: formData.city,
              country: formData.country
            },
          }
        });
     
      }
      else {
        const success = createShopOwner({
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phone_number,
          password: formData.password,
          shopName: formData.shop_name,
          firstName: formData.firstName,
          lastName: formData.lastName,
          shopPhoneNumber: formData.shop_number,
          role: "SHOP_OWNER",
          address: {
            street: formData.address,
            city: {
              cityName: formData.city,
              country: formData.country
            },
          }
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (step === 1) {
        handleNextStep();
      } else if (step === 2) {
        // Trigger form submission
        submitButtonRef.current?.click();
      }
    }
  };
useEffect(() => {
    if (step === 1) {
      document.getElementById('username')?.focus();
    } else if (step === 2) {
      if (userType === 'carOwner') {
        document.getElementById('firstName')?.focus();
      } else {
        document.getElementById('shop_name')?.focus();
      }
    }
  }, [step, userType]);

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
        {/* Animated background elements */}
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
          <div className="px-6 py-8 ">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-blue-600">Create Your Account</h3>
              <p className="text-gray-500 mt-1">
                Step {step} of 2: {step === 1 ? 'Account Information' : 'Personal Details'}
              </p>
            </div>

            {step === 1 && (
              <div className="mb-6">
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

                <div>
                  <label className="block text-gray-600 font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone Number"
                  />
                  {errors.phone_number && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone_number}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm Password"
                    />
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:via-blue-700 hover:to-indigo-600 transition duration-300"
                >
                  Next
                </button>
                <div className="mt-4 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 font-semibold hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mb-6">
                <form onSubmit={handleSubmit}> 
                  <div>
                    <label htmlFor="firstName" className="text-gray-500">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                      placeholder="First Name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="text-gray-500">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                      placeholder="Last Name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                    

                  {userType === 'shopOwner' && (
                    <div>
                      <div style={{margin: "15px"}}></div>

                      <div>
                        <label htmlFor="shop_name" className="text-gray-500">Shop Name</label>
                        <input
                          type="text"
                          id="shop_name"
                          name="shop_name"
                          value={formData.shop_name}
                          onChange={handleChange}
                          className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                          placeholder="Shop Name"
                        />
                        {errors.shop_name && <p className="text-red-500 text-sm">{errors.shop_name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="shop_number" className="text-gray-500">Shop Number</label>
                        <input
                          type="text"
                          id="shop_number"
                          name="shop_number"
                            value={formData.shop_number}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                            placeholder="Shop Number"
                          />
                          {errors.shop_number && <p className="text-red-500 text-sm">{errors.shop_number}</p>}
                        </div>
                      </div>
                  )}
                  
                  <div style={{margin: "15px"}}></div>
                    
                  <div>
                    <label htmlFor="address" className="text-gray-500">Street</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                      placeholder="Street Address"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>
        
                  <div>
                    <label htmlFor="city" className="text-gray-500">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="text-gray-500">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white"
                      placeholder="Country"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full p-2 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:via-blue-700 hover:to-indigo-600 transition duration-300 cursor-pointer"
                    >
                      Sign Up
                    </button>
                    {/* <button
                      type="button"
                      onClick={() => window.location.href = '/Signup'} // Redirecting to the Account Information (Step 1)
                      className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 via-yellow-600 to-orange-500 text-white rounded-lg hover:from-red-600 hover:via-yellow-700 hover:to-orange-600 transition duration-300"
                    >
                      Back
                    </button> */}
                    <button
                      type="button"
                      onClick={() => setStep(1)} // This will take the user back to step 1
                      className="mt-4 w-full py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-lg hover:from-rose-600 hover:to-fuchsia-600 transition duration-300 shadow-lg"
                    >
                      Back
                    </button>
                    <div className="mt-4 text-center">
                      <p className="text-gray-950">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 font-semibold hover:underline">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUp;