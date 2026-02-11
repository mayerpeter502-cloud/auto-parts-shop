export default function Catalog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-blue-600">AutoParts.kz</div>
          <div className="flex gap-2 md:gap-4">
            <button className="text-gray-600 hover:text-blue-600 text-sm md:text-base">Войти</button>
            <button className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base">Корзина</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Фильтры — на мобильном сверху, на ПК слева */}
        <aside className="w-full md:w-64 bg-white p-3 md:p-4 rounded-lg shadow h-fit">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="font-bold text-base md:text-lg">Фильтры</h3>
            <button className="md:hidden text-blue-600 text-sm">Скрыть</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="mb-0 md:mb-4">
              <label className="block text-xs md:text-sm font-medium mb-1">Марка</label>
              <select className="w-full border rounded-lg px-2 py-1.5 text-sm">
                <option>Все марки</option>
                <option>Toyota</option>
                <option>Hyundai</option>
                <option>Kia</option>
              </select>
            </div>

            <div className="mb-0 md:mb-4">
              <label className="block text-xs md:text-sm font-medium mb-1">Модель</label>
              <select className="w-full border rounded-lg px-2 py-1.5 text-sm">
                <option>Все модели</option>
              </select>
            </div>

            <div className="mb-0 md:mb-4">
              <label className="block text-xs md:text-sm font-medium mb-1">Год</label>
              <select className="w-full border rounded-lg px-2 py-1.5 text-sm">
                <option>Все годы</option>
              </select>
            </div>

            <div className="mb-0 md:mb-4">
              <label className="block text-xs md:text-sm font-medium mb-1">Цена</label>
              <div className="flex gap-2">
                <input type="number" placeholder="от" className="w-1/2 border rounded px-2 py-1.5 text-sm"/>
                <input type="number" placeholder="до" className="w-1/2 border rounded px-2 py-1.5 text-sm"/>
              </div>
            </div>

            <div className="mb-3 md:mb-4 col-span-2 md:col-span-1">
              <label className="block text-xs md:text-sm font-medium mb-1">Бренд</label>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                {['Castrol', 'Shell', 'Mobil', 'Liqui Moly'].map(brand => (
                  <label key={brand} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded"/>
                    <span className="text-xs md:text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm md:text-base">
            Применить
          </button>
        </aside>

        {/* Контент */}
        <main className="flex-1">
          {/* Сортировка */}
          <div className="bg-white p-3 md:p-4 rounded-lg shadow mb-3 md:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-gray-600 text-sm">Найдено: 128 товаров</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>По популярности</option>
              <option>Сначала дешевле</option>
              <option>Сначала дороже</option>
            </select>
          </div>

          {/* Сетка товаров — 2 на мобильном, 3 на планшете, 4 на ПК */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[1,2,3,4,5,6].map(item => (
              <div key={item} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="h-32 md:h-40 bg-gray-200 rounded-t-lg"></div>
                <div className="p-2 md:p-4">
                  <div className="text-xs text-gray-500 mb-1">Моторное масло</div>
                  <h3 className="font-medium mb-1 md:mb-2 text-xs md:text-sm">Castrol EDGE 5W-30 4L Synthetic</h3>
                  <div className="text-base md:text-lg font-bold text-blue-600 mb-1 md:mb-2">12 500 ₸</div>
                  <div className="text-xs text-green-600 mb-2">✓ В наличии</div>
                  <button className="w-full bg-blue-600 text-white py-1.5 md:py-2 rounded hover:bg-blue-700 text-xs md:text-sm">
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}