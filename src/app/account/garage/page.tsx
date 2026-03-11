"use client";
import { useGarage } from '@/contexts/GarageContext';
import { Car, Trash2, Star, Plus } from 'lucide-react';
import { useState } from 'react';

export default function GaragePage() {
  const { cars, defaultCar, addCar, removeCar, setDefaultCar, isLoading } = useGarage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCar, setNewCar] = useState({ 
    brand: '', 
    model: '', 
    year: '', 
    licensePlate: '' 
  });

  const handleAddCar = () => {
    if (newCar.brand && newCar.model && newCar.year) {
      addCar({
        brand: newCar.brand,
        model: newCar.model,
        year: parseInt(newCar.year),
        licensePlate: newCar.licensePlate,
      });
      setNewCar({ brand: '', model: '', year: '', licensePlate: '' });
      setShowAddForm(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Мой гараж</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Добавить авто
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Добавить автомобиль</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Марка (например: Toyota)"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Модель (например: Camry)"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Год (например: 2020)"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Номерной знак"
              value={newCar.licensePlate}
              onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddCar}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Сохранить
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {cars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Гараж пуст</h2>
          <p className="text-gray-500 mb-4">Добавьте свой первый автомобиль</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Добавить авто
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-white rounded-lg shadow-md border-2 ${
                defaultCar?.id === car.id ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-600">{car.year} г.</p>
                    {car.licensePlate && (
                      <p className="text-gray-500 text-sm">{car.licensePlate}</p>
                    )}
                  </div>
                  {defaultCar?.id === car.id && (
                    <Star className="w-6 h-6 text-blue-500 fill-blue-500" />
                  )}
                </div>
                <div className="flex gap-2">
                  {defaultCar?.id !== car.id && (
                    <button
                      onClick={() => setDefaultCar(car.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      <Star className="w-4 h-4" />
                      По умолчанию
                    </button>
                  )}
                  <button
                    onClick={() => removeCar(car.id)}
                    className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}