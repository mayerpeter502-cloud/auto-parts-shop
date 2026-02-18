"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

export default function FavoritesPage() {
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
      cart.push({ ...item, quantity: 1, sku: '' });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Избранное пусто</h1>
            <p className="text-gray-500 mb-6">Добавьте товары в избранное</p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Перейти в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Избранное ({favorites.length})</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <Link href={`/product/${item.id}`} className="block relative h-48 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                  />
                </Link>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
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
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      В корзину
                    </button>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}