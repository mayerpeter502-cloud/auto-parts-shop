"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Scale, X, ShoppingCart, Home, ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category?: string;
  inStock?: boolean;
  sku?: string;
}

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compare") || "[]");
    setCompareItems(stored);
  }, []);

  const removeFromCompare = (productId: string) => {
    const updated = compareItems.filter(item => item.id !== productId);
    localStorage.setItem("compare", JSON.stringify(updated));
    setCompareItems(updated);
    window.dispatchEvent(new CustomEvent('compareUpdated'));
  };

  const addToCart = (item: CompareItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((cartItem: any) => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1, sku: item.sku || '' });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>Главная</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Сравнение</span>
          </nav>

          <div className="flex flex-col items-center justify-center py-12">
            <Scale className="w-24 h-24 text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Нет товаров для сравнения</h1>
            <p className="text-gray-500 mb-6">Добавьте товары для сравнения характеристик</p>
            <Link
              href="/catalog"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            <span>Главная</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Сравнение</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Сравнение товаров ({compareItems.length})
          </h1>
          <Link
            href="/catalog"
            className="text-sm text-blue-600 hover:underline"
          >
            Продолжить покупки →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 text-left border-b bg-gray-50">Характеристика</th>
                {compareItems.map((item) => (
                  <th key={item.id} className="p-4 text-center border-b bg-gray-50 min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-red-600 bg-white rounded-full shadow"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="relative h-32 bg-gray-100 rounded-lg mb-2">
                        <Image
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <Link href={`/product/${item.id}`}>
                        <div className="font-medium text-sm hover:text-blue-600">{item.name}</div>
                      </Link>
                      <div className="text-lg font-bold text-blue-600 mt-1">
                        {item.price.toLocaleString()} ₸
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium bg-gray-50">Бренд</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b text-center">
                    {item.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium bg-gray-50">Категория</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b text-center">
                    {item.category || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium bg-gray-50">Наличие</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b text-center">
                    {item.inStock !== false ? (
                      <span className="text-green-600">✓ В наличии</span>
                    ) : (
                      <span className="text-red-600">✗ Нет</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium bg-gray-50">Действия</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b text-center">
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      В корзину
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}