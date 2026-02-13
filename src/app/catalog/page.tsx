'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ShoppingCart, 
  ChevronDown,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Product, productApi } from '@/app/lib/api';
import { useCart } from '@/app/hooks/useCart';

function CatalogContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Все', 'Масла', 'Фильтры', 'Тормоза', 'Подвеска', 'Двигатель', 'Электрика'];
  const brands = ['Bosch', 'Mann', 'Liqui Moly', 'Febi', 'VAG', 'Toyota'];

  useEffect(() => {
    const loadProducts = () => {
      const data = productApi.getAll();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'Все') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, priceRange, selectedBrands, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    alert('Товар добавлен в корзину');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Каталог</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Поиск и заголовок */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Каталог запчастей</h1>
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или артикулу..."
              className="w-full border-2 border-gray-200 rounded-lg pl-4 pr-12 py-3 focus:border-blue-600 focus:outline-none"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Фильтры (сайдбар) */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
              <div className="flex items-center justify-between lg:hidden">
                <h3 className="font-bold">Фильтры</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Категории */}
              <div>
                <h3 className="font-medium mb-3">Категория</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat || (cat === 'Все' && !selectedCategory)}
                        onChange={() => setSelectedCategory(cat === 'Все' ? '' : cat)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div>
                <h3 className="font-medium mb-3">Цена</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Бренды */}
              <div>
                <h3 className="font-medium mb-3">Бренд</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Наличие */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm">Только в наличии</span>
                </label>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange({ min: '', max: '' });
                  setSelectedBrands([]);
                  setInStockOnly(false);
                }}
                className="w-full text-blue-600 text-sm hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>

          {/* Контент */}
          <div className="flex-1">
            {/* Панель управления */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-gray-600"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Фильтры
                </button>
                <span className="text-gray-500 text-sm">
                  Найдено: {filteredProducts.length}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="name">По названию</option>
                </select>

                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Список товаров */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">Товары не найдены</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex gap-4 p-4' : ''
                    }`}
                  >
                    <Link href={`/product/${product.id}`} className={`block ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <div className={`relative bg-gray-100 ${viewMode === 'list' ? 'h-32' : 'aspect-square'}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                        />
                        {product.discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                        {viewMode === 'list' && product.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                        )}
                      </div>
                      
                      <div className={`flex items-center ${viewMode === 'list' ? 'justify-between' : 'justify-between mt-4'}`}>
                        <div>
                          <span className="text-xl font-bold text-gray-900">{product.price.toLocaleString()} ₸</span>
                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {product.oldPrice.toLocaleString()} ₸
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="hidden sm:inline text-sm">В корзину</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}