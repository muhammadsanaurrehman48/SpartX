import { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  ShoppingCart, 
  Clock, 
  FileText, 
  Car, 
  Wrench, 
  Bell, 
  ChevronRight, 
  Package, 
  Calendar, 
  Settings, 
  LogOut 
} from 'lucide-react';

// Demo user data
const userData = {
  firstName: "Michael",
  lastName: "Johnson",
  email: "michael.johnson@example.com",
  avatar: "/api/placeholder/150/150",
  address: {
    street: "1234 Automotive Drive",
    city: "Engine City",
    state: "CA",
    zip: "90210"
  },
  orders: [
    { id: "ORD-7842", date: "April 15, 2025", status: "Delivered", amount: "$245.99", items: "Premium Oil Filter + Synthetic Oil" },
    { id: "ORD-6591", date: "March 2, 2025", status: "Delivered", amount: "$1,299.50", items: "Performance Brake Kit" },
    { id: "ORD-5472", date: "January 18, 2025", status: "Delivered", amount: "$89.99", items: "Windshield Wipers + Rain Repellent" }
  ],
  maintenanceReminders: [
    { id: 1, service: "Oil Change", dueDate: "May 20, 2025", vehicle: "2022 Tesla Model 3", priority: "high" },
    { id: 2, service: "Tire Rotation", dueDate: "June 15, 2025", vehicle: "2022 Tesla Model 3", priority: "medium" },
    { id: 3, service: "Brake Inspection", dueDate: "July 10, 2025", vehicle: "2022 Tesla Model 3", priority: "low" }
  ],
  cartItems: 3
};

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoggedIn = window.localStorage.getItem('login') === 'true';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    setGreetingMessage(getGreeting());
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleLogout = () => {
    const userType = window.localStorage.getItem('userType');
    if (userType === 'carOwner') carOwnerLogout();
    else if (userType === 'shopOwner') shopOwnerLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative overflow-hidden">
      {/* Automotive-themed SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 1000 1000">
        <g>
          <path
            d="M0,500 Q250,480 500,500 T1000,500"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="3"
            className="animate-[tireTrack_12s_linear_infinite]"
          />
          <circle
            cx="200"
            cy="800"
            r="15"
            fill="#1e3a8a"
            className="animate-[gearRotate_6s_linear_infinite]"
          />
          <circle
            cx="800"
            cy="200"
            r="15"
            fill="#1e3a8a"
            className="animate-[gearRotate_6s_linear_infinite_reverse]"
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

      {/* Top navigation */}
      <div className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 transform hover:scale-110 transition-transform duration-300" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">SPART-X</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 transform hover:rotate-12 transition-transform duration-300" />
            {userData.cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {userData.cartItems}
              </span>
            )}
          </div>
          <div className="relative">
            <Bell className="h-6 w-6 transform hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              9+
            </span>
          </div>
          <img
            src={userData.avatar}
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-white transform hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Header section with greeting */}
        <div className={`bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Profile Picture"
                  className="h-16 w-16 rounded-full border-4 border-blue-500 transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full h-4 w-4 border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">{greetingMessage}, {userData.firstName}!</h2>
                <p className="text-gray-600">Welcome to your automotive dashboard</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center transform hover:-translate-y-1 duration-300">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-md hover:from-pink-600 hover:to-red-600 transition flex items-center transform hover:-translate-y-1 duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {['overview', 'orders', 'maintenance'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium transform transition-all duration-300 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:-translate-y-1'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Personal info */}
          <div className={`md:col-span-1 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transform transition-all duration-500 delay-100`}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500 transform hover:rotate-12 transition-transform duration-300" />
                  Personal Information
                </h3>
                <button className="text-blue-500 hover:text-blue-600 text-sm transform hover:-translate-y-1 transition-transform duration-300">Edit</button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full name</p>
                  <p className="font-medium">{userData.firstName} {userData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-1 flex-shrink-0 transform hover:scale-110 transition-transform duration-300" />
                    <p className="font-medium">
                      {userData.address.street}, {userData.address.city}, {userData.address.state} {userData.address.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Car className="h-5 w-5 mr-2 text-blue-500 transform hover:rotate-12 transition-transform duration-300" />
                  My Vehicles
                </h3>
                <button className="text-blue-500 hover:text-blue-600 text-sm transform hover:-translate-y-1 transition-transform duration-300">Add Vehicle</button>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">2022 Tesla Model 3</h4>
                    <p className="text-sm text-gray-500">Standard Range Plus</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 transform hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right columns based on active tab */}
          {activeTab === 'overview' && (
            <>
              {/* Middle column: Upcoming maintenance */}
              <div className={`md:col-span-1 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transform transition-all duration-500 delay-200`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Wrench className="h-5 w-5 mr-2 text-blue-500 transform hover:rotate-90 transition-transform duration-300" />
                      Upcoming Maintenance
                    </h3>
                    <button className="text-blue-500 hover:text-blue-600 text-sm transform hover:-translate-y-1 transition-transform duration-300">View All</button>
                  </div>
                  <div className="space-y-4">
                    {userData.maintenanceReminders.map(item => (
                      <div
                        key={item.id}
                        className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg hover:bg-blue-100 transition transform hover:-translate-y-1 duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.service}</h4>
                            <p className="text-sm text-gray-600">{item.vehicle}</p>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1 transform hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm text-gray-500">{item.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Recent orders */}
              <div className={`md:col-span-1 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transform transition-all duration-500 delay-300`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-500 transform hover:scale-110 transition-transform duration-300" />
                      Recent Orders
                    </h3>
                    <button className="text-blue-500 hover:text-blue-600 text-sm transform hover:-translate-y-1 transition-transform duration-300">View All</button>
                  </div>
                  <div className="space-y-4">
                    {userData.orders.slice(0, 2).map(order => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer transform hover:-translate-y-1 duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-blue-600">{order.id}</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{order.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{order.date}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{order.items}</span>
                          <span className="font-medium">{order.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopping Cart */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-blue-500 transform hover:rotate-12 transition-transform duration-300" />
                      Your Cart
                    </h3>
                  </div>
                  {userData.cartItems > 0 ? (
                    <div className="text-center">
                      <p>You have {userData.cartItems} items in your cart</p>
                      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full transform hover:-translate-y-1 duration-300">
                        View Cart
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Your cart is empty</p>
                      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:-translate-y-1 duration-300">
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-blue-500 transform hover:scale-110 transition-transform duration-300" />
                Order History
              </h3>
              <div className="space-y-4">
                {userData.orders.map(order => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer transform hover:-translate-y-1 duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-600">{order.id}</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{order.status}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{order.date}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{order.items}</span>
                      <span className="font-medium">{order.amount}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="text-blue-500 hover:text-blue-600 text-sm mr-4 transform hover:-translate-y-1 transition-transform duration-300">Track Order</button>
                      <button className="text-blue-500 hover:text-blue-600 text-sm transform hover:-translate-y-1 transition-transform duration-300">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2 text-blue-500 transform hover:scale-110 transition-transform duration-300" />
                Maintenance Schedule
              </h3>
              <div className="space-y-4">
                {userData.maintenanceReminders.map(item => (
                  <div
                    key={item.id}
                    className={`border-l-4 ${
                      item.priority === 'high' ? 'border-red-500 bg-red-50' : 
                      item.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 
                      'border-green-500 bg-green-50'
                    } p-4 rounded-r-lg hover:bg-opacity-75 transition transform hover:-translate-y-1 duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.service}</h4>
                        <p className="text-sm text-gray-600">{item.vehicle}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1 transform hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm text-gray-500">{item.dueDate}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm transform hover:-translate-y-1 duration-300">
                        Schedule Service
                      </button>
                    </div>
                  </div>
                ))}
                <button className="mt-2 w-full border border-blue-500 text-blue-500 rounded-md py-2 hover:bg-blue-50 transition transform hover:-translate-y-1 duration-300">
                  Add Maintenance Reminder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}