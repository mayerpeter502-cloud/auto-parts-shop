"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, ChevronRight, RotateCcw, X } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ordersApi } from "../lib/orders";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { user } = useAuth();
  const { addItem } = useCart();

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

  const repeatOrder = (order: any) => {
    order.items.forEach((item: any) => {
      addItem({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '',
        sku: item.sku || ''
      });
    });
    window.location.href = '/cart';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Войдите для просмотра заказов</h1>
            <Link href="/login" className="text-blue-600 hover:underline">Войти</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
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
                    {order.items.slice(0, selectedOrder === order.id ? undefined : 2).map((item: any) => (
                      <div key={item.productId} className="flex items-center gap-4 py-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded-lg" />
                          ) : (
                            <span className="text-2xl">🔧</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.quantity} шт. × {item.price.toLocaleString()} ₸</div>
                        </div>
                        <div className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} ₸</div>
                      </div>
                    ))}
                    {order.items.length > 2 && selectedOrder !== order.id && (
                      <div className="text-sm text-gray-500 py-2 text-center">+{order.items.length - 2} товаров</div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div className="text-lg font-bold">Итого: {order.total.toLocaleString()} ₸</div>
                    <button 
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      {selectedOrder === order.id ? 'Свернуть' : 'Подробнее'} 
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedOrder === order.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {selectedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t flex gap-3">
                      <button 
                        onClick={() => repeatOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Повторить заказ
                      </button>
                      {['pending', 'processing'].includes(order.status) && (
                        <button 
                          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Отменить
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}