'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Heart, Check, ChevronLeft, ChevronRight, Star, Minus, Plus } from 'lucide-react';

export default function QuickView({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Блокировка скролла при открытой модалке
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

  // Сброс состояния при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setQuantity(1);
      setAddedToCart(false);
      setActiveTab('description');
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  // Моковые изображения если нет массива
  const images = product.images || [product.image || '/products/placeholder.jpg'];
  
  // Моковые характеристики
  const specifications = product.specifications || [
    { label: 'Артикул', value: product.sku || 'N/A' },
    { label: 'Бренд', value: product.brand || 'N/A' },
    { label: 'Страна', value: 'Германия' },
    { label: 'Гарантия', value: '12 месяцев' },
  ];

  // Моковая совместимость
  const compatibility = product.compatibility || [
    'Toyota Camry (2018-2023)',
    'Toyota RAV4 (2019-2024)',
    'Lexus ES (2019-2023)',
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, 99)));
  };

  const handleAddToCart = () => {
    onAddToCart?.({ ...product, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-auto">
          {/* Левая часть - изображения */}
          <div className="w-full md:w-1/2 p-6 bg-gray-50">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Навигация по фото */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Индикаторы */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Миниатюры */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Правая часть - информация */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            {/* Хлебные крошки */}
            <div className="text-sm text-gray-500 mb-2">
              {product.category || 'Автозапчасти'} / {product.brand}
            </div>

            {/* Название */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

            {/* Рейтинг */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating || 0} ({product.reviews || 0} отзывов)
              </span>
            </div>

            {/* Цена */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price?.toLocaleString('ru-RU')} ₸
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₸
                </span>
              )}
              {product.oldPrice && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-lg">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Наличие */}
            <div className={`flex items-center gap-2 mb-6 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`} />
              <span className="font-medium">
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </span>
            </div>

            {/* Количество и кнопки */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Счетчик */}
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Кнопка в корзину */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Добавлено
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      В корзину
                    </>
                  )}
                </button>

                {/* Избранное */}
                <button
                  onClick={() => onToggleFavorite?.(product)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-colors ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            )}

            {/* Табы */}
            <div className="border-b border-gray-200 mb-4">
              <div className="flex gap-6">
                {[
                  { id: 'description', label: 'Описание' },
                  { id: 'specs', label: 'Характеристики' },
                  { id: 'fitment', label: 'Совместимость' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Контент табов */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'description' && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description || 'Оригинальная запчасть высокого качества. Гарантия производителя 12 месяцев. Проверено на совместимость с указанными моделями автомобилей.'}
                </p>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 text-sm">{spec.label}</span>
                      <span className="text-gray-900 text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'fitment' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">Подходит для:</p>
                  {compatibility.map((car, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {car}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ссылка на полную страницу */}
            <Link
              href={`/product?id=${product.id}`}
              onClick={onClose}
              className="mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Подробнее о товаре →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}