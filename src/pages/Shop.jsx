// src/pages/Shop.jsx
import React, { useState, useEffect, use } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Navbar } from '../components/common/Navbar'; // Updated import to use named export
import { Footer } from '../components/common/Footer'; // Updated import to use named export

// Sample auto parts data (replace with your actual data/API)
const sampleProducts = [
  {
    id: 1,
    name: "Premium Synthetic Engine Oil",
    price: 49.99,
    category: "Fluids",
    subCategory: "Engine Oil",
    shop: "AutoZone",
    rating: 4.8,
    image: "/api/placeholder/300/300",
    description: "Full synthetic motor oil with superior wear protection for all types of modern vehicles.",
    specifications: ["5W-30", "5 Quarts", "Synthetic Blend", "For gasoline engines"],
    inStock: true
  },
  {
    id: 2,
    name: "High-Performance Brake Pads",
    price: 38.50,
    category: "Brakes",
    subCategory: "Brake Pads",
    shop: "O'Reilly Auto Parts",
    rating: 4.6,
    image: "/api/placeholder/300/300",
    description: "Ceramic brake pads designed for improved stopping power and reduced noise.",
    specifications: ["Ceramic compound", "Fits most sedans and SUVs", "Includes hardware kit", "Dust-free formula"],
    inStock: true
  },
  {
    id: 3,
    name: "DOT 4 Brake Fluid",
    price: 12.99,
    category: "Fluids",
    subCategory: "Brake Fluid",
    shop: "Advance Auto Parts",
    rating: 4.5,
    image: "/api/placeholder/300/300",
    description: "High-quality brake fluid exceeding DOT 4 specifications for hydraulic brake systems.",
    specifications: ["DOT 4", "32 oz bottle", "High boiling point", "Compatible with all DOT 3 & DOT 4 systems"],
    inStock: true
  },
  {
    id: 4,
    name: "Premium Air Filter",
    price: 19.99,
    category: "Filters",
    subCategory: "Air Filters",
    shop: "NAPA Auto Parts",
    rating: 4.7,
    image: "/api/placeholder/300/300",
    description: "High-flow air filter that improves engine performance and fuel economy.",
    specifications: ["Fits most domestic vehicles", "Washable & reusable", "99% filtration efficiency", "12-month warranty"],
    inStock: true
  },
  {
    id: 5,
    name: "Fuel Pump Assembly",
    price: 129.99,
    category: "Fuel System",
    subCategory: "Fuel Pumps",
    shop: "Pep Boys",
    rating: 4.3,
    image: "/api/placeholder/300/300",
    description: "Complete fuel pump assembly with pressure regulator and sending unit.",
    specifications: ["OEM quality", "For 2010-2018 Toyota models", "2-year warranty", "Includes gasket"],
    inStock: false
  },
  {
    id: 6,
    name: "Transmission Fluid",
    price: 22.50,
    category: "Fluids",
    subCategory: "Transmission Fluid",
    shop: "AutoZone",
    rating: 4.9,
    image: "/api/placeholder/300/300",
    description: "Automatic transmission fluid that provides superior lubrication and wear protection.",
    specifications: ["ATF+4", "1 Gallon", "For automatic transmissions", "Extends transmission life"],
    inStock: true
  },
  {
    id: 7,
    name: "Coolant/Antifreeze",
    price: 18.99,
    category: "Fluids",
    subCategory: "Coolant",
    shop: "O'Reilly Auto Parts",
    rating: 4.5,
    image: "/api/placeholder/300/300",
    description: "All-season antifreeze and coolant that provides year-round protection.",
    specifications: ["50/50 pre-diluted", "1 Gallon", "Green color", "For all vehicles"],
    inStock: true
  },
  {
    id: 8,
    name: "Cabin Air Filter",
    price: 15.99,
    category: "Filters",
    subCategory: "Cabin Filters",
    shop: "Advance Auto Parts",
    rating: 4.6,
    image: "/api/placeholder/300/300",
    description: "Premium cabin air filter that removes dust, pollen, and other airborne contaminants.",
    specifications: ["Activated carbon", "HEPA filtration", "Fits most domestic vehicles", "Easy installation"],
    inStock: true
  },
  {
    id: 9,
    name: "Spark Plugs Set",
    price: 32.50,
    category: "Ignition",
    subCategory: "Spark Plugs",
    shop: "NAPA Auto Parts",
    rating: 4.8,
    image: "/api/placeholder/300/300",
    description: "Premium iridium spark plugs that improve fuel efficiency and engine performance.",
    specifications: ["Iridium tip", "Set of 4", "Pre-gapped", "100,000 mile service life"],
    inStock: true
  }
];

// Demo specifications for the product detail modal
const specifications = {
  'PART': ["OEM certified", "Steel construction", "Compatible with Toyota Corolla 2015-2020", "Includes mounting hardware"],
  "FLUID": ["5W-30 synthetic", "1-liter bottle", "API SN certified", "Suitable for gasoline engines"],
  "ACCESSORY" : ["Universal fit", "Waterproof material", "Black leather finish", "Easy to install"],
  "TOOL": ["Chrome vanadium steel", "Includes 40 pieces", "Ergonomic handle", "Suitable for automotive repair"],
  "SERVICE": ["Includes oil and filter change", "Takes approximately 45 minutes", "12-month service warranty", "Appointment required"]
}

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:8080/products/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function addToCart(productId) {
  try {
    const response = await fetch(`http://localhost:8080/cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      return false;
    }
    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
}

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onClick(product)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {product.category}
          </span>
          <span className={`inline-block ml-2 px-2 py-1 text-xs font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Sold by: {product.shop}
        </div>
      </div>
    </div>
  );
};

// Product Detail Component
const ProductDetail = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-h-96 object-contain"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <div className="text-lg text-gray-600 mt-1">Sold by: {product.shop}</div>
              
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? '★' : (i < product.rating ? '★' : '☆')}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{product.rating} stars</span>
                </div>
              )}
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <p className="mt-6 text-gray-600">{product.description}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Specifications:</h3>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  {product.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button 
                  onClick={() => {
                    const success = addToCart(product.id);
                    if (success) {
                      onAddToCart(product);
                    }
                  }}
                  disabled={!product.inStock}
                  className={`px-6 py-3 rounded-lg flex items-center ${
                    product.inStock 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                  Check Compatibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ categories, shops, onCategoryChange, onShopChange, onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handleShopChange = (shop) => {
    const updatedShops = selectedShops.includes(shop)
      ? selectedShops.filter(s => s !== shop)
      : [...selectedShops, shop];
    
    setSelectedShops(updatedShops);
    onShopChange(updatedShops);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const type = e.target.name;
    
    if (type === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const applyPriceFilter = () => {
    onPriceRangeChange(priceRange);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Parts Category</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Shops</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {shops.map((shop) => (
            <div key={shop} className="flex items-center">
              <input
                type="checkbox"
                id={`shop-${shop}`}
                checked={selectedShops.includes(shop)}
                onChange={() => handleShopChange(shop)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor={`shop-${shop}`} className="ml-2 text-gray-700">
                {shop}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="flex items-center space-x-2">
          <div className="w-full">
            <label className="block text-sm text-gray-600 mb-1">Min ($)</label>
            <input
              type="number"
              name="min"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm text-gray-600 mb-1">Max ($)</label>
            <input
              type="number"
              name="max"
              min={priceRange[0]}
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          onClick={applyPriceFilter}
          className="mt-2 w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Apply
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Availability</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="in-stock"
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="in-stock" className="ml-2 text-gray-700">
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};

// Main Shop Component
const Shop = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      
      const formattedData = data.map(product => ({
        id: product.productId,
        name: product.productName,
        price: product.price,
        category: product.category,
        subCategory: null,
        shop: product.shopName,
        rating: (Math.floor(Math.random() * 5) + 1), // Random rating for demo
        image: product.images[0] || "/api/placeholder/300/300",
        description: product.description,
        specifications: specifications[product.category] || [],
        inStock: product.stock > 0 ? true : false
      }));
      setProducts(formattedData);
      setFilteredProducts(formattedData);
      setCategories([...new Set(formattedData.map(product => product.category))]);
    };
    
    fetchData();
  }, []);
  
  // Extract unique categories and shops from products
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    const uniqueShops = [...new Set(products.map(product => product.shop))];
    setCategories(uniqueCategories);
    setShops(uniqueShops);
  }, [products]);

  // Filter products based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    filterProducts(query);
  };

  // Main filter function
  const filterProducts = (
    query = searchQuery, 
    categoryFilter = [], 
    shopFilter = [], 
    priceRange = [0, 150]
  ) => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                           product.description.toLowerCase().includes(query) || 
                           product.category.toLowerCase().includes(query);
      
      const matchesCategory = categoryFilter.length === 0 || 
                             categoryFilter.includes(product.category);
      
      const matchesShop = shopFilter.length === 0 || 
                         shopFilter.includes(product.shop);
      
      const matchesPrice = product.price >= priceRange[0] && 
                          product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesShop && matchesPrice;
    });
    
    setFilteredProducts(filtered);
  };

  // Filter handlers
  const handleCategoryChange = (selectedCategories) => {
    filterProducts(searchQuery, selectedCategories);
  };

  const handleShopChange = (selectedShops) => {
    filterProducts(searchQuery, [], selectedShops);
  };

  const handlePriceRangeChange = (priceRange) => {
    filterProducts(searchQuery, [], [], priceRange);
  };

  // Product handlers
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    // Check if product already in cart
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Increase quantity if already in cart
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new product to cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    closeProductDetail();
    // Show cart notification or feedback here
  };

  // Animation classes for cards (staggered appearance)
  const getAnimationDelay = (index) => {
    return {
      animationDelay: `${index * 0.05}s`
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar component */}
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Auto Parts Shop</h1>
          <p className="text-gray-600 mt-2">Find quality automotive parts and maintenance supplies</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search parts, categories, or descriptions..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Shop content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar 
              categories={categories}
              shops={shops}
              onCategoryChange={handleCategoryChange}
              onShopChange={handleShopChange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>

          {/* Products grid */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products match your criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    filterProducts('');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fadeIn" 
                    style={getAnimationDelay(index)}
                  >
                    <ProductCard 
                      product={product} 
                      onClick={handleProductClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product detail modal */}
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onClose={closeProductDetail}
            onAddToCart={addToCart}
          />
        )}

        {/* Cart indicator */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 relative">
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </main>
      
      {/* Footer component */}
      <Footer />
      
      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Shop;