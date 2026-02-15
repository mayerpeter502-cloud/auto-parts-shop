"use client";

import { useState, useEffect } from "react";
import { ordersApi } from "../../lib/orders";

const statusLabels: Record<string, string> = {
  pending: "Ожидает",
  processing: "В обработке",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменен"
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700"
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setOrders(ordersApi.getAll());
  }, []);

  const updateStatus = (orderId: string, newStatus: string) => {
    ordersApi.updateStatus(orderId, newStatus as any);
    setOrders(ordersApi.getAll());
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Управление заказами</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4">№ Заказа</th>
              <th className="text-left py-3 px-4">Дата</th>
              <th className="text-left py-3 px-4">Товары</th>
              <th className="text-left py-3 px-4">Сумма</th>
              <th className="text-left py-3 px-4">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{order.id.slice(0, 8)}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {order.items.map((item: any) => (
                      <div key={item.productId}>{item.name} x{item.quantity}</div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">{order.total.toLocaleString()} ₸</td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-sm border-0 ${statusColors[order.status]}`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Заказов пока нет
          </div>
        )}
      </div>
    </div>
  );
}