'use client';

import Link from 'next/link';
import { Heart, Scale, ShoppingCart, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import LazyImage from './LazyImage';
import useCart from '@/hooks/useCart';

export default function ProductCard({ product, onQuickView }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const { addToCart } = useCart();

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // Сохранение в localStorage
    const favorites = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    if (!isFavorite) {
      favorites.push(product.id);
    } else {
      const idx = favorites.indexOf(product.id);
      if (idx > -1) favorites.splice(idx, 1);
    }
    localStorage.setItem('autoparts_favorites', JSON.stringify(favorites));
  };

  const toggleCompare = (e) => {
    e.preventDefault();
    setIsCompare(!isCompare);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Изображение */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product?id=${product.id}`}>
          <LazyImage
            src={product.image || '/placeholder-product.png'}
            alt={product.name}
            fill
            className="group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.oldPrice && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round((1 - product.price/product.oldPrice) * 100)}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Быстрые действия */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={toggleCompare}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isCompare ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:text-blue-500'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={handleQuickView}
            className="p-2 rounded-full shadow-md bg-white text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <Link href={`/product?id=${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Рейтинг */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        {/* Цена и кнопка */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString('ru-RU')} ₸
            </div>
            {product.oldPrice && (
              <div className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₸
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}