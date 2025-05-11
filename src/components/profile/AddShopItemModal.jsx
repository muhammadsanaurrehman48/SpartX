import { useState, useEffect } from 'react';
import { X, Upload, Loader, Package } from 'lucide-react';

const categoryOptions = [
  { value: 'PART', label: 'Car Part' },
  { value: 'FLUID', label: 'Fluid' },
  { value: 'ACCESSORY', label: 'Accessory' },
  { value: 'TOOL', label: 'Tool' },
  { value: 'SERVICE', label: 'Service' }
];

export default function AddShopItemModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        productName: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: ''
      });
      setErrors({});
      setImagePreview(null);
    }
  }, [isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Handle number fields
    if (name === 'price') {
      // Allow only numbers and one decimal point
      if (!/^(\d+\.?\d*)?$/.test(value)) return;
    }
    
    if (name === 'stock') {
      // Allow only integers
      if (!/^\d*$/.test(value)) return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleimagesChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      images: [value]
    });
    
    // Update image preview when URL changes
    if (value) {
      setImagePreview(value);
    } else {
      setImagePreview(null);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock quantity cannot be negative';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productName: formData.productName,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
          images: formData.images || []
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      const data = await response.json();
    
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors({
        ...errors,
        submit: 'Failed to add product. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Package className="h-5 w-5 text-purple-500 mr-2" />
            Add New Shop Item
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.productName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors`}
              placeholder="Enter product description"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          {/* Price and Stock (side by side) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)*
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity*
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
              )}
            </div>
          </div>
          
          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors`}
            >
              <option value="" disabled>Select a category</option>
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          
          {/* Image URL */}
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="images"
              name="images"
              value={formData.images}
              onChange={handleimagesChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">Leave empty to use a default image</p>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2 border rounded-md p-2">
                <p className="text-xs text-gray-500 mb-1">Image preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 object-contain mx-auto"
                  onError={() => setImagePreview('/api/placeholder/150/150')}
                />
              </div>
            )}
          </div>
          
          {/* Error message */}
          {errors.submit && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-500">{errors.submit}</p>
            </div>
          )}
          
          {/* Form actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}