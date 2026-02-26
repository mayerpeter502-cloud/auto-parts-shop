import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">AutoParts.kz</h3>
            <p className="text-sm text-gray-400">
              Интернет-магазин автозапчастей с доставкой по Казахстану
            </p>
          </div>

          {/* Каталог */}
          <div>
            <h4 className="text-white font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=oil" className="hover:text-white transition-colors">
                  Моторные масла
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=filter" className="hover:text-white transition-colors">
                  Фильтры
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=brake" className="hover:text-white transition-colors">
                  Тормозная система
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Все товары
                </Link>
              </li>
            </ul>
          </div>

          {/* Покупателям */}
          <div>
            <h4 className="text-white font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/car-selector" className="hover:text-white transition-colors">
                  Подбор по авто
                </Link>
              </li>
              <li>
                <Link href="/vin-check" className="hover:text-white transition-colors">
                  Проверка по VIN
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  Доставка и возврат
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +7 (777) 123-45-67</li>
              <li>📧 info@autoparts.kz</li>
              <li>📍 г. Алматы</li>
              <li>⏰ Пн-Пт 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024-2026 AutoParts.kz — Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}