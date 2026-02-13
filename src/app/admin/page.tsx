'use client';

import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Товаров', value: 156, icon: Package, color: 'bg-blue-500' },
    { title: 'Заказов', value: 42, icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Пользователей', value: 89, icon: Users, color: 'bg-purple-500' },
    { title: 'Выручка', value: '1 250 000 ₸', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="bg-white p-6 rounded-lg shadow">
            <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
              <s.icon size={24} />
            </div>
            <p className="text-gray-500 text-sm">{s.title}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}