'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, Package } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchAutocomplete from '@/components/SearchAutocomplete';

const brands = [
  { id: 1, name: 'Bosch', country: 'Германия', rating: 4.9, products: 1250, category: 'Запчасти' },
  { id: 2, name: 'Castrol', country: 'Великобритания', rating: 4.8, products: 340, category: 'Масла' },
  { id: 3, name: 'Brembo', country: 'Италия', rating: 4.9, products: 520, category: 'Тормоза' },
  { id: 4, name: 'NGK', country: 'Япония', rating: 4.7, products: 280, category: 'Свечи' },
  { id: 5, name: 'Mann', country: 'Германия', rating: 4.8, products: 890, category: 'Фильтры' },
  { id: 6, name: 'Varta', country: 'Германия', rating: 4.6, products: 45, category: 'Аккумуляторы' },
  { id: 7, name: 'Toyota', country: 'Япония', rating: 4.9, products: 2100, category: 'Оригинал' },
  { id: 8, name: 'Mobil', country: 'США', rating: 4.8, products: 290, category: 'Масла' },
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
          <SearchAutocomplete />
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
      </div>
    </div>
  );
}