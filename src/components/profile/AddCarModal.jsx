import { useState, useEffect } from 'react';
import { X, Car, Calendar, Package, Building, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const carCategories = [
  { value: 'SEDAN', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'HATCHBACK', label: 'Hatchback' },
  { value: 'CONVERTIBLE', label: 'Convertible' },
  { value: 'COUPE', label: 'Coupe' },
  { value: 'MINIVAN', label: 'Minivan' },
  { value: 'TRUCK', label: 'Truck' },
  { value: 'OTHER', label: 'Other' }
];

export default function AddCarModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    category: '',
    company: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();
  
  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        model: '',
        year: new Date().getFullYear(),
        category: '',
        company: ''
      });
      setErrors({});
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
    
    // Special handling for year to ensure it's a valid number
    if (name === 'year') {
      // Ensure year is a number between 1900 and current year + 1
      const currentYear = new Date().getFullYear();
      const yearValue = Math.min(Math.max(parseInt(value) || currentYear, 1900), currentYear + 1);
      
      setFormData({
        ...formData,
        [name]: yearValue
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Car name is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else {
      const currentYear = new Date().getFullYear();
      if (formData.year < 1900 || formData.year > currentYear + 1) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company/Make is required';
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
      const response = await fetch('http://localhost:8080/cars/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
        if (response.ok) Navigate('/profile');
        if (!response.ok) throw new Error('Failed to add car');
        const data = await response.json();
        

      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error adding car:', error);
      setErrors({
        ...errors,
        submit: 'Failed to add car. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Car className="h-5 w-5 text-blue-500 mr-2" />
            Add New Car
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Car Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Car Name*
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 pl-9 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter car name"
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Car Model */}
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model*
            </label>
            <div className="relative">
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={`w-full p-2 pl-9 border ${errors.model ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter car model"
              />
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.model && (
              <p className="mt-1 text-sm text-red-500">{errors.model}</p>
            )}
          </div>
          
          {/* Car Year and Category (side by side) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year*
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full p-2 pl-9 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.year && (
                <p className="mt-1 text-sm text-red-500">{errors.year}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              >
                <option value="" disabled>Select a category</option>
                {carCategories.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>
          
          {/* Car Company/Make */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company/Make*
            </label>
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full p-2 pl-9 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter car manufacturer"
              />
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company}</p>
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
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Car'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}