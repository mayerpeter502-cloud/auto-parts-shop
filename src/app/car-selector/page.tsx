'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Car, Search, CheckCircle2 } from 'lucide-react';
import { productsApi } from '@/app/lib/api';
import Image from 'next/image';

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
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    brand: '',
    model: '',
    year: '',
    engine: '',
  });
  const [showResults, setShowResults] = useState(false);

  const engines = ['1.6L', '2.0L', '2.5L', '3.0L', '3.5L', '4.0L'];

  const handleSelect = (key: string, value: string) => {
    setSelection({ ...selection, [key]: value });
    if (key === 'brand') setStep(2);
    else if (key === 'model') setStep(3);
    else if (key === 'year') setStep(4);
    else if (key === 'engine') setShowResults(true);
  };

  const reset = () => {
    setStep(1);
    setSelection({ brand: '', model: '', year: '', engine: '' });
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Главная</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Подбор по автомобилю</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Подбор по автомобилю</h1>
          <p className="text-gray-600">Выберите параметры вашего авто для поиска совместимых запчастей</p>
        </div>

        {/* Прогресс */}
        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: 'Марка' },
            { num: 2, label: 'Модель' },
            { num: 3, label: 'Год' },
            { num: 4, label: 'Двигатель' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex flex-col items-center ${
                step >= s.num ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-1 ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="text-xs hidden sm:block">{s.label}</span>
              </div>
              {idx < 3 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 ${
                  step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Выбор параметров */}
        {!showResults ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Car className="w-6 h-6 text-blue-600" />
                  Выберите марку
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {carDatabase.brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleSelect('brand', brand)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left"
                    >
                      <span className="font-medium text-lg">{brand}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && selection.brand && (
              <div>
                <h2 className="text-xl font-bold mb-4">Выберите модель {selection.brand}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {carDatabase.models[selection.brand as keyof typeof carDatabase.models]?.map((model) => (
                    <button
                      key={model}
                      onClick={() => handleSelect('model', model)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left"
                    >
                      <span className="font-medium">{model}</span>
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="mt-4 text-gray-500 hover:text-gray-700">
                  ← Начать заново
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Выберите год выпуска</h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {carDatabase.years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleSelect('year', year.toString())}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">{year}</span>
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="mt-4 text-gray-500 hover:text-gray-700">
                  ← Начать заново
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Выберите объём двигателя</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {engines.map((engine) => (
                    <button
                      key={engine}
                      onClick={() => handleSelect('engine', engine)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left"
                    >
                      <span className="font-medium text-lg">{engine}</span>
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="mt-4 text-gray-500 hover:text-gray-700">
                  ← Начать заново
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Результат подбора */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Результат подбора</h2>
                  <p className="text-gray-500">
                    {selection.brand} {selection.model} {selection.year} г.в. {selection.engine}
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Изменить
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Найдено {productsApi.getAll().length} совместимых запчастей</span>
              </div>
            </div>

            {/* Список товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsApi.getAll().map((part) => (
                <Link
                  key={part.id}
                  href={`/product/${part.id}`}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <Image
                      src={part.image}
                      alt={part.name}
                      fill
                      className="object-contain p-4"
                    />
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
    </div>
  );
}