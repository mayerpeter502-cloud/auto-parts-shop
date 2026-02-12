'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Изображение */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.image || '/placeholder-product.png'}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Информация */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {item.name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-2">
          {item.brand} • {item.sku}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
          {item.inStock ? (
            <span className="text-green-600">● В наличии</span>
          ) : (
            <span className="text-orange-500">● Под заказ</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => onUpdateQuantity(item.id, qty)}
          />
          
          <div className="text-right">
            <div className="font-bold text-gray-900">
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
            </div>
            {item.quantity > 1 && (
              <div className="text-xs text-gray-500">
                {item.price.toLocaleString('ru-RU')} ₸/шт
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка удаления */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
        aria-label="Удалить из корзины"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}