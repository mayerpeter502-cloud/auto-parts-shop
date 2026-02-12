import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AutoParts.kz</span>
            </div>
            <p className="text-sm mb-4">Интернет-магазин автозапчастей №1 в Казахстане. Оригинальные и качественные аналоги для всех марок автомобилей.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+7 (777) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@autoparts.kz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>г. Алматы, ул. Примерная, 123</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Пн-Пт: 9:00 - 20:00</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?type=oil" className="hover:text-white transition-colors">Моторные масла</Link></li>
              <li><Link href="/catalog?type=filters" className="hover:text-white transition-colors">Фильтры</Link></li>
              <li><Link href="/catalog?type=brakes" className="hover:text-white transition-colors">Тормозные системы</Link></li>
              <li><Link href="/catalog?type=engine" className="hover:text-white transition-colors">Двигатель</Link></li>
              <li><Link href="/catalog?type=suspension" className="hover:text-white transition-colors">Подвеска</Link></li>
              <li><Link href="/catalog?type=electrical" className="hover:text-white transition-colors">Электрика</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Гарантия и возврат</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Блог</Link></li>
            </ul>
          </div>

          {/* Personal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Личный кабинет</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="hover:text-white transition-colors">Мой профиль</Link></li>
              <li><Link href="/profile/orders" className="hover:text-white transition-colors">История заказов</Link></li>
              <li><Link href="/favorites" className="hover:text-white transition-colors">Избранное</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Корзина</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 AutoParts.kz. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}