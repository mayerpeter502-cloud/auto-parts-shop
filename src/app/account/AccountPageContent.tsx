"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, User, ChevronRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AccountPageContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('autoparts_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  if (!user) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">Войдите в аккаунт</h2>
        <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Войти</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
{/* Добавь этот блок навигации сверху */}
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <Link href="/" className="hover:text-blue-600">Главная</Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">Личный кабинет</span>
    </nav> 
{/* Список заказов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Последние заказы</h2>
          <Link href="/account/orders" className="text-blue-600 hover:underline text-sm">Все заказы →</Link>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {/* Рендер заказов */}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">У вас пока нет заказов</p>
            <Link href="/catalog" className="text-blue-600 font-medium">Перейти в каталог</Link>
          </div>
        )}
      </div>
    </div>
  );
}