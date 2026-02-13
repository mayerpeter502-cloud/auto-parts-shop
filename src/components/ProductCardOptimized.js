'use client';

import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Scale, Star, Check } from 'lucide-react';
import LazyImage from './LazyImage';

const ProductCardOptimized = memo(function ProductCard({ 
  product, 
  isFavorite, 
  isInCompare, 
  onToggleFavorite, 
  onToggleCompare,
  onAddToCart,
  onQuickView,
  viewMode = 'grid'
}) {
  // Мемоизация колбэков
  const handleFavorite = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product);
  }, [onToggleFavorite, product]);

  const handleCompare = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompare?.(product);
  }, [onToggleCompare, product]);

  const handleCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  }, [onAddToCart, product]);

  const handleQuickView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  }, [onQuickView, product]);

  // Мемоизация вычислений
  const discount = useMemo(() => {
    if (!product.oldPrice || product.oldPrice <= product.price) return null;
    return Math.round((1 - product.price / product.oldPrice) * 100);
  }, [product.price, product.oldPrice]);

  const imageUrl = product.image || '/products/placeholder.jpg';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex gap-4">
        <div className="relative w-32 h-32 flex-shrink-0">
          <LazyImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
          />
          {discount && (
            <span className="absolute -top-2 -left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
              -{discount}%
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
          <Link href={`/product?id=${product.id}`} className="block">
            <h3 className="font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1 mt-1 mb-2">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating || 0}</span>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-gray-900">
                {product.price?.toLocaleString('ru-RU')} ₸
              </div>
              {product.oldPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₸
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleFavorite}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                  isFavorite ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 hover:border-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleCart}
                disabled={!product.inStock}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative aspect-square p-4 bg-gray-50 rounded-t-xl overflow-hidden">
        <Link href={`/product?id=${product.id}`}>
          <LazyImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded-lg">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleFavorite}
            className={`w-9 h-9 rounded-lg shadow-md flex items-center justify-center transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleCompare}
            className={`w-9 h-9 rounded-lg shadow-md flex items-center justify-center transition-colors ${
              isInCompare ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:text-blue-500'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/95 backdrop-blur text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white whitespace-nowrap"
        >
          Быстрый просмотр
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <Link href={`/product?id=${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 h-12 hover:text-blue-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating || 0}</span>
          <span className="text-sm text-gray-400">({product.reviews || 0})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {product.price?.toLocaleString('ru-RU')} ₸
            </div>
            {product.oldPrice && (
              <div className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₸
              </div>
            )}
          </div>
          
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              product.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCardOptimized;