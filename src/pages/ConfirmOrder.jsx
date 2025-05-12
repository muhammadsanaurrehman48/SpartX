import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import AnimatedBackground from '../components/common/AnimatedBackground';

const ConfirmOrder = () => {
  const [orderDetails, setOrderDetails] = useState({
    items: [
      { id: 1, name: 'Premium Brake Pads', price: 249.99, quantity: 1 },
      { id: 2, name: 'Engine Oil Filter', price: 349.99, quantity: 1 }
    ],
    subtotal: 599.98,
    discount: 0,
    shipping: 15.00,
    voucher: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoucherApply = (e) => {
    e.preventDefault();
    // Add voucher logic here
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    // Add order confirmation logic here
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <AnimatedBackground />
      {/* Floating Background Elements */}
{/*       
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 opacity-5"
        >
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.5a2 2 0 100 4 2 2 0 000-4zm0 6a4 4 0 110-8 4 4 0 010 8z"/>
          </svg>
        </motion.div>
        {/* Add more floating automotive-themed SVGs 
      </div> 
        */}
    

      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h1>

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
                    <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>

            {/* Voucher Input */}
            <div className="mb-8">
              <form onSubmit={handleVoucherApply} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={orderDetails.voucher}
                  onChange={(e) => setOrderDetails({...orderDetails, voucher: e.target.value})}
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </form>
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
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${orderDetails.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-bold text-lg">
                  <span>Total</span>
                  <span>${(orderDetails.subtotal + orderDetails.shipping - orderDetails.discount).toFixed(2)}</span>
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