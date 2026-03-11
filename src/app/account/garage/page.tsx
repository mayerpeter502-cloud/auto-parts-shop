"use client";
import { useGarage } from '@/contexts/GarageContext';
import { Car, Trash2, Star, Plus, ChevronRight, Home, PlusCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";

const carDatabase = {
  brands: ['Toyota', 'Lexus', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Kia', 'Volkswagen', 'Nissan', 'Mitsubishi', 'Audi', 'Lada', 'Другая марка...'],
  models: {
    'Toyota': ['Camry', 'RAV4', 'Corolla', 'Land Cruiser', 'Prado'],
    'Lexus': ['ES', 'RX', 'LX', 'NX'],
    'Hyundai': ['Accent', 'Elantra', 'Sonata', 'Tucson'],
    'Kia': ['Rio', 'Sportage', 'Sorento', 'K5'],
    'Lada': ['Granta', 'Vesta', 'Niva', 'Largus'],
    'Другая марка...': []
  },
  years: Array.from({ length: 40 }, (_, i) => 2025 - i),
};

export default function GaragePage() {
  const { cars, addCar, removeCar, setDefaultCar, isLoading } = useGarage();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [brand, setBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [model, setModel] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  // Логика определения финального значения (из списка или ручной ввод)
  const isCustomBrand = brand === 'Другая марка...';
  const finalBrand = isCustomBrand ? customBrand : brand;
  
  // Модель считается валидной, если выбрана из списка ИЛИ если введена вручную при выборе "Другая модель" или "Другая марка"
  const isCustomModel = model === 'Другая модель...' || isCustomBrand;
  const finalModel = isCustomModel ? customModel : model;

  const handleAddCar = () => {
    if (finalBrand.trim() && finalModel.trim() && year) {
      addCar({
        brand: finalBrand,
        model: finalModel,
        year: parseInt(year),
        licensePlate: licensePlate,
        isDefault: cars.length === 0
      });
      setBrand(''); setCustomBrand(''); setModel(''); setCustomModel(''); setYear(''); setLicensePlate('');
      setShowAddForm(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Загрузка...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1"><Home className="w-4 h-4" /> Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Мой гараж</span>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мой гараж</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all"
        >
          {showAddForm ? <AlertCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddForm ? 'Отмена' : 'Добавить авто'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Марка */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Марка</label>
              <select 
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setModel(''); }}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Выберите марку</option>
                {carDatabase.brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {isCustomBrand && (
                <input 
                  type="text" 
                  placeholder="Название марки (например, Lada)"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-blue-300 mt-2 outline-none"
                />
              )}
            </div>

            {/* Модель */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Модель</label>
              <select 
                value={model}
                disabled={!brand}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Выберите модель</option>
                {brand && carDatabase.models[brand as keyof typeof carDatabase.models]?.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
                {brand && <option value="Другая модель...">Другая модель...</option>}
              </select>
              {isCustomModel && (
                <input 
                  type="text" 
                  placeholder="Название модели"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-blue-300 mt-2 outline-none"
                />
              )}
            </div>

            {/* Год */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Год выпуска</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Год</option>
                {carDatabase.years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Госномер */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Госномер</label>
              <input
                type="text"
                placeholder="777 ABC 01"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleAddCar}
              disabled={!finalBrand.trim() || !finalModel.trim() || !year}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> Сохранить
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className={`p-6 rounded-2xl border-2 bg-white ${car.isDefault ? 'border-blue-500 shadow-md' : 'border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-xl"><Car className={`w-6 h-6 ${car.isDefault ? 'text-blue-600' : 'text-gray-400'}`} /></div>
              {car.isDefault && <div className="flex items-center gap-1 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full"><Star className="w-3 h-3 fill-white" /> Основной</div>}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-gray-500 text-sm mb-6">{car.year} г.в. {car.licensePlate && `• ${car.licensePlate}`}</p>
            <div className="flex gap-2">
              {!car.isDefault && <button onClick={() => setDefaultCar(car.id)} className="flex-1 text-xs font-bold bg-blue-50 text-blue-600 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">Выбрать основным</button>}
              <button onClick={() => removeCar(car.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}