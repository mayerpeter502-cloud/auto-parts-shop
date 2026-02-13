'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Car, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { productApi } from '@/app/lib/api';
import Image from 'next/image';

export default function VinCheckPage() {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length < 17) {
      setError('VIN должен содержать 17 символов');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Мок-результат
    setResult({
      vin: vin.toUpperCase(),
      vehicle: {
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        engine: '2.5L',
        transmission: 'Автомат',
        bodyType: 'Седан',
      },
      compatibleParts: productApi.getAll().slice(0, 6),
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Главная</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Проверка по VIN</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Проверка по VIN номеру</h1>
          <p className="text-gray-600">Введите VIN автомобиля для подбора совместимых запчастей</p>
        </div>

        {/* Форма проверки */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VIN номер автомобиля
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="JTDBU4EE3B9123456"
                  maxLength={17}
                  className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 uppercase focus:border-blue-600 focus:outline-none font-mono text-lg tracking-wider"
                />
                <button
                  type="submit"
                  disabled={loading || vin.length < 17}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Проверить</span>
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                VIN содержит 17 символов (латинские буквы и цифры)
              </p>
            </div>
          </form>
        </div>

        {/* Результат */}
        {result && (
          <div className="space-y-6">
            {/* Информация об авто */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Автомобиль найден</h2>
                  <p className="text-gray-500">VIN: {result.vin}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-gray-500">Марка</p>
                  <p className="font-medium text-lg">{result.vehicle.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Модель</p>
                  <p className="font-medium text-lg">{result.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Год</p>
                  <p className="font-medium text-lg">{result.vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Двигатель</p>
                  <p className="font-medium">{result.vehicle.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">КПП</p>
                  <p className="font-medium">{result.vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Кузов</p>
                  <p className="font-medium">{result.vehicle.bodyType}</p>
                </div>
              </div>
            </div>

            {/* Совместимые запчасти */}
            <div>
              <h3 className="text-xl font-bold mb-4">Рекомендуемые запчасти</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.compatibleParts.map((part: any) => (
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
                    <p className="text-lg font-bold text-blue-600">{part.price.toLocaleString()} ₸</p>
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-2">
                      <CheckCircle2 className="w-3 h-3" />
                      Совместимо
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Информационный блок */}
        {!result && (
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Где найти VIN номер?
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• На табличке в техническом паспорте (СТС)</li>
              <li>• На кузове автомобиля (обычно под лобовым стеклом)</li>
              <li>• В дверном проёме водительской двери</li>
              <li>• В сервисной книжке автомобиля</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}