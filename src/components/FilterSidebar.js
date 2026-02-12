'use client';

import { useState } from 'react';
import { ChevronDown, X, Car } from 'lucide-react';
import CarSelector from './CarSelector';

export default function FilterSidebar({ filters, onChange, availableFilters, selectedCar }) {
  const [expanded, setExpanded] = useState({
    price: true,
    brands: true,
    categories: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    onChange({ ...filters, priceRange: newRange });
  };

  const handleCheckboxChange = (type, value) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onChange({ ...filters, [type]: updated });
  };

  const clearFilters = () => {
    onChange({
      brands: [],
      categories: [],
      priceRange: [0, 100000],
      inStock: false,
    });
  };

  const hasActiveFilters = filters.brands.length > 0 || 
    filters.categories.length > 0 || 
    filters.inStock ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100000;

  return (
    <div className="space-y-4">
      {/* Подбор по авто - НОВОЕ */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-3 text-blue-800 font-medium">
          <Car className="w-5 h-5" />
          Ваш автомобиль
        </div>
        <CarSelector />
      </div>

      {/* Заголовок и сброс */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Фильтры</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Сбросить
          </button>
        )}
      </div>

      {/* Цена */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Цена
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.price ? '' : '-rotate-90'}`} />
        </button>
        {expanded.price && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="От"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="До"
              />
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>
        )}
      </div>

      {/* Бренды */}
      {availableFilters?.brands && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <button
            onClick={() => toggleSection('brands')}
            className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
          >
            Бренды
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded.brands ? '' : '-rotate-90'}`} />
          </button>
          {expanded.brands && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableFilters.brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange('brands', brand)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Категории */}
      {availableFilters?.categories && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
          >
            Категории
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded.categories ? '' : '-rotate-90'}`} />
          </button>
          {expanded.categories && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableFilters.categories.map(category => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxChange('categories', category)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Наличие */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
        >
          Наличие
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded.availability ? '' : '-rotate-90'}`} />
        </button>
        {expanded.availability && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Только в наличии</span>
          </label>
        )}
      </div>
    </div>
  );
}