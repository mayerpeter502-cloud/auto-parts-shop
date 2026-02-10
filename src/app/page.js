export default function Home() {
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

      {/* Главный поисковый блок */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Запчасти для вашего автомобиля
          </h1>
          
          {/* Подбор по авто */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-700 font-medium">Подбор по автомобилю:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select className="border rounded-lg px-3 py-2">
                <option>Марка</option>
                <option>Toyota</option>
                <option>Hyundai</option>
                <option>Kia</option>
              </select>
              <select className="border rounded-lg px-3 py-2">
                <option>Модель</option>
              </select>
              <select className="border rounded-lg px-3 py-2">
                <option>Год</option>
              </select>
              <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
                Подобрать
              </button>
            </div>
          </div>

          {/* Поиск + VIN */}
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Поиск по названию или артикулу..."
              className="flex-1 px-4 py-3 rounded-lg border"
            />
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
              Поиск
            </button>
            <button className="bg-white text-blue-600 px-4 py-3 rounded-lg border-2 border-blue-600 font-medium hover:bg-blue-50">
              Подбор по VIN
            </button>
          </div>
        </div>
      </div>

      {/* Популярные категории */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Масла', 'Фильтры', 'Тормоза', 'Подвеска', 'Двигатель', 'Кузов'].map((cat) => (
            <div key={cat} className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <span className="text-sm font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Популярные товары</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">Моторное масло</div>
                <h3 className="font-medium mb-2">Castrol EDGE 5W-30 4L</h3>
                <div className="text-xl font-bold text-blue-600 mb-3">12 500 ₸</div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}