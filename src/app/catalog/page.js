export default function Catalog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">AutoParts.kz</div>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-blue-600">Войти</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Корзина</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Фильтры слева */}
        <aside className="w-64 bg-white p-4 rounded-lg shadow h-fit">
          <h3 className="font-bold mb-4">Фильтры</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Марка</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Все марки</option>
              <option>Toyota</option>
              <option>Hyundai</option>
              <option>Kia</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Модель</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Все модели</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Год</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Все годы</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Цена</label>
            <div className="flex gap-2">
              <input type="number" placeholder="от" className="w-1/2 border rounded px-2 py-1"/>
              <input type="number" placeholder="до" className="w-1/2 border rounded px-2 py-1"/>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Бренд</label>
            <div className="space-y-2">
              {['Castrol', 'Shell', 'Mobil', 'Liqui Moly'].map(brand => (
                <label key={brand} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded"/>
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Применить
          </button>
        </aside>

        {/* Контент */}
        <main className="flex-1">
          {/* Сортировка */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
            <span className="text-gray-600">Найдено: 128 товаров</span>
            <select className="border rounded px-3 py-1">
              <option>По популярности</option>
              <option>Сначала дешевле</option>
              <option>Сначала дороже</option>
            </select>
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(item => (
              <div key={item} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">Моторное масло</div>
                  <h3 className="font-medium mb-2 text-sm">Castrol EDGE 5W-30 4L Synthetic</h3>
                  <div className="text-lg font-bold text-blue-600 mb-2">12 500 ₸</div>
                  <div className="text-xs text-green-600 mb-2">✓ В наличии</div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
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