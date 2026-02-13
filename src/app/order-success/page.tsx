'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('autoparts_orders') || '[]');
      const found = orders.find((o: any) => o.id === orderId);
      setOrder(found);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Заказ оформлен!</h1>
        <p className="text-gray-600 mb-6">
          {orderId ? `Номер заказа: ${orderId}` : 'Спасибо за покупку'}
        </p>

        {order && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Информация о заказе</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Сумма:</span>
                <span className="font-medium">{order.total.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Статус:</span>
                <span className="text-yellow-600">В обработке</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Доставка:</span>
                <span>{order.delivery.method === 'pickup' ? 'Самовывоз' : 'Доставка'}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Продолжить покупки
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}