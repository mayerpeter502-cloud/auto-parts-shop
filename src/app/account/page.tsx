import { Metadata } from "next";
import AccountPageContent from "./AccountPageContent";
import Link from 'next/link';
import { Car, Settings, Package, Heart, ChevronRight, LogOut, User, MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: "Личный кабинет | AutoParts.kz",
  description: "Управление заказами, избранным и настройками профиля.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Личный кабинет</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <nav className="space-y-2">
              <Link href="/account/garage" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Car className="w-5 h-5" />
                <span>Мой гараж</span>
              </Link>
              <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                <Package className="w-5 h-5" />
                <span>Мои заказы</span>
              </Link>
              <Link href="/account/favorites" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                <span>Избранное</span>
              </Link>
              <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <Settings className="w-5 h-5" />
                <span>Настройки</span>
              </Link>
            </nav>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> +7 (XXX) XXX-XX-XX</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> г. Алматы</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <AccountPageContent />
        </div>
      </div>
    </div>
  );
}