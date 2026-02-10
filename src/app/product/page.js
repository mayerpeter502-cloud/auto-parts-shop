export default function Product() {
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-500 mb-4">
          Главная → Масла → Castrol EDGE 5W-30 4L
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Фото */}
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500">Фото товара</span>
            </div>

            {/* Инфо */}
            <div>
              <h1 className="text-2xl font-bold mb-2">Castrol EDGE 5W-30 4L</h1>
              <div className="text-sm text-gray-500 mb-4">Артикул: CAST-5W30-4L</div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">12 500 ₸</span>
                <span className="text-green-600">✓ В наличии</span>
              </div>

              <div className="mb-6">
                <span className="font-medium">Бренд:</span> Castrol<br/>
                <span className="font-medium">Вязкость:</span> 5W-30<br/>
                <span className="font-medium">Объем:</span> 4 литра<br/>
                <span className="font-medium">Тип:</span> Синтетическое
              </div>

              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                  В корзину
                </button>
                <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  ♥
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-medium mb-2">Подходит для вашего авто:</div>
                <div className="text-sm text-gray-600">Toyota Camry 2020 2.5L</div>
              </div>
            </div>
          </div>
        </div>

        {/* Таблица совместимости */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Совместимость с автомобилями</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Марка</th>
                <th className="text-left p-3">Модель</th>
                <th className="text-left p-3">Двигатель</th>
                <th className="text-left p-3">Год</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Toyota</td>
                <td className="p-3">Camry</td>
                <td className="p-3">2.5L</td>
                <td className="p-3">2018-2024</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Hyundai</td>
                <td className="p-3">Sonata</td>
                <td className="p-3">2.0L</td>
                <td className="p-3">2019-2023</td>
              </tr>
              <tr>
                <td className="p-3">Kia</td>
                <td className="p-3">K5</td>
                <td className="p-3">2.5L</td>
                <td className="p-3">2020-2024</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* С этим покупают */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">С этим покупают</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(item => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-md cursor-pointer">
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <div className="text-sm font-medium mb-1">Масляный фильтр</div>
                <div className="text-blue-600 font-bold">2 500 ₸</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}