export default function Home() {
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

      {/* Главный поисковый блок */}
      <div className="bg-blue-600 py-6 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6">
            Запчасти для вашего автомобиля
          </h1>
          
          {/* Подбор по авто */}
          <div className="bg-white rounded-lg p-3 md:p-4 mb-3 md:mb-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="text-gray-700 font-medium text-sm md:text-base">Подбор по автомобилю:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <select className="border rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-sm">
                <option>Марка</option>
                <option>Toyota</option>
                <option>Hyundai</option>
                <option>Kia</option>
              </select>
              <select className="border rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-sm">
                <option>Модель</option>
              </select>
              <select className="border rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-sm">
                <option>Год</option>
              </select>
              <button className="bg-blue-600 text-white rounded-lg py-1.5 md:py-2 text-sm hover:bg-blue-700">
                Подобрать
              </button>
            </div>
          </div>

          {/* Поиск + VIN */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            <input 
              type="text" 
              placeholder="Поиск по названию или артикулу..."
              className="flex-1 px-3 py-2 md:px-4 md:py-3 rounded-lg border text-sm md:text-base"
            />
            <div className="flex gap-2">
              <button className="flex-1 md:flex-none bg-yellow-500 text-black px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-yellow-600 text-sm md:text-base">
                Поиск
              </button>
              <button className="flex-1 md:flex-none bg-white text-blue-600 px-3 py-2 md:px-4 md:py-3 rounded-lg border-2 border-blue-600 font-medium hover:bg-blue-50 text-sm md:text-base whitespace-nowrap">
                VIN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Популярные категории */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Популярные категории</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {['Масла', 'Фильтры', 'Тормоза', 'Подвеска', 'Двигатель', 'Кузов'].map((cat) => (
            <div key={cat} className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-md cursor-pointer text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <span className="text-xs md:text-sm font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Популярные товары</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="h-32 md:h-40 bg-gray-200 rounded-t-lg"></div>
              <div className="p-3 md:p-4">
                <div className="text-xs md:text-sm text-gray-500 mb-1">Моторное масло</div>
                <h3 className="font-medium mb-2 text-sm md:text-base">Castrol EDGE 5W-30 4L</h3>
                <div className="text-lg md:text-xl font-bold text-blue-600 mb-2 md:mb-3">12 500 ₸</div>
                <button className="w-full bg-blue-600 text-white py-1.5 md:py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base">
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