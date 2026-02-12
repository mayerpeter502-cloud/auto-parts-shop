'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SkeletonLoader from '@/components/SkeletonLoader';
import { SlidersHorizontal, Grid, List } from 'lucide-react';

// Моковые данные
const mockProducts = [
  { id: 1, name: 'Моторное масло Mobil 1 5W-30 4L', price: 24500, oldPrice: 28900, brand: 'Mobil', category: 'Масла', inStock: true, sku: 'MOB-5W30-4L', image: null },
  { id: 2, name: 'Фильтр масляный Mann-Filter W 712/80', price: 3200, brand: 'Mann-Filter', category: 'Фильтры', inStock: true, sku: 'MAN-W712', image: null },
  { id: 3, name: 'Тормозные колодки Bosch BP937', price: 18500, oldPrice: 22000, brand: 'Bosch', category: 'Тормоза', inStock: false, sku: 'BOS-BP937', image: null, discount: 15 },
  { id: 4, name: 'Свеча зажигания NGK BKR6E', price: 1200, brand: 'NGK', category: 'Электрика', inStock: true, sku: 'NGK-BKR6E', image: null, isNew: true },
  { id: 5, name: 'Масло Castrol EDGE 5W-40 4L', price: 26800, brand: 'Castrol', category: 'Масла', inStock: true, sku: 'CAS-5W40-4L', image: null },
  { id: 6, name: 'Фильтр воздушный Mann-Filter C 30 005', price: 4500, brand: 'Mann-Filter', category: 'Фильтры', inStock: true, sku: 'MAN-C30005', image: null },
  { id: 7, name: 'Амортизатор KYB 341319', price: 32000, oldPrice: 35000, brand: 'KYB', category: 'Подвеска', inStock: true, sku: 'KYB-341319', image: null },
  { id: 8, name: 'Ремень ГРМ Gates 5669XS', price: 8900, brand: 'Gates', category: 'Двигатель', inStock: false, sku: 'GAT-5669XS', image: null },
];

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    brands: [],
    categories: [],
    inStock: false,
    onOrder: false,
  });
  const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 8;

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);

    // Загрузка избранного
    const saved = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    setFavorites(saved.map(f => f.id));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Товар добавлен в корзину');
  };

  const handleToggleFavorite = (product) => {
    const saved = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    const exists = saved.find(item => item.id === product.id);
    
    let updated;
    if (exists) {
      updated = saved.filter(item => item.id !== product.id);
      setFavorites(prev => prev.filter(id => id !== product.id));
    } else {
      updated = [...saved, product];
      setFavorites(prev => [...prev, product.id]);
    }
    
    localStorage.setItem('autoparts_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleResetFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      brands: [],
      categories: [],
      inStock: false,
      onOrder: false,
    });
  };

  // Фильтрация
  const filteredProducts = products.filter(product => {
    if (filters.priceMin && product.price < Number(filters.priceMin)) return false;
    if (filters.priceMax && product.price > Number(filters.priceMax)) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.onOrder && product.inStock) return false;
    return true;
  });

  // Сортировка
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  // Пагинация
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Каталог' }]} />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог запчастей</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <FilterSidebar 
              filters={filters} 
              onChange={setFilters} 
              onReset={handleResetFilters} 
            />
          </aside>

          {/* Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-gray-600">
                Найдено: <strong>{filteredProducts.length}</strong> товаров
              </span>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="popular">По популярности</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="name">По названию</option>
                </select>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <SkeletonLoader count={8} />
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <p className="text-gray-500">Товары не найдены</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}