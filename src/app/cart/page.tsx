'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight,
  Package,
  Truck,
  Shield
} from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'AUTO10') {
      setDiscount(totalPrice * 0.1);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
          <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
          <Link 
            href="/catalog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  const deliveryCost = totalPrice > 50000 ? 0 : 2000;
  const finalTotal = totalPrice - discount + deliveryCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Корзина ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.product.image} 
                    alt={item.product.name} 
                    fill 
                    className="object-contain p-2" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/product/${item.product.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">{(item.product.price * item.quantity).toLocaleString()} ₸</p>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 text-sm flex items-center gap-1 mt-1 hover:underline"
                      >
                        <Trash2 className="w-4 h-4" />
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/catalog" className="text-blue-600 hover:underline flex items-center gap-2">
              ← Вернуться к покупкам
            </Link>
          </div>

          {/* Итоговая сумма */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Итого</h2>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({totalItems})</span>
                  <span>{totalPrice.toLocaleString()} ₸</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка</span>
                    <span>-{discount.toLocaleString()} ₸</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString()} ₸`}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>К оплате</span>
                  <span>{finalTotal.toLocaleString()} ₸</span>
                </div>
              </div>

              {/* Промокод */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button 
                  onClick={applyPromo}
                  className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Применить
                </button>
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                Оформить заказ
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>Доставка от 1-3 дней</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Гарантия возврата 14 дней</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Бесплатная доставка от 50 000 ₸</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}