"use client";
import { useState, useEffect } from "react";
import { ordersApi } from "../../lib/orders";
import { updateProduct, getProductById } from "../../lib/api";
import { CheckCircle, XCircle } from "lucide-react";

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
  const [stockUpdated, setStockUpdated] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOrders(ordersApi.getAll());
  }, []);

  const updateStatus = (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    const oldOrder = order;
    
    // ← Списываем stock только при переходе в "shipped" или "delivered"
    if ((newStatus === 'shipped' || newStatus === 'delivered') && oldOrder?.status !== newStatus) {
      const alreadyUpdated = stockUpdated[orderId];
      
      if (!alreadyUpdated && order?.items) {
        order.items.forEach((item: any) => {
          const product = getProductById(item.productId || item.id);
          if (product && product.stock !== undefined) {
            const newStock = Math.max(0, product.stock - item.quantity);
            updateProduct(product.id, { stock: newStock });
          }
        });
        
        // Помечаем что stock уже списан для этого заказа
        setStockUpdated(prev => ({ ...prev, [orderId]: true }));
      }
    }

    // ← Возвращаем stock при отмене заказа
    if (newStatus === 'cancelled' && oldOrder?.status !== 'cancelled') {
      const wasUpdated = stockUpdated[orderId];
      
      if (wasUpdated && order?.items) {
        order.items.forEach((item: any) => {
          const product = getProductById(item.productId || item.id);
          if (product && product.stock !== undefined) {
            const newStock = product.stock + item.quantity;
            updateProduct(product.id, { stock: newStock });
          }
        });
        
        // Снимаем метку что stock списан
        setStockUpdated(prev => ({ ...prev, [orderId]: false }));
      }
    }

    ordersApi.updateStatus(orderId, newStatus as any);
    setOrders(ordersApi.getAll());
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Управление заказами</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4">№ Заказа</th>
              <th className="text-left py-3 px-4">Дата</th>
              <th className="text-left py-3 px-4">Товары</th>
              <th className="text-left py-3 px-4">Сумма</th>
              <th className="text-left py-3 px-4">Статус</th>
              <th className="text-left py-3 px-4">Stock</th>
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
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx}>{item.name} x{item.quantity}</div>
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
                <td className="py-3 px-4">
                  {stockUpdated[order.id] || order.status === 'shipped' || order.status === 'delivered' ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Списан
                    </span>
                  ) : order.status === 'cancelled' ? (
                    <span className="flex items-center gap-1 text-red-600 text-sm">
                      <XCircle className="w-4 h-4" />
                      Возвращён
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
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