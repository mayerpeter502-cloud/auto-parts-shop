'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  Heart,
  Car
} from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/vin-check', label: 'VIN проверка' },
    { href: '/car-selector', label: 'Подбор по авто' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Верхняя панель */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+77001234567" className="flex items-center gap-1 hover:text-blue-100">
              <Phone className="w-4 h-4" />
              +7 (700) 123-45-67
            </a>
            <span className="text-blue-400">|</span>
            <span>Доставка по всему Казахстану</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/admin" className="hover:text-blue-100">Админ панель</Link>
            <Link href="/orders" className="hover:text-blue-100">Мои заказы</Link>
          </div>
        </div>
      </div>

      {/* Основной хедер */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">AutoParts.kz</span>
          </Link>

          {/* Поиск */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по артикулу, названию или VIN..."
                className="w-full border-2 border-gray-200 rounded-lg pl-4 pr-12 py-2.5 focus:border-blue-600 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Иконки действий */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/favorites"
              className="hidden md:flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600"
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Избранное</span>
            </Link>

            <Link
              href="/cart"
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs hidden md:block">Корзина</span>
            </Link>

            <Link
              href="/profile"
              className="hidden md:flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600"
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Войти</span>
            </Link>

            {/* Мобильное меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Навигация (десктоп) */}
      <nav className="hidden md:block border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 border-b-2 font-medium transition-colors ${
                  isActive(link.href)
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-medium ${
                  isActive(link.href) ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-4 space-y-2">
              <Link href="/favorites" className="flex items-center gap-2 py-2 text-gray-600">
                <Heart className="w-5 h-5" />
                Избранное
              </Link>
              <Link href="/profile" className="flex items-center gap-2 py-2 text-gray-600">
                <User className="w-5 h-5" />
                Личный кабинет
              </Link>
              <a href="tel:+77001234567" className="flex items-center gap-2 py-2 text-gray-600">
                <Phone className="w-5 h-5" />
                +7 (700) 123-45-67
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
