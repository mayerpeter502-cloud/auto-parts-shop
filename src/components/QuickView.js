'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ShoppingCart, Heart, Scale, Check, Star } from 'lucide-react';
import useCart from '@/hooks/useCart';

export default function QuickView({ product, isOpen, onClose, onAddToCompare, onToggleFavorite, isFavorite }) {
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Оверлей */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Модалка */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Изображение */}
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product.image || '/placeholder-product.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.oldPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{Math.round((1 - product.price/product.oldPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
              <span>•</span>
              <span>{product.sku}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>

            {/* Рейтинг */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-medium text-gray-900">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} отзывов)</span>
            </div>

            {/* Цена */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} ₸
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₸
                </span>
              )}
            </div>

            {/* Наличие */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">В наличии</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-orange-500 font-medium">Под заказ (2-3 дня)</span>
                </>
              )}
            </div>

            {/* Краткое описание */}
            <p className="text-gray-600 mb-6 line-clamp-3">
              Оригинальная запчасть высшего качества. Гарантия производителя 12 месяцев. 
              Проверено на совместимость с вашим автомобилем.
            </p>

            {/* Характеристики */}
            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Бренд</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Артикул</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Категория</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                В корзину
              </button>
              
              <button
                onClick={onToggleFavorite}
                className={`p-3 border-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={onAddToCompare}
                className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>

            {/* Ссылка на полную страницу */}
            <a 
              href={`/product?id=${product.id}`}
              className="mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Перейти на страницу товара →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}