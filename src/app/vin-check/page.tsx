'use client';
import React, { useState } from 'react';
import { Search, Car, CheckCircle, AlertCircle, Loader2, Home } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const mockVinDatabase: Record<string, any> = {
  'JTDBU4EE3B9123456': {
    brand: 'Toyota',
    model: 'Camry',
    year: 2011,
    engine: '2.5L 2AR-FE',
    transmission: 'Автомат',
    bodyType: 'Седан',
    compatibleParts: [
      { category: 'Масло моторное', recommendation: '5W-30, 5W-40', popular: ['Castrol Edge', 'Mobil 1'] },
      { category: 'Воздушный фильтр', recommendation: 'Оригинал 17801-0H050', popular: ['Mann C32005', 'Bosch S0129'] },
      { category: 'Масляный фильтр', recommendation: 'Оригинал 04152-31090', popular: ['Mann HU6002x', 'Bosch F026407183'] },
      { category: 'Тормозные колодки передние', recommendation: 'Оригинал 04465-33471', popular: ['Brembo P83066', 'TRW GDB3428'] }
    ]
  },
  'Z94CT41DBMR123456': {
    brand: 'Kia',
    model: 'Sportage',
    year: 2021,
    engine: '2.0L G4NA',
    transmission: 'Автомат',
    bodyType: 'SUV',
    compatibleParts: [
      { category: 'Масло моторное', recommendation: '0W-20, 5W-30', popular: ['Mobil 1', 'Shell Helix'] },
      { category: 'Воздушный фильтр', recommendation: 'Оригинал 28113-D3300', popular: ['Mann C27024', 'Bosch S3867'] },
      { category: 'Масляный фильтр', recommendation: 'Оригинал 26300-35505', popular: ['Mann W811/80', 'Bosch F026407124'] }
    ]
  }
};

interface VinResult {
  brand: string;
  model: string;
  year: number | string;
  engine: string;
  transmission: string;
  bodyType: string;
  compatibleParts: Array<{
    category: string;
    recommendation: string;
    popular: string[];
  }>;
  isDemo?: boolean;
}

export default function VinCheckPage() {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length < 17) {
      setError('VIN-код должен содержать 17 символов');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    setTimeout(() => {
      const data = mockVinDatabase[vin.toUpperCase()];
      if (data) {
        setResult(data);
      } else {
        setResult({
          brand: 'Неизвестно',
          model: 'Требуется уточнение',
          year: '-',
          engine: '-',
          transmission: '-',
          bodyType: '-',
          compatibleParts: [],
          isDemo: true
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ← АВТОМАТИЧЕСКИЙ UPPERCASE и только допустимые символы
    let value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    
    // ← ОГРАНИЧЕНИЕ 17 символов
    if (value.length > 17) {
      value = value.slice(0, 17);
    }
    
    setVin(value);
    setError(null);
  };

  const getProgressColor = () => {
    if (vin.length === 0) return 'bg-gray-200';
    if (vin.length < 17) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Кнопка на главную */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>На главную</span>
            </Link>
          </div>
        </div>

        {/* Hero секция */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 m-4 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Car className="w-10 h-10" />
                <h1 className="text-2xl md:text-3xl font-bold">Подбор по VIN-коду</h1>
              </div>
              <p className="text-blue-100 text-lg">
                Точный подбор запчастей по уникальному коду автомобиля
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-6">
              <input
                type="text"
                value={vin}
                onChange={handleVinChange}
                placeholder="Введите VIN-код (17 символов)"
                className="w-full px-6 py-4 pr-36 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg uppercase tracking-wider font-mono"
                maxLength={17}
              />
              
              {/* ← СЧЕТЧИК СИМВОЛОВ */}
              <div className="absolute right-36 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  vin.length === 17 ? 'text-green-600' : 
                  vin.length > 0 ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {vin.length}/17
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || vin.length < 17}
                className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Найти</span>
                  </>
                )}
              </button>
            </form>

            {/* ← ПРОГРЕСС-БАР ЗАПОЛНЕНИЯ */}
            <div className="mb-4">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${(vin.length / 17) * 100}%` }}
                />
              </div>
            </div>

            {/* ← ПОДСКАЗКИ ПО ВВОДУ */}
            <div className="flex flex-wrap gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <span className="font-mono bg-white/10 px-2 py-1 rounded">A-H</span>
                <span>Буквы (кроме I, O, Q)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-white/10 px-2 py-1 rounded">0-9</span>
                <span>Цифры</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-white/10 px-2 py-1 rounded">17</span>
                <span>символов</span>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-200 bg-red-500/20 px-4 py-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2 text-sm text-blue-200">
              <span>Примеры:</span>
              {['JTDBU4EE3B9123456', 'Z94CT41DBMR123456'].map((example) => (
                <button
                  key={example}
                  onClick={() => setVin(example)}
                  className="underline hover:text-white transition-colors font-mono"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Результаты */}
        {result && (
          <div className="max-w-3xl mx-auto px-4 pb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {result.brand} {result.model}
                    </h2>
                    <p className="text-gray-500">
                      {result.year} год • {result.engine} • {result.transmission}
                    </p>
                  </div>
                </div>

                {result.isDemo && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">Автомобиль не найден в базе</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Попробуйте один из тестовых VIN-кодов выше или свяжитесь с менеджером для ручного подбора.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {result.compatibleParts.length > 0 && (
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Рекомендуемые запчасти</h3>
                  <div className="space-y-4">
                    {result.compatibleParts.map((part, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{part.category}</h4>
                            <p className="text-sm text-gray-600 mb-2">Рекомендация: {part.recommendation}</p>
                            <div className="flex flex-wrap gap-2">
                              {part.popular.map((brand, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white rounded text-xs text-gray-600 border border-gray-200">
                                  {brand}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Link
                            href={`/catalog?category=${encodeURIComponent(part.category)}&vin=${vin}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                          >
                            Подобрать
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}