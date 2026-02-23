import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Car } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Основной футер */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AutoParts.kz</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Интернет-магазин автозапчастей в Казахстане.
              Оригинальные и качественные аналоги по доступным ценам.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>г. Алматы, пр. Назарбаева 123</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Пн-Сб: 9:00 - 20:00</span>
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-white font-bold mb-4">Каталог</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=Масла" className="hover:text-blue-400 transition-colors">
                  Моторные масла
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Фильтры" className="hover:text-blue-400 transition-colors">
                  Фильтры
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Тормоза" className="hover:text-blue-400 transition-colors">
                  Тормозные системы
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Подвеска" className="hover:text-blue-400 transition-colors">
                  Подвеска
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Двигатель" className="hover:text-blue-400 transition-colors">
                  Детали двигателя
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-blue-400 transition-colors">
                  Все категории →
                </Link>
              </li>
            </ul>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-white font-bold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/car-selector" className="hover:text-blue-400 transition-colors">
                  Подбор по авто
                </Link>
              </li>
              <li>
                <Link href="/vin-check" className="hover:text-blue-400 transition-colors">
                  Проверка по VIN
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-blue-400 transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-blue-400 transition-colors">
                  Гарантия и возврат
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-blue-400 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-bold mb-4">Свяжитесь с нами</h3>
            <div className="space-y-3">
              <a
                href="tel:+77001234567"
                className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +7 (700) 123-45-67
              </a>
              <a
                href="tel:+77007654321"
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 (700) 765-43-21
              </a>
              <a
                href="mailto:info@autoparts.kz"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@autoparts.kz
              </a>
            </div>

            {/* Соцсети */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Мы в соцсетях:</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">VK</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">TG</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя панель */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} AutoParts.kz. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
