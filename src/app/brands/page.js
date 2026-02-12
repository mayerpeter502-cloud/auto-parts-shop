'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Star, Package } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import LazyImage from '@/components/LazyImage';

const brands = [
  { id: 1, name: 'Bosch', country: 'Германия', logo: '/brands/bosch.png', rating: 4.9, products: 1250, category: 'Запчасти' },
  { id: 2, name: 'Castrol', country: 'Великобритания', logo: '/brands/castrol.png', rating: 4.8, products: 340, category: 'Масла' },
  { id: 3, name: 'Brembo', country: 'Италия', logo: '/brands/brembo.png', rating: 4.9, products: 520, category: 'Тормоза' },
  { id: 4, name: 'NGK', country: 'Япония', logo: '/brands/ngk.png', rating: 4.7, products: 280, category: 'Свечи' },
  { id: 5, name: 'Mann', country: 'Германия', logo: '/brands/mann.png', rating: 4.8, products: 890, category: 'Фильтры' },
  { id: 6, name: 'Varta', country: 'Германия', logo: '/brands/varta.png', rating: 4.6, products: 45, category: 'Аккумуляторы' },
  { id: 7, name: 'Toyota', country: 'Япония', logo: '/brands/toyota.png', rating: 4.9, products: 2100, category: 'Оригинал' },
  { id: 8, name: 'Mobil', country: 'США', logo: '/brands/mobil.png', rating: 4.8, products: 290, category: 'Масла' },
  { id: 9, name: 'Continental', country: 'Германия', logo: '/brands/continental.png', rating: 4.7, products: 670, category: 'Ремни' },
  { id: 10, name: 'Denso', country: 'Япония', logo: '/brands/denso.png', rating: 4.8, products: 450, category: 'Запчасти' },
  { id: 11, name: 'KYB', country: 'Япония', logo: '/brands/kyb.png', rating: 4.6, products: 320, category: 'Амортизаторы' },
  { id: 12, name: 'SKF', country: 'Швеция', logo: '/brands/skf.png', rating: 4.9, products: 780, category: 'Подшипники' },
];

const categories = ['Все', 'Запчасти', 'Масла', 'Фильтры', 'Тормоза', 'Свечи', 'Аккумуляторы', 'Оригинал'];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Бренды', href: '/brands' }]} />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Бренды</h1>
          <p className="text-gray-600">Оригинальные запчасти и качественные аналоги от мировых производителей</p>
        </div>

        {/* Поиск */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск бренда..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка брендов */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBrands.map(brand => (
            <Link
              key={brand.id}
              href={`/catalog?brand=${brand.name}`}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center"
            >
              <div className="aspect-square mb-4 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <div className="text-2xl font-bold text-gray-400">{brand.name[0]}</div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{brand.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{brand.country}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {brand.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {brand.products}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Бренды не найдены
          </div>
        )}

        {/* Популярные бренды */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Почему оригинальные бренды?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2">Гарантия качества</h3>
              <p className="text-blue-100 text-sm">Все товары сертифицированы и имеют гарантию от производителя</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Официальные дилеры</h3>
              <p className="text-blue-100 text-sm">Работаем напрямую с производителями без посредников</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Проверка подлинности</h3>
              <p className="text-blue-100 text-sm">Каждая деталь проходит проверку перед отправкой</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}