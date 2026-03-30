"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Truck, CreditCard, User, Check } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { orderApi } from "@/lib/api/orders";
import { useAuth } from "../../contexts/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, checkout } = useCart(); // ✅ Добавил checkout
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    deliveryMethod: "pickup" as "pickup" | "courier" | "post",
    city: "",
    address: "",
    paymentMethod: "cash" as "cash" | "card" | "kaspi"
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Назад в корзину
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-6">Добавьте товары для оформления заказа</p>
          <Link href="/catalog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  // ✅ ИЗМЕНЕНО: Сделал async и вызываю checkout для обновления stock
  const handleSubmit = async () => {
  try {
    // 1. Обновляем остатки на складе
    const success = await checkout({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      paymentMethod: formData.paymentMethod
    });

    if (!success) {
      alert("Ошибка при обновлении остатков на складе");
      return;
    }

    // 2. Создаём заказ
    const orderId = await orderApi.create({
      userId: user?.id || "guest",
      status: "pending",
      total: total,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sku: item.sku
      })),
      customer: {
        name: formData.name,
        phone: formData.phone
      }
    });

    // 3. Перенаправляем на страницу успеха
    router.push(`/order-success?id=${orderId}`);
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Произошла ошибка при оформлении заказа. Попробуйте снова.");
  }
};

  const steps = [
    { num: 1, title: "Контакты", icon: User },
    { num: 2, title: "Доставка", icon: Truck },
    { num: 3, title: "Оплата", icon: CreditCard }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ChevronLeft className="w-5 h-5" />
        Назад в корзину
      </Link>

      <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        {steps.map((s, index) => (
          <div key={s.num} className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              step >= s.num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              <s.icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">{s.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${step > s.num ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Контактные данные
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.phone}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Продолжить
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Способ доставки
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { value: "pickup", label: "Самовывоз", desc: "Бесплатно, г. Алматы" },
                  { value: "courier", label: "Курьер", desc: "500 ₸, 1-2 дня" },
                  { value: "post", label: "Почта", desc: "1000 ₸, 3-5 дней" }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.deliveryMethod === method.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={method.value}
                      checked={formData.deliveryMethod === method.value}
                      onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value as any})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-gray-500">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {formData.deliveryMethod !== "pickup" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Город *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Введите город"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Адрес *</label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Улица, дом, квартира"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={formData.deliveryMethod !== "pickup" && (!formData.city || !formData.address)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Продолжить
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Способ оплаты
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { value: "cash", label: "Наличными при получении", desc: "Оплата курьеру или в пункте выдачи" },
                  { value: "card", label: "Банковской картой", desc: "Онлайн оплата через защищенный шлюз" },
                  { value: "kaspi", label: "Kaspi Pay", desc: "Оплата через приложение Kaspi" }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === method.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as any})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-gray-500">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Назад
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Оформить заказ
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h3 className="font-semibold mb-4">Ваш заказ</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.quantity} шт × {item.price.toLocaleString()} ₸</div>
                  </div>
                  <div className="font-medium shrink-0">
                    {(item.price * item.quantity).toLocaleString()} ₸
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Товары ({items.reduce((sum, i) => sum + i.quantity, 0)})</span>
                <span>{total.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Доставка</span>
                <span className="text-green-600">
                  {formData.deliveryMethod === "pickup" ? "Бесплатно" :
                   formData.deliveryMethod === "courier" ? "500 ₸" : "1000 ₸"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Итого</span>
                <span>
                  {(total + (formData.deliveryMethod === "pickup" ? 0 :
                            formData.deliveryMethod === "courier" ? 500 : 1000)).toLocaleString()} ₸
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}