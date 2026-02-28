"use client";
import { useState, useEffect } from "react";
import { Package, Eye, Phone, User, Calendar, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import { ordersApi, Order } from "../../lib/orders";  // ← ДОБАВИТЬ ИМПОРТ

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("autoparts_orders") || "[]");
    setOrders(stored.sort((a: Order, b: Order) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  }, []);

  // ← ДОБАВИТЬ: Функция изменения статуса
  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    ordersApi.updateStatus(orderId, newStatus);
    setOrders(ordersApi.getAll());  // Обновляем список
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "shipped": return <Truck className="w-5 h-5 text-blue-500" />;
      case "processing": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "cancelled": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    const statuses: Record<string, string> = {
      pending: "Ожидает обработки",
      processing: "В обработке",
      shipped: "Отправлен",
      delivered: "Доставлен",
      cancelled: "Отменен"
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors: Record<string, string> = {
      pending: "bg-gray-100 text-gray-700",
      processing: "bg-yellow-100 text-yellow-700",
      shipped: "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const totalRevenue = orders
    .filter(order => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Управление заказами</h1>
          <p className="text-gray-500">Просмотр и обработка заказов покупателей</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Всего заказов</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">В обработке</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === "pending" || o.status === "processing").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Доставлено</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === "delivered").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Выручка</p>
                <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} ₸</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Фильтр по статусу:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все заказы</option>
              <option value="pending">Ожидает обработки</option>
              <option value="processing">В обработке</option>
              <option value="shipped">Отправлен</option>
              <option value="delivered">Доставлен</option>
              <option value="cancelled">Отменен</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Номер заказа
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Товары
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">Заказы не найдены</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.customer ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">
                                {order.customer.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {order.customer.phone}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Гость</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.items.length} товар(ов)
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.items.map(item => item.name).slice(0, 2).join(", ")}
                          {order.items.length > 2 && " ..."}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {order.total.toLocaleString()} ₸
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* ← ИСПРАВЛЕНО: Select для изменения статуса */}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Ожидает обработки</option>
                          <option value="processing">В обработке</option>
                          <option value="shipped">Отправлен</option>
                          <option value="delivered">Доставлен</option>
                          <option value="cancelled">Отменен</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString("ru-RU", { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedOrder === order.id ? "Свернуть" : "Подробнее"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const order = orders.find(o => o.id === selectedOrder);
                if (!order) return null;

                return (
                  <>
                    <div className="p-6 border-b flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Заказ #{order.id.slice(0, 8).toUpperCase()}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString("ru-RU")}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <XCircle className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Customer Info */}
                      {order.customer && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Информация о клиенте</h3>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{order.customer.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{order.customer.phone}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Товары в заказе</h3>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} шт. × {item.price.toLocaleString()} ₸
                                </p>
                              </div>
                              <p className="font-bold text-gray-900">
                                {(item.price * item.quantity).toLocaleString()} ₸
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Итого:</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {order.total.toLocaleString()} ₸
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}