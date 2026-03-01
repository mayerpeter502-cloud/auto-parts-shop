import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Truck, RotateCcw, CheckCircle, Clock, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка и возврат | AutoParts.kz",
  description: "Условия доставки и возврата товаров. Доставка по Алматы 1-2 дня, по Казахстану 3-7 дней.",
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Доставка и возврат</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Доставка и возврат
        </h1>

        {/* Доставка */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Доставка</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Сроки доставки
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• По Алматы: 1-2 рабочих дня</li>
                <li>• По Казахстану: 3-7 рабочих дней</li>
                <li>• Самовывоз: в день заказа</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Стоимость доставки
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Алматы: 1 500 ₸</li>
                <li>• При заказе от 50 000 ₸: бесплатно</li>
                <li>• По Казахстану: от 2 500 ₸</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Способы доставки:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">1. Курьерская доставка</h4>
                <p className="text-gray-600">
                  Доставка осуществляется курьером по указанному адресу. 
                  При получении необходимо проверить товар и подписать накладную.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">2. Самовывоз</h4>
                <p className="text-gray-600">
                  Забрать заказ можно из нашего пункта выдачи по адресу: 
                  г. Алматы, ул. Примерная, 123. Режим работы: Пн-Пт 9:00-18:00.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">3. Почта/Транспортные компании</h4>
                <p className="text-gray-600">
                  Отправка по Казахстану через Казпочту или транспортные компании 
                  (CDEK, KazExpress и др.).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Возврат */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Возврат товара</h2>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Условия возврата:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Возврат в течение 14 дней с момента покупки</li>
              <li>✓ Товар не был в употреблении</li>
              <li>✓ Сохранен товарный вид и упаковка</li>
              <li>✓ Наличие чека или документа, подтверждающего покупку</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Процедура возврата:</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Свяжитесь с нами
                  </h4>
                  <p className="text-gray-600">
                    Позвоните по телефону +7 (XXX) XXX-XX-XX или напишите на email 
                    info@autoparts.kz с указанием номера заказа и причины возврата.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Оформите возврат
                  </h4>
                  <p className="text-gray-600">
                    Наш менеджер оформит заявку на возврат и согласует с вами 
                    удобное время для забора товара.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Получите деньги
                  </h4>
                  <p className="text-gray-600">
                    После проверки товара деньги будут возвращены на карту или 
                    выданы наличными в течение 3-5 рабочих дней.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Гарантия */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Гарантия</h2>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-gray-600 mb-4">
              На все товары распространяется гарантия производителя. 
              Срок гарантии указывается в сопроводительных документах к товару.
            </p>
            <p className="text-gray-600">
              В случае обнаружения производственного брака мы заменим товар 
              или вернем деньги в полном объеме.
            </p>
          </div>
        </section>

        {/* Контакты */}
        <section className="mt-12 bg-gray-900 text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
          <p className="mb-6">
            Свяжитесь с нами любым удобным способом:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">📞 Телефон</h3>
              <p>+7 (XXX) XXX-XX-XX</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✉️ Email</h3>
              <p>info@autoparts.kz</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🕐 Режим работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}