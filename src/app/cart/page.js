'use client';

import { useState } from 'react';

export default function Cart() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">AutoParts.kz</div>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-blue-600">Войти</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Корзина</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

        {/* Шаги */}
        <div className="flex mb-8">
          <div className={`flex-1 text-center py-3 border-b-2 ${step >= 1 ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}>
            1. Контакты
          </div>
          <div className={`flex-1 text-center py-3 border-b-2 ${step >= 2 ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}>
            2. Доставка
          </div>
          <div className={`flex-1 text-center py-3 border-b-2 ${step >= 3 ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}>
            3. Оплата
          </div>
        </div>

        {/* Шаг 1: Контакты */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Контактные данные</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Введите имя"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Телефон</label>
                <input type="tel" className="w-full border rounded-lg px-3 py-2" placeholder="+7 (___) ___-__-__"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="email@example.com"/>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* Шаг 2: Доставка */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Способ доставки</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="delivery" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Курьерская доставка</div>
                  <div className="text-sm text-gray-500">1-2 дня, 1500 ₸</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="delivery" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Самовывоз из магазина</div>
                  <div className="text-sm text-gray-500">Бесплатно, сегодня</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="delivery" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Пункт выдачи</div>
                  <div className="text-sm text-gray-500">2-3 дня, 800 ₸</div>
                </div>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Адрес доставки</label>
              <textarea className="w-full border rounded-lg px-3 py-2 h-24" placeholder="Город, улица, дом, квартира"></textarea>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                Назад
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Продолжить
              </button>
            </div>
          </div>
        )}

        {/* Шаг 3: Оплата */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Картой онлайн</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, Kaspi</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Наличными при получении</div>
                  <div className="text-sm text-gray-500">Оплата курьеру или в пункте выдачи</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="w-4 h-4"/>
                <div>
                  <div className="font-medium">Kaspi Pay</div>
                  <div className="text-sm text-gray-500">Через приложение Kaspi</div>
                </div>
              </label>
            </div>

            {/* Итого */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Товары (2)</span>
                <span>25 000 ₸</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Доставка</span>
                <span>1 500 ₸</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Итого</span>
                <span className="text-blue-600">26 500 ₸</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                Назад
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium">
                Оформить заказ
              </button>
            </div>
          </div>
        )}

        {/* Рекомендации */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="font-medium mb-2">Рекомендуем добавить:</div>
          <div className="text-sm text-gray-600">
            Для выбранного масла Castrol 5W-30 рекомендуем заменить масляный фильтр
          </div>
        </div>
      </div>
    </div>
  );
}