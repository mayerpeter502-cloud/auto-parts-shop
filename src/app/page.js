'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Car, Wrench, Truck, Shield, ChevronRight, Star } from 'lucide-react';
import CarSelector from '@/components/CarSelector';
import ProductCard from '@/components/ProductCard';
import LazyImage from '@/components/LazyImage';

const categories = [
  { name: 'Масла и жидкости', icon: '🛢️', count: 1250 },
  { name: 'Тормозная система', icon: '🛑', count: 890 },
  { name: 'Фильтры', icon: '🌪️', count: 650 },
  { name: 'Двигатель', icon: '⚙️', count: 2100 },
  { name: 'Подвеска', icon: '🔧', count: 1800 },
  { name: 'Электрика', icon: '⚡', count: 920 },
];

const popularProducts = [
  { id: 1, name: 'Castrol EDGE 5W-30 4L', price: 12500, oldPrice: 15000, brand: 'Castrol', rating: 4.9, reviews: 342, inStock: true, image: '/products/oil1.jpg', sku: 'CAST-5W30-4L' },
  { id: 2, name: 'Bosch Фильтр масляный', price: 2800, brand: 'Bosch', rating: 4.8, reviews: 156, inStock: true, image: '/products/filter1.jpg', sku: 'BOS-P7001' },
  { id: 3, name: 'Brembo Колодки передние', price: 18500, oldPrice: 22000, brand: 'Brembo', rating: 4.9, reviews: 89, inStock: true, image: '/products/brake1.jpg', sku: 'BRE-P85020' },
  { id: 4, name: 'Varta Blue Dynamic 60Ah', price: 45000, brand: 'Varta', rating: 4.7, reviews: 203, inStock: false, image: '/products/battery1.jpg', sku: 'VAR-BD60' },
];

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Автозапчасти с доставкой по Казахстану
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Оригинальные и качественные аналоги. Подбор по VIN и марке автомобиля. Гарантия совместимости.
              </p>
              
              {/* Поиск */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск по названию, артикулу..."
                      className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <Link
                    href="/search"
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors text-center"
                  >
                    Найти
                  </Link>
                </div>
              </div>

              {/* Подбор по авто - НОВОЕ */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3 text-blue-100">
                  <Car className="w-5 h-5" />
                  <span className="font-medium">Подбор по автомобилю</span>
                </div>
                <CarSelector onSelect={setSelectedCar} />
                {selectedCar && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-blue-100">
                      Выбрано: {selectedCar.brand} {selectedCar.model} {selectedCar.year}
                    </span>
                    <Link
                      href={`/catalog?brand=${selectedCar.brand}&model=${selectedCar.model}&year=${selectedCar.year}`}
                      className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                    >
                      Показать запчасти →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Баннер */}
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <div className="text-2xl font-bold">50 000+ запчастей</div>
                  <div className="text-blue-200">в наличии и под заказ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Подбор по VIN', desc: 'Точная совместимость' },
              { icon: Shield, title: 'Гарантия', desc: '12 месяцев на все товары' },
              { icon: Truck, title: 'Доставка', desc: '1-2 дня по всему Казахстану' },
              { icon: Wrench, title: 'Сервис', desc: 'Помощь в установке' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Популярные категории</h2>
            <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Все категории <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/catalog?category=${cat.name}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-medium text-gray-900 mb-1">{cat.name}</div>
                <div className="text-sm text-gray-500">{cat.count} товаров</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Популярные товары</h2>
            <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Смотреть все <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* VIN запрос */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Подбор по VIN-номеру</h2>
          <p className="text-gray-400 mb-8">
            Введите VIN вашего автомобиля и получите список совместимых запчастей с гарантией подбора
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="VIN (17 символов)"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 uppercase tracking-wider"
              maxLength={17}
            />
            <Link
              href="/vin"
              className="px-8 py-4 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Подобрать
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}