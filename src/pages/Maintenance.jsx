import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Plus, Car as CarIcon } from 'lucide-react';

export default function MaintenancePage() {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [modalType, setModalType] = useState(null); // 'history' or 'reminder' or null
  const [selectedCar, setSelectedCar] = useState(null);
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [newCarData, setNewCarData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    vin: ''
  });

  const navigate = useNavigate();

  // Initialize form data with today's date
  const [formData, setFormData] = useState({
    description: '',
    mileage: '',
    cost: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    dueMileage: '',
    reminderDate: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/carowner/cars', {
          credentials: 'include'
        });
        const data = await response.json();
        setUserCars(data);
        
        if (data.length > 0) {
          await fetchMaintenanceData(data[0].carId);
          setSelectedCar(data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchMaintenanceData = async (carId) => {
    try {
      setLoading(true);
      setError(null);

      const [historyRes, reminderRes] = await Promise.all([
        fetch(`http://localhost:8080/maintenance/history/${carId}`, {
          credentials: 'include'
        }),
        fetch(`http://localhost:8080/maintenance/reminders/${carId}`, {
          credentials: 'include'
        })
      ]);

      if (!historyRes.ok || !reminderRes.ok) {
        throw new Error('Failed to fetch maintenance data');
      }

      const history = await historyRes.json();
      const reminders = await reminderRes.json();

      setMaintenanceData(history);
      setReminders(reminders);
    } catch (error) {
      setError('Error loading maintenance data: ' + error.message);
      setMaintenanceData([]);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      const endpoint = modalType === 'history' ? 'history' : 'reminder';
      
      const payload = modalType === 'history' ? {
        description: formData.description,
        mileage: parseInt(formData.mileage),
        cost: parseFloat(formData.cost),
        date: formData.date,
        carId: selectedCar.carId
      } : {
        description: formData.description,
        dueMileage: parseInt(formData.dueMileage),
        reminderDate: formData.reminderDate,
        carId: selectedCar.carId
      };

      const response = await fetch(`http://localhost:8080/maintenance/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to add maintenance record');
      }

      await fetchMaintenanceData(selectedCar.carId);
      setModalType(null);
      setFormData({
        description: '',
        mileage: '',
        cost: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        dueMileage: '',
        reminderDate: format(new Date(), 'yyyy-MM-dd'),
      });
    } catch (error) {
      setError('Error saving record: ' + error.message);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/carowner/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newCarData)
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      // Refresh car list
      await fetchUserCars();
      setIsAddCarModalOpen(false);
      setNewCarData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        vin: ''
      });
    } catch (error) {
      setError('Error adding car: ' + error.message);
    }
  };

  const getCarDisplayName = (car) => {
    return `${car.year} ${car.make} ${car.model}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!loading && userCars.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Cars Found</h1>
          <p className="text-gray-600 mb-6">Please add a car to start tracking maintenance.</p>
          <button 
            onClick={() => setIsAddCarModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add a Car</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Dashboard</h1>
          {userCars.length > 0 ? (
            <select 
              className="rounded-lg border-gray-300 shadow-sm p-2"
              onChange={(e) => {
                const car = userCars.find(c => c.carId === parseInt(e.target.value));
                setSelectedCar(car);
                fetchMaintenanceData(car.carId);
              }}
              value={selectedCar?.carId || ''}
            >
              {userCars.map(car => (
                <option key={car.carId} value={car.carId}>
                  {getCarDisplayName(car)}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No cars available</p>
              <button 
                onClick={() => setIsAddCarModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2"
              >
                <CarIcon className="w-5 h-5" />
                <span>Add a Car</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Maintenance History Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Maintenance History</h2>
              <button
                onClick={() => setModalType('history')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Record
              </button>
            </div>
            
            <div className="space-y-4">
              {maintenanceData.map((record) => (
                <div key={record.maintenance_id} className="border rounded-lg p-4">
                  <p className="font-semibold">{record.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                    <p>Mileage: {record.mileage} km</p>
                    <p>Cost: ${record.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Maintenance Reminders Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Maintenance Reminders</h2>
              <button
                onClick={() => setModalType('reminder')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Add Reminder
              </button>
            </div>
            
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.reminder_id} className="border rounded-lg p-4">
                  <p className="font-semibold">{reminder.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <p>Due Date: {new Date(reminder.reminder_date).toLocaleDateString()}</p>
                    <p>Due Mileage: {reminder.due_mileage} km</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Add Modal */}
        {(modalType !== null) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">
                {modalType === 'history' ? 'Add Maintenance Record' : 'Add Maintenance Reminder'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                {modalType === 'history' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Mileage</label>
                      <input
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cost</label>
                      <input
                        type="number"
                        value={formData.cost}
                        onChange={(e) => setFormData({...formData, cost: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Mileage</label>
                      <input
                        type="number"
                        value={formData.dueMileage}
                        onChange={(e) => setFormData({...formData, dueMileage: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reminder Date</label>
                      <input
                        type="date"
                        value={formData.reminderDate}
                        onChange={(e) => setFormData({...formData, reminderDate: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Add Car Modal */}
        {isAddCarModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
              
              <form onSubmit={handleAddCar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Make</label>
                  <input
                    type="text"
                    value={newCarData.make}
                    onChange={(e) => setNewCarData({...newCarData, make: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    value={newCarData.model}
                    onChange={(e) => setNewCarData({...newCarData, model: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    value={newCarData.year}
                    onChange={(e) => setNewCarData({...newCarData, year: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Plate</label>
                  <input
                    type="text"
                    value={newCarData.licensePlate}
                    onChange={(e) => setNewCarData({...newCarData, licensePlate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">VIN</label>
                  <input
                    type="text"
                    value={newCarData.vin}
                    onChange={(e) => setNewCarData({...newCarData, vin: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddCarModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}