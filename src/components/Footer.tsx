import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AutoParts</h3>
                <p className="text-xs text-gray-400">Запчасти для авто</p>
              </div>
            </div>
            <p className="text-sm mb-4 text-gray-400">
              Интернет-магазин автозапчастей с широким ассортиментом и быстрой доставкой по всему Казахстану.
            </p>
            <div className="space-y-2">
              <a href="tel:+77001234567" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +7 (700) 123-45-67
              </a>
              <a href="mailto:info@autoparts.kz" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@autoparts.kz
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?category=Масла" className="hover:text-white transition-colors">Моторные масла</Link></li>
              <li><Link href="/catalog?category=Фильтры" className="hover:text-white transition-colors">Фильтры</Link></li>
              <li><Link href="/catalog?category=Тормозная+система" className="hover:text-white transition-colors">Тормозные системы</Link></li>
              <li><Link href="/catalog?category=Подвеска" className="hover:text-white transition-colors">Подвеска</Link></li>
              <li><Link href="/catalog?category=Двигатель" className="hover:text-white transition-colors">Двигатель</Link></li>
              <li><Link href="/catalog?category=Трансмиссия" className="hover:text-white transition-colors">Трансмиссия</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Гарантия и возврат</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Блог</Link></li>
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">Режим работы</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-blue-500" />
                <div>
                  <p>Пн-Пт: 9:00 - 20:00</p>
                  <p>Сб: 10:00 - 18:00</p>
                  <p>Вс: Выходной</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-800">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-500" />
                <p>г. Алматы, пр. Назарбаева 123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 AutoParts.kz. Все права защищены.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}