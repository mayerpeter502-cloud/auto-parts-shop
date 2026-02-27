"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, Car, Scale, Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getProducts } from '../app/lib/api';

export function Header() {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const compare = JSON.parse(localStorage.getItem("compare") || "[]");
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      
      setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
      setCompareCount(compare.length);
      setFavoritesCount(favorites.length);
    };

    updateCounts();
    
    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("compareUpdated", updateCounts);
    window.addEventListener("favoritesUpdated", updateCounts);
    
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("compareUpdated", updateCounts);
      window.removeEventListener("favoritesUpdated", updateCounts);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const products = getProducts();
      const exactMatch = products.find(p =>
        p.sku?.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (exactMatch) {
        window.location.href = `/product/${exactMatch.id}`;
      } else {
        window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
      }
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            AutoParts.kz
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по номеру, названию или VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Подбор по авто */}
            <Link 
              href="/car-selector" 
              className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <Car className="w-4 h-4" />
              <span>Подбор по авто</span>
            </Link>

            {/* Подбор по VIN */}
            <Link 
              href="/vin-check" 
              className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <Car className="w-4 h-4" />
              <span>Подбор по VIN</span>
            </Link>

            {/* Избранное */}
            <Link href="/account/favorites" className="relative p-2 text-gray-600 hover:text-blue-600">
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Сравнение */}
            <Link href="/compare" className="relative p-2 text-gray-600 hover:text-blue-600">
              <Scale className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>
            
            {/* Корзина */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Профиль */}
            {user ? (
              <Link href="/account" className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="hidden md:block text-sm font-medium">{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="p-2 text-gray-600 hover:text-blue-600">
                <User className="w-6 h-6" />
              </Link>
            )}

            {/* Mobile Menu */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link href="/catalog" className="block py-2 text-gray-700 hover:text-blue-600">
              Каталог
            </Link>
            <Link href="/car-selector" className="block py-2 text-gray-700 hover:text-blue-600">
              Подбор по авто
            </Link>
            <Link href="/vin-check" className="block py-2 text-gray-700 hover:text-blue-600">
              Подбор по VIN
            </Link>
            <Link href="/account/favorites" className="block py-2 text-gray-700 hover:text-blue-600">
              Избранное ({favoritesCount})
            </Link>
            <Link href="/compare" className="block py-2 text-gray-700 hover:text-blue-600">
              Сравнение ({compareCount})
            </Link>
            {user ? (
              <Link href="/account" className="block py-2 text-gray-700 hover:text-blue-600">
                Личный кабинет
              </Link>
            ) : (
              <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600">
                Войти
              </Link>
            )}
            {user?.isAdmin && (
              <Link href="/admin" className="block py-2 text-gray-700 hover:text-blue-600">
                Админ панель
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}