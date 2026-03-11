"use client";
import { useGarage } from '@/contexts/GarageContext';
import { Car, Trash2, Star, Plus, ChevronRight, Home, PlusCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";

// Единая база данных для синхронизации с подбором
const carDatabase = {
  brands: ['Toyota', 'Lexus', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Kia', 'Volkswagen', 'Nissan', 'Mitsubishi', 'Audi', 'Другая марка...'],
  models: {
    'Toyota': ['Camry', 'RAV4', 'Corolla', 'Land Cruiser', 'Prado', 'Hilux', 'Highlander'],
    'Lexus': ['ES', 'RX', 'LX', 'NX', 'GX', 'IS'],
    'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6', 'X7'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'GLS', 'G-Class'],
    'Hyundai': ['Accent', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Creta', 'Palisade'],
    'Kia': ['Rio', 'Cerato', 'K5', 'Sportage', 'Sorento', 'Carnival', 'Stinger'],
    'Volkswagen': ['Polo', 'Passat', 'Tiguan', 'Touareg', 'Golf', 'Teramont'],
    'Nissan': ['Qashqai', 'X-Trail', 'Patrol', 'Juke', 'Terrano', 'Murano'],
    'Mitsubishi': ['Lancer', 'Pajero', 'Outlander', 'ASX', 'L200', 'Montero'],
    'Audi': ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8'],
    'Другая марка...': []
  },
  years: Array.from({ length: 40 }, (_, i) => 2025 - i),
};

export default function GaragePage() {
  const { cars, addCar, removeCar, setDefaultCar, isLoading } = useGarage();
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Состояния для формы
  const [brand, setBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [model, setModel] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const finalBrand = brand === 'Другая марка...' ? customBrand : brand;
  const finalModel = model === 'Другая модель...' ? customModel : model;

  const handleAddCar = () => {
    if (finalBrand && finalModel && year) {
      addCar({
        brand: finalBrand,
        model: finalModel,
        year: parseInt(year),
        licensePlate: licensePlate,
        isDefault: cars.length === 0
      });
      // Сброс формы
      setBrand('');
      setCustomBrand('');
      setModel('');
      setCustomModel('');
      setYear('');
      setLicensePlate('');
      setShowAddForm(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Загрузка гаража...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Главная
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/account" className="hover:text-blue-600">Личный кабинет</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium text-sm">Мой гараж</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мой гараж</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm active:scale-95"
        >
          {showAddForm ? <AlertCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddForm ? 'Отмена' : 'Добавить авто'}
        </button>
      </div>

      {/* Форма добавления (синхронизированная с селектором) */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Марка */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Марка</label>
              <select 
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setModel(''); }}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">Выберите марку</option>
                {carDatabase.brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {brand === 'Другая марка...' && (
                <input 
                  type="text" 
                  placeholder="Введите марку"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-blue-300 mt-2 outline-none animate-in zoom-in-95"
                />
              )}
            </div>

            {/* Модель */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Модель</label>
              <select 
                value={model}
                disabled={!brand}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">Выберите модель</option>
                {brand && carDatabase.models[brand as keyof typeof carDatabase.models]?.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
                {brand && brand !== 'Другая марка...' && <option value="Другая модель...">Другая модель...</option>}
              </select>
              {model === 'Другая модель...' && (
                <input 
                  type="text" 
                  placeholder="Введите модель"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-blue-300 mt-2 outline-none animate-in zoom-in-95"
                />
              )}
            </div>

            {/* Год */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Год выпуска</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">Год</option>
                {carDatabase.years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Госномер (опционально) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Госномер (необязательно)</label>
              <input
                type="text"
                placeholder="Напр: 777 ABC 01"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleAddCar}
              disabled={!finalBrand || !finalModel || !year}
              className="flex-1 sm:flex-none bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> Сохранить в гараж
            </button>
            <button 
              onClick={() => setShowAddForm(false)} 
              className="flex-1 sm:flex-none bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список автомобилей */}
      {cars.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-500 mb-6">В вашем гараже пока нет автомобилей</p>
          {!showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Добавить первый автомобиль
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className={`group relative p-6 rounded-2xl border-2 bg-white transition-all ${
                car.isDefault ? 'border-blue-500 shadow-md shadow-blue-50' : 'border-gray-100 hover:border-blue-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Car className={`w-6 h-6 ${car.isDefault ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                {car.isDefault && (
                  <div className="flex items-center gap-1 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-white" /> Основной
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
                <div className="flex items-center gap-3 mt-1 text-gray-500 text-sm">
                  <span>{car.year} г.в.</span>
                  {car.licensePlate && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs uppercase">{car.licensePlate}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {!car.isDefault && (
                  <button 
                    onClick={() => setDefaultCar(car.id)} 
                    className="flex-1 text-xs font-bold bg-blue-50 text-blue-600 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Выбрать основным
                  </button>
                )}
                <button 
                  onClick={() => removeCar(car.id)} 
                  className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  title="Удалить из гаража"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Кнопка "Добавить" в конце списка */}
          {!showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all min-h-[200px]"
            >
              <PlusCircle className="w-10 h-10 mb-2" />
              <span className="font-semibold">Добавить авто</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}