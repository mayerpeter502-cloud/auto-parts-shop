'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setCount(total);
    };

    updateCount();
    window.addEventListener('cartUpdated', updateCount as EventListener);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCount as EventListener);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <ShoppingCart size={24} className="text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-200">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}