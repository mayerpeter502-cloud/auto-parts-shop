export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">AutoParts.kz</h3>
            <p className="text-gray-400 text-sm">Интернет-магазин автозапчастей с доставкой по Казахстану</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+7 (777) 123-45-67</li>
              <li>info@autoparts.kz</li>
              <li>Алматы</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white">О нас</a></li>
              <li><a href="/delivery" className="hover:text-white">Доставка</a></li>
              <li><a href="/contacts" className="hover:text-white">Контакты</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
          © 2024-2026 AutoParts.kz — Все права защищены
        </div>
      </div>
    </footer>
  );
}