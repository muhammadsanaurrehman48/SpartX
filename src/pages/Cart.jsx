import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Trash2,
    Tag,
    ChevronRight,
    Plus,
    Minus,
    AlertCircle,
    Settings, Wrench,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

const MOCK_CART_ITEMS = [
    {
        id: '1',
        name: 'Brake Pad Set',
        price: 89.99,
        quantity: 1,
        image: '/images/brake-pads.jpg',
        partNumber: 'BP-2023-X1'
    },
    // Add more mock items as needed
];

function formatData (data) {
    let formattedData = [];
    const items = data.items;
    items.forEach(item => {
        const formattedItem = {
            id: item.product.productId,
            name: item.product.productName,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0] !== null ? item.product.images[0] : '/images/default.jpg',
            partNumber: item.product.description
        };
        formattedData.push(formattedItem);
    })

    return formattedData;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [voucher, setVoucher] = useState('');
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Animation variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    //   const fetchCartItems = async () => {
    //     try {
    //       setLoading(true);
    //       // Replace with your API endpoint
    //       const response = await fetch('/api/cart');
    //       const data = await response.json();
    //       setCartItems(data);
    //     } catch (err) {
    //       setError('Failed to load cart items');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    const fetchCartItems = async () => {
        try {
            setLoading(true);
            // For development/testing, use mock data

            console.log('Fetching cart items from API...');
            // Production API call
            const response = await fetch('http://localhost:8080/cart/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            console.log('Fetched cart items:', data);

            setCartItems(formatData(data));
        } catch (err) {
            setError('Failed to load cart items. Please try again later.');
            console.error('Cart fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    // const updateQuantity = async (itemId, newQuantity) => {
    //     if (newQuantity < 1) return;

    //     try {
    //         // Optimistic update
    //         setCartItems(items =>
    //             items.map(item =>
    //                 item.id === itemId
    //                     ? { ...item, quantity: newQuantity }
    //                     : item
    //             )
    //         );

    //         // API call to update quantity
    //         await fetch(`/api/cart/${itemId}`, {
    //             method: 'PATCH',
    //             body: JSON.stringify({ quantity: newQuantity }),
    //             headers: { 'Content-Type': 'application/json' }
    //         });
    //     } catch (err) {
    //         setError('Failed to update quantity');
    //         fetchCartItems(); // Revert on failure
    //     }
    // };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            // Optimistic update
            setCartItems(items =>
                items.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

            if (process.env.NODE_ENV === 'development') {
                return; // Skip API call in development
            }

            const response = await fetch(`http://localhost:5173
                /api/cart/${itemId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
        } catch (err) {
            setError('Failed to update quantity');
            fetchCartItems(); // Revert on failure
        }
    };

    // Add error boundary
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertCircle className="w-6 h-6" />
                        <h2 className="text-lg font-semibold">Error</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            fetchCartItems();
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    const removeItem = async (itemId) => {
        try {
            await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
            setCartItems(items => items.filter(item => item.id !== itemId));
        } catch (err) {
            setError('Failed to remove item');
        }
    };

    const applyVoucher = async (code) => {
        try {
            const response = await fetch('/api/voucher/validate', {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();

            if (data.valid) {
                setVoucher(code);
                setDiscount(data.discountAmount);
            }
        } catch (err) {
            setError('Invalid voucher code');
        }
    };

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((sum, item) =>
            sum + (item.price * item.quantity), 0
        );
        const shipping = subtotal > 100 ? 0 : 10;
        return (subtotal + shipping - discount).toFixed(2);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <motion.div 
                className="absolute top-1/4 -left-20 opacity-5"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Settings size={120} />
            </motion.div>

            <motion.div 
                className="absolute bottom-1/4 -right-10 opacity-5"
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                // Tools icon
            </motion.div>

            <motion.div 
                className="absolute top-1/2 right-1/4 opacity-5"
                animate={{ y: [0, 20, 0], rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <Wrench size={80} />
            </motion.div>
        </div>

        <motion.div 
            className="flex-grow py-8 px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg"
                    >
                        <ShoppingCart className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Shopping Cart
                    </h1>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600 shadow-sm"
                        >
                            <AlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {cartItems.length === 0 ? (
                    <motion.div 
                        className="text-center py-16 bg-white rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="mb-6"
                        >
                            <ShoppingCart className="w-16 h-16 mx-auto text-blue-600" />
                        </motion.div>
                        <p className="text-gray-500 mb-4 text-lg">Your cart is empty</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                     text-white rounded-md shadow-md hover:shadow-lg 
                                     transition-all duration-300"
                            onClick={() => window.location.href = '/shop'}
                        >
                            Continue Shopping
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Description: {item.partNumber}</p>
                                                <p className="text-blue-600 font-medium">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 rounded-full hover:bg-gray-100"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </motion.button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 rounded-full hover:bg-gray-100"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                
                                <div className="mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter voucher code"
                                            value={voucher}
                                            onChange={(e) => setVoucher(e.target.value)}
                                            className="flex-1 border rounded-md px-3 py-2"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => applyVoucher(voucher)}
                                            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Apply
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{calculateTotal() > 100 ? 'Free' : '$10.00'}</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>${calculateTotal()}</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                                             text-white py-3 rounded-md shadow-md hover:shadow-lg 
                                             flex items-center justify-center gap-2 
                                             transition-all duration-300"
                                    onClick={() => window.location.href = '/confirm-order'}
                                >
                                    Confirm Order
                                    <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
        <Footer />
    </div>
    );
};

export default Cart;