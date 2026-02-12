'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function FilterSidebar({ filters, onChange, onReset }) {
  const [expanded, setExpanded] = useState({
    price: true,
    brands: true,
    availability: true,
    category: true,
  });

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const brands = ['Bosch', 'Mann-Filter', 'Mobil', 'Castrol', 'Liqui Moly', 'Febi', 'SKF', 'VAG'];
  const categories = ['Масла', 'Фильтры', 'Тормоза', 'Двигатель', 'Подвеска', 'Электрика'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between lg:hidden">
        <h3 className="font-bold text-gray-900">Фильтры</h3>
        <button onClick={onReset} className="text-sm text-red-500 hover:text-red-600">
          Сбросить
        </button>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Цена
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.price ? '' : '-rotate-90'}`} />
        </button>
        
        {expanded.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="От"
                value={filters.priceMin || ''}
                onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                placeholder="До"
                value={filters.priceMax || ''}
                onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="1000"
              value={filters.priceMax || 500000}
              onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
              className="w-full accent-blue-600"
            />
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Наличие
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.availability ? '' : '-rotate-90'}`} />
        </button>
        
        {expanded.availability && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">В наличии</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onOrder}
                onChange={(e) => onChange({ ...filters, onOrder: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Под заказ</span>
            </label>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Бренды
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.brands ? '' : '-rotate-90'}`} />
        </button>
        
        {expanded.brands && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand)}
                  onChange={(e) => {
                    const newBrands = e.target.checked
                      ? [...(filters.brands || []), brand]
                      : (filters.brands || []).filter(b => b !== brand);
                    onChange({ ...filters, brands: newBrands });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Категория
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.category ? '' : '-rotate-90'}`} />
        </button>
        
        {expanded.category && (
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(cat)}
                  onChange={(e) => {
                    const newCats = e.target.checked
                      ? [...(filters.categories || []), cat]
                      : (filters.categories || []).filter(c => c !== cat);
                    onChange({ ...filters, categories: newCats });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset button desktop */}
      <button
        onClick={onReset}
        className="hidden lg:flex w-full items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <X className="w-4 h-4" />
        Сбросить фильтры
      </button>
    </div>
  );
}