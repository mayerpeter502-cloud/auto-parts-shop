'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  Check, 
  Truck, 
  CreditCard, 
  User,
  MapPin,
  Package
} from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';

type DeliveryMethod = 'courier' | 'pickup' | 'post';
type PaymentMethod = 'card' | 'cash' | 'online';

interface OrderData {
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    method: DeliveryMethod;
    address?: string;
    city: string;
    comment?: string;
  };
  payment: {
    method: PaymentMethod;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderData, setOrderData] = useState<OrderData>({
    contact: { name: '', phone: '', email: '' },
    delivery: { method: 'courier', city: '', address: '', comment: '' },
    payment: { method: 'online' },
  });

  const deliveryCost = totalPrice > 50000 ? 0 : 2000;
  const finalTotal = totalPrice + deliveryCost;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Сохраняем заказ в localStorage для админки
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
      items: items,
      total: finalTotal,
      customer: orderData.contact,
      delivery: orderData.delivery,
      payment: orderData.payment,
    };

    const existingOrders = JSON.parse(localStorage.getItem('autoparts_orders') || '[]');
    localStorage.setItem('autoparts_orders', JSON.stringify([order, ...existingOrders]));

    // Имитация обработки
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    clearCart();
    router.push('/order-success?id=' + order.id);
  };

  const steps = [
    { num: 1, title: 'Контакты', icon: User },
    { num: 2, title: 'Доставка', icon: Truck },
    { num: 3, title: 'Оплата', icon: CreditCard },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
        <button 
          onClick={() => router.push('/catalog')}
          className="text-blue-600 hover:underline"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Прогресс */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className={`w-5 h-5 mx-2 ${
                  step > s.num ? 'text-blue-600' : 'text-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Форма */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Шаг 1: Контакты */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Контактные данные</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">ФИО *</label>
                    <input
                      type="text"
                      value={orderData.contact.name}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        contact: { ...orderData.contact, name: e.target.value }
                      })}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Телефон *</label>
                    <input
                      type="tel"
                      value={orderData.contact.phone}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        contact: { ...orderData.contact, phone: e.target.value }
                      })}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="+7 (777) 123-45-67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={orderData.contact.email}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        contact: { ...orderData.contact, email: e.target.value }
                      })}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              )}

              {/* Шаг 2: Доставка */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Способ доставки</h2>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'courier', title: 'Курьерская доставка', desc: 'Доставка курьером на адрес', price: '2 000 ₸' },
                      { id: 'pickup', title: 'Самовывоз', desc: 'Забрать из пункта выдачи', price: 'Бесплатно' },
                      { id: 'post', title: 'Почта', desc: 'Доставка почтой по Казахстану', price: '1 500 ₸' },
                    ].map((method) => (
                      <label 
                        key={method.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer ${
                          orderData.delivery.method === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={method.id}
                            checked={orderData.delivery.method === method.id}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              delivery: { ...orderData.delivery, method: e.target.value as DeliveryMethod }
                            })}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div>
                            <p className="font-medium">{method.title}</p>
                            <p className="text-sm text-gray-500">{method.desc}</p>
                          </div>
                        </div>
                        <span className="font-medium">{method.price}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium mb-1">Город *</label>
                    <input
                      type="text"
                      value={orderData.delivery.city}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        delivery: { ...orderData.delivery, city: e.target.value }
                      })}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Алматы"
                    />
                  </div>

                  {orderData.delivery.method !== 'pickup' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Адрес *</label>
                      <textarea
                        value={orderData.delivery.address}
                        onChange={(e) => setOrderData({
                          ...orderData,
                          delivery: { ...orderData.delivery, address: e.target.value }
                        })}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Улица, дом, квартира"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Комментарий к заказу</label>
                    <textarea
                      value={orderData.delivery.comment}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        delivery: { ...orderData.delivery, comment: e.target.value }
                      })}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Дополнительная информация"
                    />
                  </div>
                </div>
              )}

              {/* Шаг 3: Оплата */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'online', title: 'Онлайн оплата картой', desc: 'Visa, Mastercard' },
                      { id: 'card', title: 'Картой при получении', desc: 'Оплата курьеру картой' },
                      { id: 'cash', title: 'Наличными', desc: 'Оплата при получении' },
                    ].map((method) => (
                      <label 
                        key={method.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                          orderData.payment.method === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={orderData.payment.method === method.id}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            payment: { method: e.target.value as PaymentMethod }
                          })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div>
                          <p className="font-medium">{method.title}</p>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h3 className="font-medium mb-2">Итоговая информация</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Получатель:</span> {orderData.contact.name}</p>
                      <p><span className="text-gray-600">Телефон:</span> {orderData.contact.phone}</p>
                      <p><span className="text-gray-600">Город:</span> {orderData.delivery.city}</p>
                      <p><span className="text-gray-600">Адрес:</span> {orderData.delivery.address || 'Самовывоз'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Кнопки навигации */}
              <div className="flex justify-between mt-6 pt-6 border-t">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Назад
                  </button>
                ) : (
                  <div />
                )}
                
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={step === 1 && (!orderData.contact.name || !orderData.contact.phone)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Оформление...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Подтвердить заказ
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Ваш заказ
              </h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1 flex-1">{item.product.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары</span>
                  <span>{totalPrice.toLocaleString()} ₸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString()} ₸`}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Итого</span>
                  <span>{finalTotal.toLocaleString()} ₸</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}