"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { productsApi, ordersApi } from "../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    const products = productsApi.getAll();
    const orders = ordersApi.getAll();
    
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    setStats({
      products: products.length,
      orders: orders.length,
      users: JSON.parse(localStorage.getItem("users") || "[]").length,
      revenue
    });
  }, []);

  const cards = [
    { icon: Package, label: "Товаров", value: stats.products, color: "bg-blue-500" },
    { icon: ShoppingCart, label: "Заказов", value: stats.orders, color: "bg-green-500" },
    { icon: Users, label: "Пользователей", value: stats.users, color: "bg-purple-500" },
    { icon: TrendingUp, label: "Выручка", value: `${stats.revenue.toLocaleString()} ₸`, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-gray-500 text-sm">{card.label}</div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Последние заказы</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-3 px-4">№ Заказа</th>
                <th className="text-left py-3 px-4">Дата</th>
                <th className="text-left py-3 px-4">Сумма</th>
                <th className="text-left py-3 px-4">Статус</th>
              </tr>
            </thead>
            <tbody>
              {ordersApi.getAll().slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3 px-4">{order.id.slice(0, 8)}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="py-3 px-4">{order.total.toLocaleString()} ₸</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "delivered" ? "bg-green-100 text-green-700" :
                      order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}