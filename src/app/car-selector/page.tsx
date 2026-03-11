'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Search, CheckCircle2, Home, PlusCircle } from 'lucide-react';
import { productsApi } from '@/app/lib/api';
import { useGarage } from '@/contexts/GarageContext';

// Расширенная база для подсказок
const carDatabase = {
  brands: ['Toyota', 'Lexus', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Kia', 'Volkswagen', 'Nissan', 'Mitsubishi', 'Audi'],
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
  },
  years: Array.from({ length: 35 }, (_, i) => 2025 - i),
};

export default function CarSelectorPage() {
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
      // Имитируем поиск
      setTimeout(() => {
        const allProducts = productsApi.getAll();
        setResults(allProducts.slice(0, 8));
        setIsSearching(false);
      }, 600);
    }
  };

  const handleSaveToGarage = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      try {
        addCar({
          brand: selectedBrand,
          model: selectedModel,
          year: parseInt(selectedYear),
          isDefault: cars.length === 0
        });
        setIsSaved(true);
        // Сбросим статус "сохранено" через 3 секунды, чтобы можно было добавить еще
        setTimeout(() => setIsSaved(false), 3000);
      } catch (error) {
        console.error("Ошибка при добавлении в гараж:", error);
        alert("Не удалось сохранить авто. Проверьте консоль.");
      }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Подбор по автомобилю</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Выбор марки */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
                <select 
                  value={selectedBrand}
                  onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); }}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Выберите марку</option>
                  {carDatabase.brands.sort().map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Выбор модели */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
                <select 
                  value={selectedModel}
                  disabled={!selectedBrand}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Выберите модель</option>
                  {selectedBrand && carDatabase.models[selectedBrand as keyof typeof carDatabase.models]?.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Выбор года */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Год выпуска</label>
                <select 
                  value={selectedYear}
                  disabled={!selectedModel}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                className="flex-[2] h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSearching ? "Поиск..." : <><Search className="w-5 h-5" /> Показать запчасти</>}
              </button>

              <button
                onClick={handleSaveToGarage}
                disabled={!selectedYear || isSaved}
                className={`flex-1 h-12 font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'border-green-500 text-green-600 bg-green-50' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:border-gray-300 disabled:text-gray-400'
                }`}
              >
                {isSaved ? (
                  <><CheckCircle2 className="w-5 h-5" /> Добавлено</>
                ) : (
                  <><PlusCircle className="w-5 h-5" /> В гараж</>
                )}
              </button>
            </div>
          </div>

          {/* Результаты поиска */}
          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results.map((part) => (
                <Link key={part.id} href={`/product/${part.id}`} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow group">
                  <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                    {part.image && (
                      <Image 
                        src={part.image} 
                        alt={part.name} 
                        fill 
                        className="object-contain group-hover:scale-110 transition-transform" 
                      />
                    )}
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 text-gray-800">{part.name}</h4>
                  <p className="text-blue-600 font-bold mt-2">{part.price.toLocaleString()} ₸</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}