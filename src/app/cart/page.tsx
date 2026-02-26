"use client";
import { useCart } from "../../contexts/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
          <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
          <Link
            href="/catalog"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Перейти в каталог
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Корзина</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.sku}</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    {item.price.toLocaleString()} ₸
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Удалить из корзины"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Итого:</span>
              <span className="text-2xl font-bold text-gray-900">
                {total.toLocaleString()} ₸
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Очистить корзину
              </button>
              <Link
                href="/checkout"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                Оформить заказ
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}