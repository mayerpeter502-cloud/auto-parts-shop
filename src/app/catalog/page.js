'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SearchAutocomplete from '@/components/SearchAutocomplete';

const mockProducts = [
  { id: 1, name: 'Масло моторное Castrol 5W-30 4L', price: 12500, oldPrice: 15000, brand: 'Castrol', category: 'Масла', rating: 4.8, reviews: 124, inStock: true, image: '/products/oil1.jpg', sku: 'CAST-5W30-4L' },
  { id: 2, name: 'Фильтр масляный Bosch P7001', price: 2800, brand: 'Bosch', category: 'Фильтры', rating: 4.6, reviews: 89, inStock: true, image: '/products/filter1.jpg', sku: 'BOS-P7001' },
  { id: 3, name: 'Тормозные колодки Brembo P85020', price: 18500, oldPrice: 22000, brand: 'Brembo', category: 'Тормозная система', rating: 4.9, reviews: 256, inStock: true, image: '/products/brake1.jpg', sku: 'BRE-P85020' },
  { id: 4, name: 'Аккумулятор Varta Blue Dynamic 60Ah', price: 45000, brand: 'Varta', category: 'Аккумуляторы', rating: 4.7, reviews: 178, inStock: false, image: '/products/battery1.jpg', sku: 'VAR-BD60' },
  { id: 5, name: 'Свечи зажигания NGK BKR6E', price: 3200, brand: 'NGK', category: 'Свечи', rating: 4.5, reviews: 67, inStock: true, image: '/products/spark1.jpg', sku: 'NGK-BKR6E' },
  { id: 6, name: 'Масло трансмиссионное ZIC GFT 75W-85 4L', price: 15800, brand: 'ZIC', category: 'Масла', rating: 4.4, reviews: 45, inStock: true, image: '/products/oil2.jpg', sku: 'ZIC-GFT-75W85' },
  { id: 7, name: 'Фильтр воздушный Mann C30130', price: 4500, brand: 'Mann', category: 'Фильтры', rating: 4.7, reviews: 112, inStock: true, image: '/products/airfilter1.jpg', sku: 'MAN-C30130' },
  { id: 8, name: 'Тормозной диск Brembo 09.7012.10', price: 28500, brand: 'Brembo', category: 'Тормозная система', rating: 4.8, reviews: 89, inStock: true, image: '/products/brakedisc1.jpg', sku: 'BRE-09701210' },
];

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [0, 100000],
    inStock: false
  });
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = mockProducts.filter(product => {
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
    if (filters.inStock && !product.inStock) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    return true;
  });

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Каталог', href: '/catalog' }]} />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Каталог запчастей</h1>

        {/* Поиск */}
        <div className="mb-6 max-w-2xl">
          <SearchAutocomplete />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Фильтры */}
          <aside className="lg:w-64">
            <FilterSidebar 
              filters={filters}
              onChange={setFilters}
              availableFilters={{
                brands: ['Castrol', 'Bosch', 'Brembo', 'Varta', 'NGK', 'ZIC', 'Mann'],
                categories: ['Масла', 'Фильтры', 'Тормозная система', 'Аккумуляторы', 'Свечи']
              }}
            />
          </aside>

          {/* Контент */}
          <div className="flex-1">
            {/* Сортировка */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
              <span className="text-gray-600">Найдено: {filteredProducts.length} товаров</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">По популярности</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            {/* Товары */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Товары не найдены
              </div>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}