'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    setFavorites(saved);
    setLoading(false);
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    localStorage.setItem('autoparts_favorites', JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    // Show toast notification
    alert('Товар добавлен в корзину');
  };

  const addAllToCart = () => {
    const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
    
    favorites.forEach(product => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
    });
    
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Все товары добавлены в корзину');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Избранное' }]} />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Избранное
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({favorites.length} {getProductWord(favorites.length)})
            </span>
          </h1>
          
          {favorites.length > 0 && (
            <button
              onClick={addAllToCart}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              Добавить все в корзину
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Список избранного пуст</h2>
            <p className="text-gray-500 mb-6">Добавляйте товары в избранное, чтобы не потерять их</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Нет фото
                    </div>
                  )}
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <Link href={`/product?id=${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {product.sku && (
                    <p className="text-xs text-gray-500 mb-2">Артикул: {product.sku}</p>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price?.toLocaleString()} ₸
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.oldPrice.toLocaleString()} ₸
                      </span>
                    )}
                  </div>
                  
                  {product.compatibility && (
                    <p className="text-xs text-green-600 mb-3 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Подходит для вашего авто
                    </p>
                  )}
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      
    </div>
  );
}

function getProductWord(count) {
  if (count === 0) return 'товаров';
  if (count === 1) return 'товар';
  if (count < 5) return 'товара';
  return 'товаров';
}