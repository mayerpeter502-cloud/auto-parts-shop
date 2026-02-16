import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description: "Информация о доставке и способах оплаты",
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Доставка и оплата</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Способы доставки</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">Курьерская доставка</h3>
                <p className="text-gray-600">Доставка курьером по Алматы — 1 500 ₸</p>
                <p className="text-gray-600">Доставка в другие города — от 2 500 ₸</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900">Самовывоз</h3>
                <p className="text-gray-600">Бесплатно из пункта выдачи</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Способы оплаты</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Наличными при получении</li>
              <li>Банковской картой (Visa, Mastercard)</li>
              <li>Онлайн-оплата через Kaspi Pay</li>
              <li>Безналичный расчет для юрлиц</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Сроки доставки</h2>
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">Город</th>
                  <th className="p-3">Срок</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Алматы</td>
                  <td className="p-3">1-2 дня</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Астана, Шымкент</td>
                  <td className="p-3">2-3 дня</td>
                </tr>
                <tr>
                  <td className="p-3">Другие города</td>
                  <td className="p-3">3-7 дней</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}