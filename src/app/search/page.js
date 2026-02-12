'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';

// Моковые данные для демо
const mockProducts = [
  { id: 1, name: 'Масло моторное Castrol 5W-30 4L', price: 12500, oldPrice: 15000, brand: 'Castrol', category: 'Масла', rating: 4.8, reviews: 124, inStock: true, image: '/products/oil1.jpg', sku: 'CAST-5W30-4L' },
  { id: 2, name: 'Фильтр масляный Bosch P7001', price: 2800, brand: 'Bosch', category: 'Фильтры', rating: 4.6, reviews: 89, inStock: true, image: '/products/filter1.jpg', sku: 'BOS-P7001' },
  { id: 3, name: 'Тормозные колодки Brembo P85020', price: 18500, oldPrice: 22000, brand: 'Brembo', category: 'Тормозная система', rating: 4.9, reviews: 256, inStock: true, image: '/products/brake1.jpg', sku: 'BRE-P85020' },
  { id: 4, name: 'Аккумулятор Varta Blue Dynamic 60Ah', price: 45000, brand: 'Varta', category: 'Аккумуляторы', rating: 4.7, reviews: 178, inStock: false, image: '/products/battery1.jpg', sku: 'VAR-BD60' },
  { id: 5, name: 'Свечи зажигания NGK BKR6E', price: 3200, brand: 'NGK', category: 'Свечи', rating: 4.5, reviews: 67, inStock: true, image: '/products/spark1.jpg', sku: 'NGK-BKR6E' },
  { id: 6, name: 'Масло трансмиссионное ZIC GFT 75W-85 4L', price: 15800, brand: 'ZIC', category: 'Масла', rating: 4.4, reviews: 45, inStock: true, image: '/products/oil2.jpg', sku: 'ZIC-GFT-75W85' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [0, 100000],
    inStock: false
  });

  // Имитация поиска
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let results = mockProducts;
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        results = mockProducts.filter(p => 
          p.name.toLowerCase().includes(lowerQuery) ||
          p.brand.toLowerCase().includes(lowerQuery) ||
          p.sku.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
        );
      }

      // Применение фильтров
      if (filters.brands.length > 0) {
        results = results.filter(p => filters.brands.includes(p.brand));
      }
      if (filters.categories.length > 0) {
        results = results.filter(p => filters.categories.includes(p.category));
      }
      if (filters.inStock) {
        results = results.filter(p => p.inStock);
      }
      results = results.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );

      // Сортировка
      switch (sortBy) {
        case 'price_asc': results.sort((a, b) => a.price - b.price); break;
        case 'price_desc': results.sort((a, b) => b.price - a.price); break;
        case 'rating': results.sort((a, b) => b.rating - a.rating); break;
        case 'reviews': results.sort((a, b) => b.reviews - a.reviews); break;
      }

      setProducts(results);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, sortBy, filters]);

  const totalPages = Math.ceil(products.length / 12);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={[{ label: 'Поиск', href: '/search' }]} />
        
        {/* Заголовок */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `Результаты поиска: "${query}"` : 'Поиск товаров'}
          </h1>
          <p className="text-gray-600">
            Найдено: {products.length} товаров
          </p>
        </div>

        {/* Поисковая строка */}
        <form className="mb-6" action="/search">
          <div className="relative max-w-2xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Поиск по названию, артикулу или бренду..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Найти
            </button>
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Фильтры */}
          <aside className={`lg:w-64 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar 
              filters={filters} 
              onChange={setFilters}
              availableFilters={{
                brands: ['Castrol', 'Bosch', 'Brembo', 'Varta', 'NGK', 'ZIC'],
                categories: ['Масла', 'Фильтры', 'Тормозная система', 'Аккумуляторы', 'Свечи']
              }}
            />
          </aside>

          {/* Контент */}
          <div className="flex-1">
            {/* Панель управления */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 text-gray-700 font-medium"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Фильтры
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600 hidden sm:inline">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">По релевантности</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="rating">По рейтингу</option>
                  <option value="reviews">По отзывам</option>
                </select>
              </div>
            </div>

            {/* Результаты */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить поисковый запрос или фильтры
                </p>
                <a 
                  href="/catalog" 
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Перейти в каталог
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}