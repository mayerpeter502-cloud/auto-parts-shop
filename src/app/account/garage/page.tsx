"use client";
import Link from "next/link";
import { useGarage } from "../../../contexts/GarageContext";
import { Car, Trash2, Star, Plus } from "lucide-react";

export default function GaragePage() {
  const { cars, defaultCar, addCar, removeCar, setDefaultCar, isLoading } = useGarage();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Мой гараж</h1>
        <Link 
          href="/car-selector" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Добавить авто
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Гараж пуст</h2>
          <p className="text-gray-500 mb-6">Добавьте свой автомобиль для быстрого подбора запчастей</p>
          <Link 
            href="/car-selector" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Добавить первое авто
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car, index) => (
            <div 
              key={car.id} 
              className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                index === 0 ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-500 text-sm">{car.year} {car.engine || ''}</p>
                  </div>
                </div>
                {index === 0 && (
                  <div className="flex items-center gap-1 text-blue-600 text-sm">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span>Основное</span>
                  </div>
                )}
              </div>

              {car.vin && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">VIN</div>
                  <div className="font-mono text-sm">{car.vin}</div>
                </div>
              )}

              <div className="flex gap-2">
                {index > 0 && (
                  <button
                    onClick={() => setDefaultCar(car.id)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Сделать основным
                  </button>
                )}
                <button
                  onClick={() => removeCar(car.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}