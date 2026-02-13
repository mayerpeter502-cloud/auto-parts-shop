'use client';

import { useEffect, useState } from 'react';
import { Search, Car, FileText, ChevronRight, ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { productApi } from '@/lib/api/products';
import Link from 'next/link';

const categories = [
  { name: 'Масла и жидкости', icon: '🔧', color: 'bg-blue-100' },
  { name: 'Фильтры', icon: '🔄', color: 'bg-green-100' },
  { name: 'Тормозная система', icon: '🛑', color: 'bg-red-100' },
  { name: 'Двигатель', icon: '⚙️', color: 'bg-gray-100' },
  { name: 'Подвеска', icon: '🔩', color: 'bg-yellow-100' },
  { name: 'Электрика', icon: '⚡', color: 'bg-purple-100' },
  { name: 'Кузовные детали', icon: '🚗', color: 'bg-indigo-100' },
  { name: 'Салон', icon: '🪑', color: 'bg-pink-100' },
];

const banners = [
  {
    id: 1,
    title: 'Скидки до 30% на масла',
    subtitle: 'Только до конца месяца',
    bg: 'bg-gradient-to-r from-blue-600 to-blue-400',
    image: '🛢️'
  },
  {
    id: 2,
    title: 'Новые поступления фильтров',
    subtitle: 'Bosch, Mann-filter, Mahle',
    bg: 'bg-gradient-to-r from-green-600 to-green-400',
    image: '🔄'
  },
  {
    id: 3,
    title: 'Тормозные системы Brembo',
    subtitle: 'Премиум качество',
    bg: 'bg-gradient-to-r from-red-600 to-red-400',
    image: '🛑'
  }
];

export default function HomePage() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    productApi.seedData();
    setPopularProducts(productApi.getPopular());
    
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: Product) => item.id === product.id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AutoParts.kz
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по названию, артикулу или VIN..."
                  className="w-full pl-4 pr-12 py-2.5 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Car className="w-5 h-5" />
                <span className="text-sm">Мой авто</span>
              </button>
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Корзина</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Подбор по авто */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Car className="w-5 h-5" />
              Подбор по автомобилю
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5" />
              Подбор по VIN
            </button>
          </div>

          {/* Banner Carousel */}
          <div className="relative overflow-hidden rounded-2xl h-48 md:h-64">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 ${banner.bg} transition-transform duration-500 ease-in-out flex items-center justify-between px-8 md:px-16`}
                style={{
                  transform: `translateX(${(index - currentBanner) * 100}%)`
                }}
              >
                <div className="text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
                  <button className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100">
                    Подробнее
                  </button>
                </div>
                <div className="text-8xl md:text-9xl opacity-30">{banner.image}</div>
              </div>
            ))}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBanner ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center p-4 bg-white border rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-xs text-center text-gray-700 font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Популярные товары</h2>
            <Link href="/catalog" className="flex items-center gap-1 text-blue-600 hover:underline">
              Все товары
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                    <img
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.oldPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </Link>
                
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 hover:text-blue-600">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg">{product.price.toLocaleString()} ₸</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.oldPrice.toLocaleString()} ₸
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🚚</div>
              <h3 className="font-medium text-gray-900">Быстрая доставка</h3>
              <p className="text-sm text-gray-500 mt-1">По всему Казахстану</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">✅</div>
              <h3 className="font-medium text-gray-900">Гарантия качества</h3>
              <p className="text-sm text-gray-500 mt-1">Оригинальные запчасти</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔧</div>
              <h3 className="font-medium text-gray-900">Подбор по VIN</h3>
              <p className="text-sm text-gray-500 mt-1">Точная совместимость</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">💬</div>
              <h3 className="font-medium text-gray-900">Поддержка 24/7</h3>
              <p className="text-sm text-gray-500 mt-1">Консультация экспертов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}