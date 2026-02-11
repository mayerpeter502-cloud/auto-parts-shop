export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">AutoParts.kz</div>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-blue-600">Выйти</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Корзина</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Меню слева */}
          <aside className="w-64 bg-white rounded-lg shadow p-4 h-fit">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                А
              </div>
              <div>
                <div className="font-medium">Алексей</div>
                <div className="text-sm text-gray-500">aleksey@mail.ru</div>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                Мои заказы
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Избранное
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Адреса доставки
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Настройки
              </button>
            </nav>
          </aside>

          {/* Контент */}
          <main className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
            
            {/* Заказ 1 */}
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-medium text-lg">Заказ #12345</div>
                  <div className="text-sm text-gray-500">от 15 февраля 2025</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-600 text-sm">Доставлен</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <div className="flex gap-4 mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="font-medium">Castrol EDGE 5W-30 4L</div>
                    <div className="text-sm text-gray-500">1 шт. × 12 500 ₸</div>
                  </div>
                  <div className="font-medium">12 500 ₸</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="font-medium">Масляный фильтр Bosch</div>
                    <div className="text-sm text-gray-500">1 шт. × 2 500 ₸</div>
                  </div>
                  <div className="font-medium">2 500 ₸</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <div className="text-lg font-bold">Итого: 15 000 ₸</div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Повторить заказ
                  </button>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>

            {/* Заказ 2 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-medium text-lg">Заказ #12344</div>
                  <div className="text-sm text-gray-500">от 10 февраля 2025</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-600 text-sm">В пути</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="font-medium">Тормозные колодки Brembo</div>
                    <div className="text-sm text-gray-500">1 шт. × 18 000 ₸</div>
                  </div>
                  <div className="font-medium">18 000 ₸</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <div className="text-lg font-bold">Итого: 18 000 ₸</div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Отследить
                  </button>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}