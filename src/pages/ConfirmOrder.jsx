import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    items: [],
    subtotal: 0,
    shipping: 0, // Changed initial shipping to 0
  });
  const [cartId, setCartId] = useState(-1);


  const calculateShipping = (subtotal) => {
    // Free shipping for orders over $100
    return subtotal > 100 ? 0 : 10.00;
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 10.00,
    total: 0
  });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/', {
        credentials: 'include'
      });
      const data = await response.json();

      
      const items = data.items.map(item => ({
        id: item.product.productId,
        name: item.product.productName,
        price: item.product.price,
        quantity: item.quantity
      }));

      setCartId(data.cartId);

      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = calculateShipping(subtotal);
      
      setOrderDetails({
        items,
        subtotal,
        shipping
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'online') {
      alert('Payment gateway integration coming soon! Please add your payment details later.');
    }
  };

  const handleConfirmOrder = async () => {
    console.log(cartId);
    if (!address.fullName || !address.street || !address.city || !address.state || !address.zipCode || !address.phone) {
      alert('Please fill in all address fields');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    
    // Simulating order processing
    const response = await fetch(`http://localhost:8080/orders/checkout/${cartId}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Order confirmed:', data);
      alert('Order confirmed! Thank you for your purchase.');
      navigate('/profile');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <AnimatedBackground />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Confirm Order</h1>

            {/* Delivery Address */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2 md:col-span-2"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6 mb-8">
              {orderDetails.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </motion.div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentMethodSelect('cod')}
                  className={`w-full p-4 border rounded-lg ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                  Cash on Delivery
                </button>
                <button
                  onClick={() => handlePaymentMethodSelect('online')}
                  className={`w-full p-4 border rounded-lg ${paymentMethod === 'online' ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                  Online Payment
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Total</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <div className="text-right">
                    {orderDetails.subtotal > 100 ? (
                      <span className="text-green-600">Free Shipping</span>
                    ) : (
                      <span>${orderDetails.shipping.toFixed(2)}</span>
                    )}
                    <p className="text-sm text-gray-500">
                      {orderDetails.subtotal > 100 
                        ? "Free shipping applied!" 
                        : `Free shipping on orders over $100 (${(100 - orderDetails.subtotal).toFixed(2)} away)`}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t font-bold text-lg">
                  <span>Total</span>
                  <span>${(orderDetails.subtotal + orderDetails.shipping).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Order'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmOrder;