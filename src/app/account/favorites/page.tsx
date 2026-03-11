"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart, Home, ChevronRight } from "lucide-react";
// 1. Добавлен недостающий импорт
import { useGarage } from '@/contexts/GarageContext';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  sku?: string;
}

export default function FavoritesPage() {
  // 2. Вызов хука перемещен ВНУТРЬ компонента
  const { cars } = useGarage();
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const removeFromFavorites = (productId: string) => {
    const updated = favorites.filter(item => item.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
  };

  const addToCart = (item: FavoriteItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((cartItem: any) => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1, sku: item.sku || '' });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    alert('Товар добавлен в корзину');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Главная
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/account" className="hover:text-blue-600 text-sm">Личный кабинет</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Избранное</span>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
        <span className="text-gray-500">{favorites.length} товаров</span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl font-bold text-gray-900">
                    {item.price.toLocaleString()} ₸
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    В корзину
                  </button>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">В избранном пока пусто</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Добавляйте товары в избранное, чтобы не потерять их и вернуться к покупкам позже.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
}