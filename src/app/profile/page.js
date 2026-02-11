export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-blue-600">AutoParts.kz</div>
          <div className="flex gap-2 md:gap-4">
            <button className="text-gray-600 hover:text-blue-600 text-sm md:text-base">Выйти</button>
            <button className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base">Корзина</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Меню — на мобильном горизонтально, на ПК слева */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow p-3 md:p-4 h-fit">
            <div className="flex items-center gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                А
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm md:text-base truncate">Алексей</div>
                <div className="text-xs md:text-sm text-gray-500 truncate">aleksey@mail.ru</div>
              </div>
            </div>
            
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
              <button className="whitespace-nowrap px-3 py-2 md:px-4 md:w-full text-left bg-blue-50 text-blue-600 rounded-lg font-medium text-sm md:text-base">
                Мои заказы
              </button>
              <button className="whitespace-nowrap px-3 py-2 md:px-4 md:w-full text-left text-gray-600 hover:bg-gray-50 rounded-lg text-sm md:text-base">
                Избранное
              </button>
              <button className="whitespace-nowrap px-3 py-2 md:px-4 md:w-full text-left text-gray-600 hover:bg-gray-50 rounded-lg text-sm md:text-base">
                Адреса
              </button>
              <button className="whitespace-nowrap px-3 py-2 md:px-4 md:w-full text-left text-gray-600 hover:bg-gray-50 rounded-lg text-sm md:text-base">
                Настройки
              </button>
            </nav>
          </aside>

          {/* Контент */}
          <main className="flex-1">
            <h1 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Мои заказы</h1>
            
            {/* Заказ 1 */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-3 md:mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 md:mb-4">
                <div>
                  <div className="font-medium text-base md:text-lg">Заказ #12345</div>
                  <div className="text-xs md:text-sm text-gray-500">от 15 февраля 2025</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-600 text-xs md:text-sm">Доставлен</span>
                </div>
              </div>
              
              <div className="border-t pt-3 md:pt-4 mb-3 md:mb-4 space-y-2 md:space-y-3">
                <div className="flex gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-base truncate">Castrol EDGE 5W-30 4L</div>
                    <div className="text-xs md:text-sm text-gray-500">1 шт. × 12 500 ₸</div>
                  </div>
                  <div className="font-medium text-sm md:text-base">12 500 ₸</div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-base truncate">Масляный фильтр Bosch</div>
                    <div className="text-xs md:text-sm text-gray-500">1 шт. × 2 500 ₸</div>
                  </div>
                  <div className="font-medium text-sm md:text-base">2 500 ₸</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t pt-3 md:pt-4">
                <div className="text-base md:text-lg font-bold">Итого: 15 000 ₸</div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 py-2 border rounded-lg hover:bg-gray-50 text-xs md:text-sm">
                    Повторить
                  </button>
                  <button className="flex-1 sm:flex-none px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs md:text-sm">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>

            {/* Заказ 2 */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 md:mb-4">
                <div>
                  <div className="font-medium text-base md:text-lg">Заказ #12344</div>
                  <div className="text-xs md:text-sm text-gray-500">от 10 февраля 2025</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-600 text-xs md:text-sm">В пути</span>
                </div>
              </div>
              
              <div className="border-t pt-3 md:pt-4 mb-3 md:mb-4">
                <div className="flex gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-base truncate">Тормозные колодки Brembo</div>
                    <div className="text-xs md:text-sm text-gray-500">1 шт. × 18 000 ₸</div>
                  </div>
                  <div className="font-medium text-sm md:text-base">18 000 ₸</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t pt-3 md:pt-4">
                <div className="text-base md:text-lg font-bold">Итого: 18 000 ₸</div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 py-2 border rounded-lg hover:bg-gray-50 text-xs md:text-sm">
                    Отследить
                  </button>
                  <button className="flex-1 sm:flex-none px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs md:text-sm">
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