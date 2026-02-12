'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Heart, MapPin, User, LogOut, ChevronRight } from 'lucide-react';
import AvatarUpload from '@/components/AvatarUpload';
import ProfileForm from '@/components/ProfileForm';
import Breadcrumbs from '@/components/Breadcrumbs';

const menuItems = [
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'orders', label: 'Мои заказы', icon: Package },
  { id: 'addresses', label: 'Адреса доставки', icon: MapPin },
  { id: 'favorites', label: 'Избранное', icon: Heart },
];

const mockOrders = [
  { id: '12345', date: '10.02.2025', total: 45800, status: 'delivered', items: 3 },
  { id: '12344', date: '05.02.2025', total: 12300, status: 'processing', items: 1 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatar, setAvatar] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Личные данные</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <AvatarUpload currentAvatar={avatar} onUpload={setAvatar} />
                <div className="flex-1">
                  <ProfileForm initialData={{ name: 'Иван Иванов', phone: '+7 (777) 123-45-67' }} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">История заказов</h2>
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-gray-900">Заказ #{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{order.total.toLocaleString()} ₸</div>
                    <div className={`text-sm ${
                      order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {order.status === 'delivered' ? 'Доставлен' : 'В обработке'}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {order.items} товаров
                </div>
              </div>
            ))}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Адреса доставки</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                + Добавить адрес
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-gray-900 mb-1">Домашний адрес</div>
                  <div className="text-gray-600">г. Алматы, ул. Абая, 123, кв. 45</div>
                  <div className="text-sm text-gray-500 mt-1">+7 (777) 123-45-67</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  По умолчанию
                </span>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Перейдите в каталог, чтобы добавить товары в избранное</p>
            <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium">
              Перейти в каталог →
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Личный кабинет', href: '/profile' }]} />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Личный кабинет</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto ${
                      activeTab === item.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </button>
                );
              })}
              <div className="border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Выйти</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}