'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Car, 
  Search, 
  CheckCircle2, 
  Home, 
  Save, 
  PlusCircle 
} from 'lucide-react';
import { productsApi } from '@/app/lib/api';
import { useGarage } from '@/contexts/GarageContext'; // Импорт хука

const carDatabase = {
  brands: ['Toyota', 'Lexus', 'BMW', 'Mercedes', 'Hyundai', 'Kia'],
  models: {
    'Toyota': ['Camry', 'RAV4', 'Corolla', 'Land Cruiser', 'Hilux'],
    'Lexus': ['ES', 'RX', 'LX', 'NX', 'GX'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X6'],
    'Mercedes': ['C-Class', 'E-Class', 'GLE', 'GLC', 'S-Class'],
    'Hyundai': ['Accent', 'Elantra', 'Tucson', 'Santa Fe', 'Creta'],
    'Kia': ['Rio', 'Optima', 'Sportage', 'Sorento', 'Cerato'],
  },
  years: Array.from({ length: 25 }, (_, i) => 2025 - i),
};

export default function CarSelectorPage() {
  // Инициализация хука гаража
  const { addCar, cars } = useGarage();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSearch = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      setIsSearching(true);
      setIsSaved(false);
      // Имитация поиска товаров под авто
      setTimeout(() => {
        const allProducts = productsApi.getAll();
        setResults(allProducts.slice(0, 8));
        setIsSearching(false);
      }, 800);
    }
  };

  const handleSaveToGarage = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      addCar({
        brand: selectedBrand,
        model: selectedModel,
        year: parseInt(selectedYear),
        isDefault: cars.length === 0 // Сделать первым, если гараж пуст
      });
      setIsSaved(true);
      alert('Автомобиль сохранен в ваш гараж!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <Home className="w-4 h-4" /> Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Подбор по авто</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Подбор запчастей по автомобилю</h1>
            <p className="text-gray-600">Выберите параметры вашего авто, чтобы увидеть подходящие детали</p>
          </div>

          {/* Форма подбора */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
                <select 
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel('');
                  }}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Выберите марку</option>
                  {carDatabase.brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
                <select 
                  value={selectedModel}
                  disabled={!selectedBrand}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">Выберите модель</option>
                  {selectedBrand && carDatabase.models[selectedBrand as keyof typeof carDatabase.models].map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Год выпуска</label>
                <select 
                  value={selectedYear}
                  disabled={!selectedModel}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">Выберите год</option>
                  {carDatabase.years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSearch}
                disabled={!selectedYear || isSearching}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Показать запчасти
              </button>

              {selectedYear && !isSearching && (
                <button
                  onClick={handleSaveToGarage}
                  disabled={isSaved}
                  className={`flex-1 h-12 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border-2 ${
                    isSaved 
                    ? 'border-green-500 text-green-600 bg-green-50' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isSaved ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <PlusCircle className="w-5 h-5" />
                  )}
                  {isSaved ? 'Сохранено в гараже' : 'Сохранить в гараж'}
                </button>
              )}
            </div>
          </div>

          {/* Результаты поиска */}
          {results.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Car className="w-6 h-6 text-blue-600" />
                Запчасти для {selectedBrand} {selectedModel} {selectedYear}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((part) => (
                  <Link 
                    key={part.id} 
                    href={`/product/${part.id}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {part.image ? (
                        <Image
                          src={part.image}
                          alt={part.name}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-xs">Нет фото</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">{part.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{part.brand}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">{part.price.toLocaleString()} ₸</p>
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Подходит
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}