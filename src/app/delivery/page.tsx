import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Truck, RotateCcw, CheckCircle } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Доставка и возврат</h1>

        {/* Доставка */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Доставка</h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">По Казахстану</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Алматы, Астана — 1-2 дня (1 500 ₸)</li>
                <li>• Другие города — 3-5 дней (от 2 000 ₸)</li>
                <li>• Бесплатно при заказе от 50 000 ₸</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Самовывоз</h3>
              <p className="text-gray-600">
                г. Алматы, ул. Примерная 123, пн-пт 9:00-18:00
              </p>
            </div>
          </div>
        </section>

        {/* Возврат */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Возврат товара</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">14 дней на возврат</h3>
                <p className="text-gray-600">
                  Если товар не подошел, вы можете вернуть его в течение 14 дней 
                  при сохранении упаковки и товарного вида.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Не подошла запчасть?</h3>
                <p className="text-gray-600">
                  Если деталь не подошла к вашему авто — вернем деньги за вычетом 
                  стоимости доставки.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Товары с нарушенной упаковкой или следами установки не принимаются к возврату.
              </p>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Контакты</h2>
          <div className="space-y-2 text-gray-600">
            <p>📞 +7 (777) 123-45-67</p>
            <p>📧 info@autoparts.kz</p>
            <p>📍 г. Алматы, ул. Примерная 123</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}