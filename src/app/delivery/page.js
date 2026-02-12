import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Truck, CreditCard, Package, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Доставка и оплата | AutoParts.kz',
  description: 'Условия доставки и оплаты автозапчастей по Казахстану',
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Доставка и оплата' }]} />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Доставка и оплата</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Способы доставки</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Курьерская доставка</h3>
                <p className="text-gray-600 text-sm mb-2">Доставка до двери по Алматы и Астане</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Стоимость:</span>
                  <span className="font-medium">от 1 500 ₸</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Срок:</span>
                  <span className="font-medium">1-2 дня</span>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Самовывоз</h3>
                <p className="text-gray-600 text-sm mb-2">Из пунктов выдачи по всему Казахстану</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Стоимость:</span>
                  <span className="font-medium text-green-600">Бесплатно</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Почта Казахстана</h3>
                <p className="text-gray-600 text-sm mb-2">Доставка в отдаленные регионы</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Стоимость:</span>
                  <span className="font-medium">от 2 000 ₸</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Способы оплаты</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Наличными при получении</h3>
                  <p className="text-gray-600 text-sm">Оплата курьеру или в пункте выдачи</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Банковская карта</h3>
                  <p className="text-gray-600 text-sm">Visa, MasterCard, Kaspi Pay</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Рассрочка</h3>
                  <p className="text-gray-600 text-sm">0-0-3 через Kaspi Red</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free delivery banner */}
        <div className="bg-blue-600 text-white p-6 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Truck className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold">Бесплатная доставка</h3>
              <p>При заказе от 50 000 ₸ по Алматы и Астане</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}