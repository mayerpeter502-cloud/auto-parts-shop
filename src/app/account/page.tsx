"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { User, Package, Heart, Settings, LogOut, ChevronRight, MapPin, Phone, Mail } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
}

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "Алексей",
    email: "aleksey.nik793@gmail.com",
    phone: "+7 (XXX) XXX-XX-XX",
    address: "г. Алматы, ул. Примерная, 123"
  });
  
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Загрузка заказов из localStorage
    const storedOrders = localStorage.getItem('autoparts_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return "text-green-600 bg-green-50";
      case "processing": return "text-blue-600 bg-blue-50";
      case "shipped": return "text-purple-600 bg-purple-50";
      case "cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return "Доставлен";
      case "processing": return "В обработке";
      case "shipped": return "Отправлен";
      case "cancelled": return "Отменён";
      default: return "В ожидании";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Личный кабинет</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Личный кабинет
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                  <Package className="w-5 h-5" />
                  Мои заказы
                </Link>
                <Link href="/account/favorites" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                  Избранное
                </Link>
                <Link href="/account/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <Settings className="w-5 h-5" />
                  Настройки
                </Link>
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full text-left">
                  <LogOut className="w-5 h-5" />
                  Выйти
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{user.address}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Мои заказы</h2>
                <Link href="/account/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Все заказы →
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-medium text-gray-900">Заказ №{order.id}</span>
                          <span className="text-sm text-gray-500 ml-3">{order.date}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.quantity} шт. × {item.price.toLocaleString()} ₸</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-500">+{order.items.length - 2} товаров</p>
                        )}
                      </div>
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Итого: {order.total.toLocaleString()} ₸</span>
                        <Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Подробнее →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">У вас пока нет заказов</p>
                  <Link href="/catalog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Перейти в каталог
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/catalog" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">🛒 Новые покупки</h3>
                <p className="text-sm text-gray-600">Перейти в каталог товаров</p>
              </Link>
              <Link href="/vin-check" className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 Проверка по VIN</h3>
                <p className="text-sm text-gray-600">Подобрать запчасти по VIN</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}