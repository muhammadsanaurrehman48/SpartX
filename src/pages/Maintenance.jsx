import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for new maintenance/reminder
  const [formData, setFormData] = useState({
    description: '',
    mileage: '',
    cost: '',
    date: '',
    dueMileage: '',
    reminderDate: '',
    carId: ''
  });

  // Fetch user's cars and maintenance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/cars/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();

        console.log('User Cars:', data);
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
      const [maintenanceRes, remindersRes] = await Promise.all([
        fetch(`http://localhost:8080/maintenance/history/${carId}`, {
          credentials: 'include'
        }),
        fetch(`http://localhost:8080/maintenance/reminders/${carId}`, {
          credentials: 'include'
        })
      ]);

      const maintenance = await maintenanceRes.json();
      const reminderData = await remindersRes.json();

      setMaintenanceData(maintenance);
      setReminders(reminderData);
    } catch (error) {
      console.error('Error fetching maintenance data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isAddModalOpen ? 'history' : 'reminder';
    
    try {
      const response = await fetch(`http://localhost:8080/maintenance/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          carId: selectedCar.carId
        })
      });

      if (response.ok) {
        await fetchMaintenanceData(selectedCar.carId);
        setIsAddModalOpen(false);
        setFormData({
          description: '',
          mileage: '',
          cost: '',
          date: '',
          dueMileage: '',
          reminderDate: '',
          carId: ''
        });
      }
    } catch (error) {
      console.error('Error adding maintenance record:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Dashboard</h1>
          <select 
            className="rounded-lg border-gray-300 shadow-sm"
            onChange={(e) => {
              const car = userCars.find(c => c.carId === parseInt(e.target.value));
              setSelectedCar(car);
              fetchMaintenanceData(car.carId);
            }}
          >
            {userCars.map(car => (
              <option key={car.carId} value={car.carId}>
                {`${car.year} ${car.make} ${car.model}`}
              </option>
            ))}
          </select>
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
                onClick={() => setIsAddModalOpen(true)}
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
                onClick={() => setIsAddModalOpen(false)}
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
        {(isAddModalOpen !== null) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">
                {isAddModalOpen ? 'Add Maintenance Record' : 'Add Maintenance Reminder'}
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

                {isAddModalOpen ? (
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
                    onClick={() => setIsAddModalOpen(null)}
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