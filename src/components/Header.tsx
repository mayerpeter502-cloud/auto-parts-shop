"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, Car, LogOut, Scale } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const compare = JSON.parse(localStorage.getItem("compare") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
      setCompareCount(compare.length);
    };
    
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">AutoParts.kz</span>
          </Link>

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

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/vin-check" 
              className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <Car className="w-4 h-4" />
              <span>Подбор по VIN</span>
            </Link>

            <Link href="/compare" className="relative p-2 text-gray-600 hover:text-blue-600">
              <Scale className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:block text-gray-700">{user.name}</span>
                <button 
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 flex items-center gap-1"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-gray-600 hover:text-blue-600">
                <User className="w-6 h-6" />
              </Link>
            )}

            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

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

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link href="/catalog" className="block py-2 text-gray-700 hover:text-blue-600">
              Каталог
            </Link>
            <Link href="/vin-check" className="block py-2 text-gray-700 hover:text-blue-600">
              Подбор по VIN
            </Link>
            <Link href="/compare" className="block py-2 text-gray-700 hover:text-blue-600">
              Сравнение ({compareCount})
            </Link>
            {user && (
              <Link href="/orders" className="block py-2 text-gray-700 hover:text-blue-600">
                Мои заказы
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