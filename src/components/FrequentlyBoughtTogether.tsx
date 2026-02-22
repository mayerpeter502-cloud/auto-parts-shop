'use client';
import React, { useState } from 'react';
import { Plus, ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  compatible?: boolean;
}

interface FrequentlyBoughtTogetherProps {
  mainProduct?: Product;
}

const suggestions: Product[] = [
  {
    id: 101,
    name: 'Масляный фильтр Bosch',
    price: 2490,
    originalPrice: 3200,
    image: '/products/oil-filter.jpg',
    compatible: true
  },
  {
    id: 102,
    name: 'Воздушный фильтр Mann',
    price: 3890,
    originalPrice: 4500,
    image: '/products/air-filter.jpg',
    compatible: true
  },
  {
    id: 103,
    name: 'Прокладка сливной пробки',
    price: 450,
    originalPrice: 600,
    image: '/products/gasket.jpg',
    compatible: true
  }
];

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ mainProduct }) => {
  const [selected, setSelected] = useState<Set<string | number>>(new Set([101, 102]));
  const [added, setAdded] = useState(false);

  const toggleSelection = (id: string | number) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const totalPrice = suggestions
    .filter(item => selected.has(item.id))
    .reduce((sum, item) => sum + item.price, mainProduct?.price || 0);

  const handleAddAll = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">С этим товаром покупают</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {/* Main Product */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{mainProduct?.name || 'Основной товар'}</p>
              <p className="text-blue-600 font-bold">{mainProduct?.price?.toLocaleString() || '0'} ₸</p>
            </div>
            <Check className="w-5 h-5 text-blue-600" />
          </div>

          {/* Plus Sign */}
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.map((item) => (
            <label
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selected.has(item.id)
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(item.id)}
                onChange={() => toggleSelection(item.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-gray-900">{item.price.toLocaleString()} ₸</span>
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice?.toLocaleString()} ₸</span>
                </div>
                {item.compatible && (
                  <span className="inline-block mt-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Подходит для вашего авто
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-72 p-6 bg-gray-50 rounded-xl h-fit">
          <div className="text-sm text-gray-500 mb-2">Общая сумма:</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {totalPrice.toLocaleString()} ₸
          </div>
          <div className="text-sm text-green-600 mb-6">
            Экономия {suggestions.filter(i => selected.has(i.id)).reduce((s, i) => s + ((i.originalPrice || 0) - i.price), 0).toLocaleString()} ₸
          </div>
          
          <button
            onClick={handleAddAll}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                <span>Добавлено!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Добавить все</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            {selected.size + 1} товара в комплекте
          </p>
        </div>
      </div>
    </div>
  );
};