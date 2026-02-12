'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Menu, X, Car } from 'lucide-react';

export default function Header() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const favorites = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
      setFavoritesCount(favorites.length);
      
      const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
      setCartCount(cart.length);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Бесплатная доставка при заказе от 50 000 ₸</span>
          <div className="hidden sm:flex gap-4">
            <Link href="/about" className="hover:underline">О компании</Link>
            <Link href="/delivery" className="hover:underline">Доставка</Link>
            <Link href="/contacts" className="hover:underline">Контакты</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">AutoParts.kz</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по номеру, названию или VIN..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/favorites" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-6 h-6 text-gray-700" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link href="/profile" className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-6 h-6 text-gray-700" />
            </Link>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 mt-4 text-sm font-medium text-gray-700">
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">Все категории</Link>
          <Link href="/catalog?type=oil" className="hover:text-blue-600 transition-colors">Масла</Link>
          <Link href="/catalog?type=filters" className="hover:text-blue-600 transition-colors">Фильтры</Link>
          <Link href="/catalog?type=brakes" className="hover:text-blue-600 transition-colors">Тормоза</Link>
          <Link href="/catalog?type=engine" className="hover:text-blue-600 transition-colors">Двигатель</Link>
          <Link href="/catalog?type=electrical" className="hover:text-blue-600 transition-colors">Электрика</Link>
          <Link href="/vin" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
            <Car className="w-4 h-4" />
            Подбор по VIN
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link href="/catalog" className="block py-2 hover:text-blue-600">Все категории</Link>
            <Link href="/catalog?type=oil" className="block py-2 hover:text-blue-600">Масла</Link>
            <Link href="/catalog?type=filters" className="block py-2 hover:text-blue-600">Фильтры</Link>
            <Link href="/profile" className="block py-2 hover:text-blue-600">Личный кабинет</Link>
            <Link href="/favorites" className="block py-2 hover:text-blue-600">Избранное ({favoritesCount})</Link>
          </div>
        </div>
      )}
    </header>
  );
}