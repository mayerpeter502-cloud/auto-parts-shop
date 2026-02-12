'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs({ items = [] }) {
  const pathname = usePathname();
  
  // Auto-generate from pathname if no items provided
  const pathItems = items.length > 0 ? items : generateBreadcrumbs(pathname);

  return (
    <nav className="py-4 text-sm text-gray-600">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Главная</span>
          </Link>
        </li>
        
        {pathItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname) {
  const map = {
    '/catalog': [{ label: 'Каталог' }],
    '/cart': [{ label: 'Корзина' }],
    '/favorites': [{ label: 'Избранное' }],
    '/profile': [{ label: 'Личный кабинет' }],
    '/product': [{ label: 'Товар' }],
    '/about': [{ label: 'О компании' }],
    '/delivery': [{ label: 'Доставка и оплата' }],
    '/contacts': [{ label: 'Контакты' }],
    '/vin': [{ label: 'Подбор по VIN' }],
  };
  
  return map[pathname] || [];
}