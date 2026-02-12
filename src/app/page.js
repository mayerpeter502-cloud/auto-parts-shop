'use client';
import { useState } from 'react';
import { Search, Car, ChevronRight, Star, Heart, ShoppingCart, Menu, X, ChevronLeft } from 'lucide-react';

// Моковые данные
const categories = [
  { id: 1, name: 'Моторное масло', icon: '🛢️', count: 1250 },
  { id: 2, name: 'Тормозные колодки', icon: '🛑', count: 890 },
  { id: 3, name: 'Воздушные фильтры', icon: '💨', count: 650 },
  { id: 4, name: 'Масляные фильтры', icon: '🔧', count: 720 },
  { id: 5, name: 'Свечи зажигания', icon: '⚡', count: 430 },
  { id: 6, name: 'Аккумуляторы', icon: '🔋', count: 180 },
  { id: 7, name: 'Щетки стеклоочистителя', icon: '🌧️', count: 320 },
  { id: 8, name: 'Ремни ГРМ', icon: '⚙️', count: 290 },
];

const banners = [
  {
    id: 1,
    title: 'Скидки на моторное масло',
    subtitle: 'До 40% на топовые бренды',
    cta: 'Смотреть',
    gradient: 'from-blue-600 to-blue-800',
    image: 'oil'
  },
  {
    id: 2,
    title: 'Тормозные системы',
    subtitle: 'Бесплатная установка',
    cta: 'Подобрать',
    gradient: 'from-red-600 to-red-800',
    image: 'brakes'
  },
  {
    id: 3,
    title: 'Комплект ТО',
    subtitle: 'Масло + фильтры = -20%',
    cta: 'Собрать',
    gradient: 'from-green-600 to-green-800',
    image: 'service'
  }
];

const popularProducts = [
  { id: 1, name: 'Castrol EDGE 5W-30 4L', price: 12500, oldPrice: 15800, rating: 4.9, reviews: 128, image: 'oil', badge: 'Хит' },
  { id: 2, name: 'Bosch Тормозные колодки', price: 8900, oldPrice: 11200, rating: 4.8, reviews: 89, image: 'brakes', badge: 'Акция' },
  { id: 3, name: 'Mann Фильтр воздушный', price: 3200, oldPrice: 4500, rating: 4.7, reviews: 256, image: 'filter', badge: null },
  { id: 4, name: 'NGK Свечи зажигания 4шт', price: 5600, oldPrice: 7200, rating: 4.9, reviews: 167, image: 'spark', badge: 'Топ' },
  { id: 5, name: 'Mobil 1 0W-40 4L', price: 14200, oldPrice: 18900, rating: 4.8, reviews: 203, image: 'oil2', badge: null },
  { id: 6, name: 'Varta Аккумулятор 60Ah', price: 28500, oldPrice: 32900, rating: 4.6, reviews: 78, image: 'battery', badge: 'Новинка' },
  { id: 7, name: 'Brembo Диски тормозные', price: 18900, oldPrice: 22500, rating: 4.9, reviews: 45, image: 'disc', badge: null },
  { id: 8, name: 'Liqui Moly 5W-40 5L', price: 16800, oldPrice: 21500, rating: 4.7, reviews: 134, image: 'oil3', badge: 'Акция' },
];

const brands = ['Castrol', 'Bosch', 'Mann', 'NGK', 'Mobil', 'Varta', 'Brembo', 'Liqui Moly', 'Shell', 'Total'];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Лого */}
            <div className="flex items-center gap-2">
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="text-xl md:text-2xl font-bold text-blue-600">AutoParts.kz</div>
            </div>

            {/* Поиск */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по номеру, названию или VIN..."
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Действия */}
            <div className="flex items-center gap-2 md:gap-4">
              <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Car className="w-5 h-5" />
                <span className="text-sm">Мой авто</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <Heart className="w-6 h-6" />
                {favorites.size > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.size}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Войти
              </button>
            </div>
          </div>

          {/* Мобильный поиск */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по номеру или названию..."
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-6 text-sm">
              <a href="/catalog" className="flex items-center gap-2 font-medium hover:text-blue-600">
                <Menu className="w-4 h-4" />
                Каталог
              </a>
              <a href="#" className="hover:text-blue-600">Подбор по VIN</a>
              <a href="#" className="hover:text-blue-600">Подбор по авто</a>
              <a href="#" className="hover:text-blue-600">Акции</a>
              <a href="#" className="hover:text-blue-600">Доставка</a>
              <a href="#" className="hover:text-blue-600">Контакты</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[120px] bg-white z-40 p-4">
          <div className="space-y-4">
            <a href="/catalog" className="block py-2 border-b">Каталог</a>
            <a href="#" className="block py-2 border-b">Подбор по VIN</a>
            <a href="#" className="block py-2 border-b">Подбор по авто</a>
            <a href="#" className="block py-2 border-b">Акции</a>
            <a href="#" className="block py-2 border-b">Избранное</a>
            <a href="#" className="block py-2 border-b">Корзина</a>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Карусель баннеров */}
        <div className="relative mb-6 md:mb-8 rounded-2xl overflow-hidden h-[200px] md:h-[320px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentBanner ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`h-full bg-gradient-to-r ${banner.gradient} p-6 md:p-12 flex items-center`}>
                <div className="text-white max-w-lg">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{banner.title}</h2>
                  <p className="text-base md:text-lg mb-4 md:mb-6 opacity-90">{banner.subtitle}</p>
                  <button className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Навигация баннеров */}
          <button 
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Индикаторы */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner ? 'w-6 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Подбор по авто + VIN */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 md:mb-8">
          <div className="bg-blue-600 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Car className="w-8 h-8" />
              <h3 className="text-lg md:text-xl font-bold">Подбор по автомобилю</h3>
            </div>
            <p className="text-blue-100 mb-4 text-sm md:text-base">Выберите марку, модель и год — покажем совместимые запчасти</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 w-full md:w-auto">
              Выбрать авто
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-8 h-8" />
              <h3 className="text-lg md:text-xl font-bold">Подбор по VIN-коду</h3>
            </div>
            <p className="text-purple-100 mb-4 text-sm md:text-base">Точный подбор по уникальному коду автомобиля за 10 секунд</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="VIN номер"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm"
              />
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 whitespace-nowrap">
                Найти
              </button>
            </div>
          </div>
        </div>

        {/* Популярные категории */}
        <section className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-2xl font-bold">Популярные категории</h2>
            <a href="/catalog" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
              Все категории <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="text-xs md:text-sm font-medium text-gray-900 leading-tight">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-1">{cat.count} товаров</div>
              </a>
            ))}
          </div>
        </section>

        {/* Популярные товары */}
        <section className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-2xl font-bold">Популярные товары</h2>
            <a href="/catalog" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
              Смотреть все <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-3 md:p-4 hover:shadow-lg transition-shadow group relative">
                {/* Бейдж */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                    product.badge === 'Акция' ? 'bg-red-500 text-white' :
                    product.badge === 'Хит' ? 'bg-orange-500 text-white' :
                    product.badge === 'Новинка' ? 'bg-green-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Избранное */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full transition-colors ${
                    favorites.has(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Фото */}
                <div className="h-32 md:h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>

                {/* Инфо */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  
                  <h3 className="font-medium text-sm md:text-base text-gray-900 line-clamp-2 h-10 md:h-12">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-bold text-blue-600">{product.price.toLocaleString()} ₸</span>
                    <span className="text-xs text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₸</span>
                  </div>
                  
                  <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Бренды */}
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-2xl font-bold mb-4">Популярные бренды</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {brands.map((brand) => (
              <a
                key={brand}
                href={`/catalog?brand=${brand}`}
                className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {brand}
              </a>
            ))}
          </div>
        </section>

        {/* Преимущества */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Быстрая доставка', desc: 'По всему Казахстану' },
            { icon: '✅', title: 'Гарантия качества', desc: 'Только оригинал' },
            { icon: '💰', title: 'Низкие цены', desc: 'Прямо от поставщиков' },
            { icon: '🔄', title: 'Легкий возврат', desc: '30 дней на возврат' },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-medium text-sm md:text-base mb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </section>
      </main>

      {/* Футер */}
      <footer className="bg-gray-900 text-white mt-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="text-xl font-bold mb-4">AutoParts.kz</div>
              <p className="text-gray-400 text-sm">Интернет-магазин автозапчастей №1 в Казахстане</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Каталог</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Масла</a></li>
                <li><a href="#" className="hover:text-white">Фильтры</a></li>
                <li><a href="#" className="hover:text-white">Тормоза</a></li>
                <li><a href="#" className="hover:text-white">Двигатель</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Покупателям</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Доставка</a></li>
                <li><a href="#" className="hover:text-white">Оплата</a></li>
                <li><a href="#" className="hover:text-white">Возврат</a></li>
                <li><a href="#" className="hover:text-white">Поддержка</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Контакты</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (777) 123-45-67</li>
                <li>info@autoparts.kz</li>
                <li>г. Алматы, пр. Назарбаева 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 AutoParts.kz — Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
}