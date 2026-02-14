"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { ordersApi } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userOrders = ordersApi.getByUser(user.id);
      setOrders(userOrders);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "shipped": return <Truck className="w-5 h-5 text-blue-500" />;
      case "processing": return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      pending: "Ожидает обработки",
      processing: "В обработке",
      shipped: "Отправлен",
      delivered: "Доставлен",
      cancelled: "Отменен"
    };
    return statuses[status] || status;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Войдите для просмотра заказов</h1>
          <Link href="/login" className="text-blue-600 hover:underline">Войти</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Мои заказы</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">У вас пока нет заказов</h2>
            <p className="text-gray-500 mb-4">Сделайте свой первый заказ</p>
            <Link href="/catalog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Заказ №{order.id.slice(0, 8)}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  {order.items.map((item: any) => (
                    <div key={item.productId} className="flex justify-between py-2">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₸</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">Итого: {order.total.toLocaleString()} ₸</div>
                  <button className="flex items-center gap-1 text-blue-600 hover:underline">
                    Подробнее <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}