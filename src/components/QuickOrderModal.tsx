"use client";
import { useState } from "react";
import { X, CheckCircle, Phone, User } from "lucide-react";
import { ordersApi } from "../app/lib/orders";

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export function QuickOrderModal({ isOpen, onClose, product }: QuickOrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Сохранение заказа в localStorage
    const order = ordersApi.create({
  userId: "guest",
  status: "pending",
  total: product.price,
  items: [{
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image
  }],
  customer: {
    name: formData.name,
    phone: formData.phone
  }
});

    setLoading(false);
    setSubmitted(true);

    // Закрыть через 2 секунды
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: "", phone: "" });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success */
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказ оформлен!</h2>
            <p className="text-gray-500">Менеджер свяжется с вами в ближайшее время</p>
          </div>
        ) : (
          /* Form */
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Быстрый заказ</h2>
            <p className="text-gray-500 mb-6">Оставьте контакты, мы перезвоним для уточнения деталей</p>

            {/* Product info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                <p className="text-blue-600 font-bold">{product.price.toLocaleString()} ₸</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Иван Иванов"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Отправка..." : "Заказать в 1 клик"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}