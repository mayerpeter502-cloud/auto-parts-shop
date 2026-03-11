"use client";
import { useGarage } from '@/contexts/GarageContext'; // Проверьте этот путь!
import { Car, Trash2, Star, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";

export default function GaragePage() {
  // Хук должен быть СТРОГО здесь, внутри функции
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
        isDefault: cars.length === 0
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
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/account" className="hover:text-blue-600">Личный кабинет</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Мой гараж</span>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мой гараж</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Добавить авто
        </button>
      </div>

      {/* Форма добавления (если нужно) */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Марка"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Модель"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={handleAddCar} className="bg-green-600 text-white px-6 py-2 rounded-lg">Сохранить</button>
            <button onClick={() => setShowAddForm(false)} className="bg-gray-100 px-6 py-2 rounded-lg">Отмена</button>
          </div>
        </div>
      )}

      {cars.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">В гараже пока нет автомобилей</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className={`p-6 rounded-xl border-2 bg-white ${car.isDefault ? 'border-blue-500' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
                  <p className="text-gray-500">{car.year} г.</p>
                </div>
                {car.isDefault && <Star className="w-5 h-5 text-blue-500 fill-blue-500" />}
              </div>
              <div className="flex gap-2">
                {!car.isDefault && (
                  <button onClick={() => setDefaultCar(car.id)} className="flex-1 text-sm bg-blue-50 text-blue-600 py-2 rounded-lg">Сделать основным</button>
                )}
                <button onClick={() => removeCar(car.id)} className="p-2 bg-red-50 text-red-500 rounded-lg"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}