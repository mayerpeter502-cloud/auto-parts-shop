'use client';

import { useEffect, useState } from 'react';
import { orderApi } from '@/lib/api/orders';
import { productApi } from '@/lib/api/products';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    // Здесь будет загрузка статистики из Firebase
    setStats({
      products: 156,
      orders: 42,
      users: 89,
      revenue: 1250000
    });
  };

  const cards = [
    { title: 'Товаров', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { title: 'Заказов', value: stats.orders, icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Пользователей', value: stats.users, icon: Users, color: 'bg-purple-500' },
    { title: 'Выручка', value: `${stats.revenue.toLocaleString()} ₸`, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow">
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
              <card.icon size={24} />
            </div>
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}