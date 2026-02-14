"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Car } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
    { href: "/admin/products", icon: Package, label: "Товары" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Заказы" },
  ];

  // Показываем доступ запрещен только если пользователь точно не админ
  // Для разработки можно убрать проверку или сделать тестового админа
  if (user && !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Доступ запрещен</h1>
          <p className="text-gray-500 mb-4">У вас нет прав администратора</p>
          <Link href="/" className="text-blue-600 hover:underline">На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">{user?.email || "admin@autoparts.kz"}</p>
            </div>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mb-2"
          >
            <Car className="w-5 h-5" />
            На сайт
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}