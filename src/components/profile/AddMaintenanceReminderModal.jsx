import React, { useState, useEffect } from 'react';
import { X, Calendar, Car, FileText, Info, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddMaintenanceReminderModal({ isOpen, onClose, userCars = [] }) {
  const [formData, setFormData] = useState({
    carId: '',
    carName: '',
    reminderDate: '',
    description: '',
    dueMileage: ''
  });

  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        carId: '',
        carName: '',
        reminderDate: '',
        description: '',
        dueMileage: ''
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
    
    // Special handling for dueMileage to ensure it's a number
    if (name === 'dueMileage') {
      if (!/^\d*$/.test(value)) return; // Only allow digits
    }
    
    // If a car is selected from dropdown, update both carId and carName
    if (name === 'carId' && value) {
      const selectedCar = userCars.find(car => car.carId.toString() === value);
      if (selectedCar) {
        setFormData({
          ...formData,
          carId: value,
          carName: `${selectedCar.year} ${selectedCar.model} ${selectedCar.name}`.trim()
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.carId && !formData.carName) {
      newErrors.carId = 'Please select or enter a car';
    }
    
    if (!formData.reminderDate) {
      newErrors.reminderDate = 'Reminder date is required';
    } else {
      const selectedDate = new Date(formData.reminderDate);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.reminderDate = 'Date cannot be in the past';
      }
    }

    if(!formData.dueMileage) {
        newErrors.dueMileage = 'Due mileage is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.dueMileage && parseInt(formData.dueMileage) <= 0) {
      newErrors.dueMileage = 'Mileage must be greater than 0';
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
      // Prepare the data for submission
      const reminderDate = formData.reminderDate 
      ? new Date(formData.reminderDate)
      : null;
    
      // Full ISO string format that Java's Date parser can handle
      const formattedDateString = reminderDate ? reminderDate.toISOString() : null;

      const reminderData = {
        carId: formData.carId || null,
        carName: formData.carName,
        description: formData.description,
        reminderDate: formattedDateString,
        dueMileage: parseInt(formData.dueMileage),
      };
      
      const response = await fetch('http://localhost:8080/maintenance/reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reminderData)
      });
      if (!response.ok) throw new Error('Failed to add maintenance reminder');
      const data = await response.json();
      navigate('/profile');

      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error adding maintenance reminder:', error);
      setErrors({
        ...errors,
        submit: 'Failed to add reminder. Please try again.'
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
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Add Maintenance Reminder
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
          {/* Car Selection */}
          <div className="mb-4">
            <label htmlFor="carId" className="block text-sm font-medium text-gray-700 mb-1">
              Car*
            </label>
            <div className="relative">
              {userCars && userCars.length > 0 ? (
                <select
                  id="carId"
                  name="carId"
                  value={formData.carId}
                  onChange={handleChange}
                  className={`w-full p-2 pl-9 border ${errors.carId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                >
                  <option value="">Select a car</option>
                  {userCars.map(car => (
                    <option key={car.carId} value={car.carId}>
                      {car.year} {car.model} {car.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="carName"
                  name="carName"
                  value={formData.carName}
                  onChange={handleChange}
                  className={`w-full p-2 pl-9 border ${errors.carId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Enter car name"
                />
              )}
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.carId && (
              <p className="mt-1 text-sm text-red-500">{errors.carId}</p>
            )}
          </div>
          
          {/* Reminder Date */}
          <div className="mb-4">
            <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Date*
            </label>
            <div className="relative">
              <input
                type="date"
                id="reminderDate"
                name="reminderDate"
                value={formData.reminderDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // Set min to today
                className={`w-full p-2 pl-9 border ${errors.reminderDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.reminderDate && (
              <p className="mt-1 text-sm text-red-500">{errors.reminderDate}</p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Service Description*
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full p-2 pl-9 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="e.g., Oil Change, Tire Rotation, Brake Inspection"
              ></textarea>
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          {/* Due Mileage */}
          <div className="mb-4">
            <label htmlFor="dueMileage" className="block text-sm font-medium text-gray-700 mb-1">
              Due Mileage*
            </label>
            <div className="relative">
              <input
                type="text"
                id="dueMileage"
                name="dueMileage"
                value={formData.dueMileage}
                onChange={handleChange}
                className={`w-full p-2 pl-9 border ${errors.dueMileage ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter mileage when service is due"
              />
              <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.dueMileage && (
              <p className="mt-1 text-sm text-red-500">{errors.dueMileage}</p>
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
                'Add Reminder'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}