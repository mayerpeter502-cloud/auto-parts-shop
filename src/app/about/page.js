import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle, Truck, Shield, Headphones, Award } from 'lucide-react';

export const metadata = {
  title: 'О компании | AutoParts.kz',
  description: 'Информация о компании AutoParts.kz - лидере продаж автозапчастей в Казахстане',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">О компании AutoParts.kz</h1>
            <p className="text-xl text-blue-100">Лидер рынка автозапчастей в Казахстане с 2015 года</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                AutoParts.kz — крупнейший интернет-магазин автозапчастей в Казахстане. 
                Мы предлагаем широкий ассортимент оригинальных и качественных аналоговых 
                запчастей для всех марок автомобилей.
              </p>
              <p>
                Наша миссия — сделать покупку автозапчастей максимально простой и удобной. 
                Благодаря собственному складу и прямым контрактам с производителями, 
                мы гарантируем низкие цены и быструю доставку.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Наши преимущества</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Гарантия качества</h3>
                    <p className="text-sm">Все товары сертифицированы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Быстрая доставка</h3>
                    <p className="text-sm">Доставка по всему Казахстану</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-purple-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Возврат 30 дней</h3>
                    <p className="text-sm">Легкий возврат без вопросов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-6 h-6 text-orange-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Поддержка 24/7</h3>
                    <p className="text-sm">Консультации специалистов</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="font-bold text-gray-900 mb-4">Статистика</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50 000+</div>
                    <div className="text-sm text-gray-500">Товаров в каталоге</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-gray-900">100 000+</div>
                  <div className="text-sm text-gray-500">Довольных клиентов</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-gray-900">9 лет</div>
                  <div className="text-sm text-gray-500">На рынке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  );
}