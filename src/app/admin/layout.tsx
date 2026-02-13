'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, user } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
    else if (!isAdmin) router.push('/');
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) return <div className="p-8">Проверка доступа...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <LayoutDashboard size={20} /> Дашборд
          </Link>
          <Link href="/admin/products" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <Package size={20} /> Товары
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <ShoppingCart size={20} /> Заказы
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}