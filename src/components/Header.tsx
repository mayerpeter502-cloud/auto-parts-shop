"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Car } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Бесплатная доставка от 20 000 ₸</span>
          <div className="hidden sm:flex gap-4">
            <Link href="/about" className="hover:text-blue-100">О нас</Link>
            <Link href="/delivery" className="hover:text-blue-100">Доставка</Link>
            <Link href="/contacts" className="hover:text-blue-100">Контакты</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">AutoParts</h1>
              <p className="text-xs text-gray-500">Запчасти для авто</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по названию, артикулу или VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/catalog?carSelector=true"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Car className="w-4 h-4" />
              <span className="text-sm font-medium">Подбор по авто</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-50 text-sm">Мои заказы</Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 hover:bg-gray-50 text-sm text-blue-600">Админка</Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="hidden sm:block text-sm font-medium">Войти</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/catalog?carSelector=true" className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-lg">
              <Car className="w-5 h-5" />
              <span className="font-medium">Подбор по автомобилю</span>
            </Link>
            <Link href="/vin-check" className="block py-2 text-blue-600">Проверка по VIN</Link>
          </div>
        </div>
      )}
    </header>
  );
}