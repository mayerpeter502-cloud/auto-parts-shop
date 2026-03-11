import { Metadata } from "next";
import AccountPageContent from "./AccountPageContent";
import Link from 'next/link';
import { Car, Settings, Package, Heart, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Личный кабинет | AutoParts.kz",
  description: "Управление заказами, избранным и настройками профиля.",
  robots: { index: false }, // Не индексировать ЛК
};

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/account/garage" 
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <Car className="w-12 h-12 text-blue-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Мой гараж</h2>
            <p className="text-gray-600">Управление автомобилями</p>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
        </Link>

        <Link 
          href="/account/orders" 
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <Package className="w-12 h-12 text-green-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Мои заказы</h2>
            <p className="text-gray-600">История покупок</p>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
        </Link>

        <Link 
          href="/account/favorites" 
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <Heart className="w-12 h-12 text-red-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Избранное</h2>
            <p className="text-gray-600">Сохраненные товары</p>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
        </Link>

        <Link 
          href="/account/settings" 
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <Settings className="w-12 h-12 text-gray-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Настройки</h2>
            <p className="text-gray-600">Профиль и безопасность</p>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
        </Link>
      </div>

      <AccountPageContent />
    </div>
  );
}