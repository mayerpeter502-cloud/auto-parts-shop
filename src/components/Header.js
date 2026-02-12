'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, Scale, User, Menu, X, Car, ChevronDown } from 'lucide-react';
import CarSelector from './CarSelector';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Получаем количество товаров из localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/catalog', label: 'Каталог' },
    { href: '/vin', label: 'Подбор по VIN' },
    { href: '/brands', label: 'Бренды' },
    { href: '/delivery', label: 'Доставка' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-white/95 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Лого */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className={`bg-blue-600 text-white p-2 rounded-lg transition-all ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}>
                <Car className="w-6 h-6" />
              </div>
              <span className={`font-bold text-gray-900 transition-all ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                AutoParts.kz
              </span>
            </Link>

            {/* Подбор по авто */}
            <div className="hidden lg:block">
              <CarSelector compact />
            </div>

            {/* Поиск */}
            <div className={`hidden md:block flex-1 max-w-2xl transition-all ${
              isScrolled ? 'max-w-xl' : 'max-w-2xl'
            }`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск по артикулу, названию или VIN..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Link 
                  href="/vin"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-200 transition-colors"
                >
                  VIN
                </Link>
              </div>
            </div>

            {/* Иконки */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button 
                onClick={() => setShowCarSelector(!showCarSelector)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Car className="w-5 h-5" />
                <span className="text-sm font-medium">Мой авто</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCarSelector ? 'rotate-180' : ''}`} />
              </button>

              <Link href="/compare" className="hidden sm:flex p-2 text-gray-700 hover:bg-gray-100 rounded-lg relative">
                <Scale className="w-5 h-5" />
              </Link>

              <Link href="/favorites" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg relative">
                <Heart className="w-5 h-5" />
              </Link>

              <Link href="/cart" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/profile" className="hidden sm:flex p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5" />
              </Link>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Навигация */}
          <nav className={`hidden lg:flex items-center gap-6 mt-4 transition-all duration-300 ${
            isScrolled ? 'h-0 opacity-0 overflow-hidden mt-0' : 'h-auto opacity-100'
          }`}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Отступ для контента */}
      <div className={`transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-28'
      }`} />

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-xl">Меню</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-lg font-medium text-gray-900 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-4" />
              <Link href="/profile" className="flex items-center gap-3 py-2 text-gray-700">
                <User className="w-5 h-5" />
                Личный кабинет
              </Link>
              <Link href="/favorites" className="flex items-center gap-3 py-2 text-gray-700">
                <Heart className="w-5 h-5" />
                Избранное
              </Link>
              <Link href="/compare" className="flex items-center gap-3 py-2 text-gray-700">
                <Scale className="w-5 h-5" />
                Сравнение
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}