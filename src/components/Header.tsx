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

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden sm:block">
              AutoParts.kz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/catalog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Каталог
            </Link>
            <Link href="/car-selector" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Подбор по авто
            </Link>
            <Link href="/vin-check" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Подбор по VIN
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Поиск запчастей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Garage */}
            {user && (
              <Link href="/account/garage" className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all group relative flex flex-col items-center">
                <Car className="w-6 h-6 group-hover:text-blue-600" />
                <span className="hidden md:block text-[10px] mt-0.5 font-medium uppercase">Гараж</span>
              </Link>
            )}

            <Link href="/compare" className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all group relative">
              <Scale className="w-6 h-6 group-hover:text-blue-600" />
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link href="/account/favorites" className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all group relative">
              <Heart className="w-6 h-6 group-hover:text-red-500" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all group relative">
              <ShoppingCart className="w-6 h-6 group-hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            {/* Account / User Name Section */}
            {user ? (
              <Link href="/account" className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-all">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  {user.name || "Личный кабинет"}
                </span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium text-sm">
                <User className="w-4 h-4" />
                <span>Войти</span>
              </Link>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl">
          <nav className="flex flex-col gap-1">
            <Link href="/catalog" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
              Каталог
            </Link>
            <Link href="/car-selector" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
              Подбор по авто
            </Link>
            <Link href="/vin-check" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
              Подбор по VIN
            </Link>
            {user && (
              <Link href="/account/garage" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium">
                <Car className="w-5 h-5" />
                Мой гараж
              </Link>
            )}
            <div className="h-px bg-gray-100 my-2"></div>
            <Link href="/account" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium">
              <User className="w-5 h-5 text-blue-600" />
              {user ? (user.name || "Личный кабинет") : "Войти"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}