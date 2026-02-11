export default function Product() {
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

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Хлебные крошки */}
        <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
          Главная → Масла → Castrol EDGE 5W-30 4L
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Фото */}
            <div className="bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center order-1">
              <span className="text-gray-500 text-sm md:text-base">Фото товара</span>
            </div>

            {/* Инфо */}
            <div className="order-2">
              <h1 className="text-lg md:text-2xl font-bold mb-2">Castrol EDGE 5W-30 4L</h1>
              <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">Артикул: CAST-5W30-4L</div>
              
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">12 500 ₸</span>
                <span className="text-green-600 text-sm">✓ В наличии</span>
              </div>

              <div className="text-sm md:text-base mb-4 md:mb-6 space-y-1">
                <div><span className="font-medium">Бренд:</span> Castrol</div>
                <div><span className="font-medium">Вязкость:</span> 5W-30</div>
                <div><span className="font-medium">Объем:</span> 4 литра</div>
                <div><span className="font-medium">Тип:</span> Синтетическое</div>
              </div>

              <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                <button className="flex-1 bg-blue-600 text-white py-2.5 md:py-3 rounded-lg font-medium hover:bg-blue-700 text-sm md:text-base">
                  В корзину
                </button>
                <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  ♥
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                <div className="font-medium text-sm mb-1">Подходит для вашего авто:</div>
                <div className="text-xs md:text-sm text-gray-600">Toyota Camry 2020 2.5L</div>
              </div>
            </div>
          </div>
        </div>

        {/* Таблица совместимости */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6 overflow-x-auto">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Совместимость с автомобилями</h2>
          <table className="w-full text-xs md:text-sm min-w-[500px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 md:p-3">Марка</th>
                <th className="text-left p-2 md:p-3">Модель</th>
                <th className="text-left p-2 md:p-3">Двигатель</th>
                <th className="text-left p-2 md:p-3">Год</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 md:p-3">Toyota</td>
                <td className="p-2 md:p-3">Camry</td>
                <td className="p-2 md:p-3">2.5L</td>
                <td className="p-2 md:p-3">2018-2024</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 md:p-3">Hyundai</td>
                <td className="p-2 md:p-3">Sonata</td>
                <td className="p-2 md:p-3">2.0L</td>
                <td className="p-2 md:p-3">2019-2023</td>
              </tr>
              <tr>
                <td className="p-2 md:p-3">Kia</td>
                <td className="p-2 md:p-3">K5</td>
                <td className="p-2 md:p-3">2.5L</td>
                <td className="p-2 md:p-3">2020-2024</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* С этим покупают */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">С этим покупают</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[1,2,3,4].map(item => (
              <div key={item} className="border rounded-lg p-3 hover:shadow-md cursor-pointer">
                <div className="h-24 md:h-32 bg-gray-200 rounded mb-2"></div>
                <div className="text-xs md:text-sm font-medium mb-1">Масляный фильтр</div>
                <div className="text-blue-600 font-bold text-sm md:text-base">2 500 ₸</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}