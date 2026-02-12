'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Truck, CreditCard, User, ChevronRight, Package } from 'lucide-react';
import useCart from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import PromoCode from '@/components/PromoCode';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice, isLoaded } = useCart();
  const [step, setStep] = useState(1);
  const [discount, setDiscount] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: ''
  });

  if (!isLoaded) return null;

  const discountAmount = discount 
    ? discount.type === 'percent' 
      ? Math.round(totalPrice * discount.value / 100)
      : discount.value
    : 0;

  const finalPrice = totalPrice - discountAmount;
  const deliveryCost = finalPrice > 30000 ? 0 : 1500;
  const total = finalPrice + deliveryCost;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Отправка заказа
      alert('Заказ оформлен! (Демо)');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары из каталога</p>
          <Link 
            href="/catalog"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Корзина', icon: ShoppingCart },
    { num: 2, label: 'Доставка', icon: Truck },
    { num: 3, label: 'Оплата', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Корзина', href: '/cart' }]} />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Оформление заказа</h1>

        {/* Прогресс */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Шаг 1: Корзина */}
              {step === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Товары в корзине ({totalItems})</h2>
                  <div className="divide-y divide-gray-200">
                    {cart.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <PromoCode 
                      onApply={setDiscount}
                      appliedDiscount={discount}
                      onRemove={() => setDiscount(null)}
                    />
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium">
                      ← Продолжить покупки
                    </Link>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Далее
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Шаг 2: Доставка */}
              {step === 2 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Контактные данные</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Имя и фамилия"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 sm:col-span-2"
                    />
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-4">Способ доставки</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'courier', label: 'Курьерская доставка', desc: '1-2 дня, от 1500 ₸' },
                      { id: 'pickup', label: 'Самовывоз', desc: 'Бесплатно, сегодня' },
                      { id: 'post', label: 'Почта Казахстана', desc: '3-5 дней, от 1000 ₸' },
                    ].map(method => (
                      <label key={method.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.deliveryMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method.id}
                          checked={formData.deliveryMethod === method.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{method.label}</div>
                          <div className="text-sm text-gray-500">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {formData.deliveryMethod !== 'pickup' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        name="address"
                        placeholder="Адрес доставки"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <textarea
                    name="comment"
                    placeholder="Комментарий к заказу (опционально)"
                    rows={3}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
                  />

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Далее
                    </button>
                  </div>
                </div>
              )}

              {/* Шаг 3: Оплата */}
              {step === 3 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Способ оплаты</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'card', label: 'Банковская карта', desc: 'Visa, Mastercard' },
                      { id: 'kaspi', label: 'Kaspi Pay', desc: 'Оплата через приложение' },
                      { id: 'cash', label: 'Наличными при получении', desc: 'Для курьерской доставки' },
                    ].map(method => (
                      <label key={method.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{method.label}</div>
                          <div className="text-sm text-gray-500">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Итоговая информация</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Получатель: {formData.name}</p>
                      <p>Телефон: {formData.phone}</p>
                      <p>Доставка: {
                        formData.deliveryMethod === 'courier' ? 'Курьер' :
                        formData.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Почта'
                      }</p>
                      {formData.address && <p>Адрес: {formData.address}</p>}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Ваш заказ</h3>
              
              <div className="space-y-2 text-sm mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span className="truncate flex-1 mr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₸</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Товары ({totalItems})</span>
                  <span>{totalPrice.toLocaleString()} ₸</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Скидка</span>
                    <span>-{discountAmount.toLocaleString()} ₸</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Доставка</span>
                  <span className={deliveryCost === 0 ? 'text-green-600' : ''}>
                    {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString()} ₸`}
                  </span>
                </div>

                {deliveryCost === 0 && (
                  <p className="text-xs text-green-600">✓ Бесплатная доставка при заказе от 30 000 ₸</p>
                )}

                <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Итого</span>
                  <span className="text-2xl font-bold text-blue-600">{total.toLocaleString()} ₸</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <Package className="w-4 h-4" />
                  <span>Доставка от 1-2 дней</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}