'use client';

import { useState } from 'react';
import { Search, Car, CheckCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

// Моковые данные для демо VIN-запроса
const mockVinData = {
  vin: 'Z8NAJL00050366181',
  vehicle: {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    engine: '2.5L 4WD',
    transmission: 'Автомат',
    bodyType: 'Седан'
  },
  compatibleParts: [
    { id: 101, name: 'Масло моторное Toyota Genuine 5W-30 4L', price: 18500, brand: 'Toyota', category: 'Масла', rating: 4.9, reviews: 342, inStock: true, image: '/products/oil-toyota.jpg', sku: 'TOY-5W30-4L', compatibility: '100%' },
    { id: 102, name: 'Фильтр масляный оригинальный', price: 3200, brand: 'Toyota', category: 'Фильтры', rating: 4.8, reviews: 156, inStock: true, image: '/products/filter-toyota.jpg', sku: 'TOY-FILTER-01', compatibility: '100%' },
    { id: 103, name: 'Тормозные колодки передние', price: 24500, brand: 'Brembo', category: 'Тормозная система', rating: 4.7, reviews: 89, inStock: true, image: '/products/brake-camry.jpg', sku: 'BRE-CAMRY-F', compatibility: '100%' },
    { id: 104, name: 'Воздушный фильтр', price: 4500, brand: 'Mann', category: 'Фильтры', rating: 4.6, reviews: 78, inStock: false, image: '/products/airfilter-camry.jpg', sku: 'MAN-CAMRY-AIR', compatibility: '95%' },
    { id: 105, name: 'Свечи зажигания Iridium', price: 12800, brand: 'NGK', category: 'Свечи', rating: 4.9, reviews: 203, inStock: true, image: '/products/spark-camry.jpg', sku: 'NGK-IR-CAMRY', compatibility: '100%' },
    { id: 106, name: 'Щетки стеклоочистителя 26"+18"', price: 8900, brand: 'Bosch', category: 'Стеклоочистители', rating: 4.5, reviews: 67, inStock: true, image: '/products/wiper-camry.jpg', sku: 'BOS-CAMRY-WIP', compatibility: '100%' },
  ]
};

export default function VinPage() {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vin.length < 17) {
      setError('VIN должен содержать 17 символов');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // Имитация API-запроса
    setTimeout(() => {
      if (vin.toUpperCase() === mockVinData.vin) {
        setResult(mockVinData);
      } else {
        // Для любого другого VIN показываем демо-данные с другим авто
        setResult({
          ...mockVinData,
          vin: vin.toUpperCase(),
          vehicle: {
            ...mockVinData.vehicle,
            brand: 'Kia',
            model: 'K5',
            year: 2021
          }
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Подбор по VIN', href: '/vin' }]} />
        
        {/* Hero секция */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Подбор запчастей по VIN</h1>
          <p className="text-blue-100 mb-6 max-w-2xl">
            Введите VIN-номер вашего автомобиля и получите список совместимых запчастей. 
            Гарантия подбора 100% — мы проверяем совместимость по оригинальным каталогам.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="Введите VIN (17 символов)"
                maxLength={17}
                className="w-full pl-12 pr-32 py-4 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-300 text-lg uppercase tracking-wider"
              />
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <button
                type="submit"
                disabled={loading || vin.length < 17}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Поиск...' : 'Подобрать'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </form>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Проверка по оригинальным каталогам
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Гарантия совместимости
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Более 50 000 позиций
            </span>
          </div>
        </div>

        {/* Результаты */}
        {result && (
          <div className="space-y-6">
            {/* Информация об авто */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {result.vehicle.brand} {result.vehicle.model} {result.vehicle.year}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">VIN: {result.vin}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{result.vehicle.engine}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{result.vehicle.transmission}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{result.vehicle.bodyType}</span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Сохранить в гараж
                </button>
              </div>
            </div>

            {/* Категории */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Все', 'Масла и жидкости', 'Фильтры', 'Тормозная система', 'Двигатель', 'Подвеска', 'Электрика'].map((cat, idx) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    idx === 0 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Товары */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Совместимые запчасти ({result.compatibleParts.length})
                </h3>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Все детали проверены на совместимость
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.compatibleParts.map(product => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.compatibility}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Рекомендации ТО */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Рекомендуемое ТО для {result.vehicle.brand} {result.vehicle.model}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'ТО-1 (15 000 км)', items: 'Замена масла, фильтра', price: 'от 25 000 ₸' },
                  { name: 'ТО-2 (30 000 км)', items: 'Полное обслуживание', price: 'от 45 000 ₸' },
                  { name: 'ТО-3 (60 000 км)', items: 'Капитальное обслуживание', price: 'от 85 000 ₸' },
                ].map((service, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{service.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600">{service.price}</span>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        Выбрать <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Инструкция */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { 
                step: '1', 
                title: 'Найдите VIN', 
                desc: 'VIN-номер указан в свидетельстве о регистрации (СТС), ПТС или на кузове авто (торец панели приборов слева)' 
              },
              { 
                step: '2', 
                title: 'Введите VIN', 
                desc: 'Введите 17-символьный код в поле выше. Система автоматически определит комплектацию вашего авто' 
              },
              { 
                step: '3', 
                title: 'Получите результат', 
                desc: 'Мы покажем только совместимые запчасти с гарантией подбора. Добавляйте нужные в корзину' 
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}