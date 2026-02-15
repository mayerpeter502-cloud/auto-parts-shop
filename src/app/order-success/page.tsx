"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { ordersApi } from "../lib/orders";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<any>(null);
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (orderId) {
      const found = ordersApi.getById(orderId);
      setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Заказ оформлен!
          </h1>
          <p className="text-gray-500 mb-6">
            Спасибо за покупку. Мы свяжемся с вами для подтверждения.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-500 mb-1">Номер заказа:</div>
            <div className="text-lg font-mono font-medium text-gray-900 break-all">
              {order.id}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Состав заказа
            </h3>
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="truncate flex-1 mr-2">{item.name} x{item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₸</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Итого:</span>
              <span>{order.total.toLocaleString()} ₸</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Продолжить покупки
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
            >
              <Home className="w-5 h-5" />
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}