'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, ChevronDown, ShoppingCart, Heart, Grid3X3, List } from 'lucide-react';
import { Product } from '@/types';
import { productApi } from '@/lib/api/products';
import Link from 'next/link';

const sortOptions = [
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'newest', label: 'Новинки' },
];

const brands = ['Mobil', 'Bosch', 'Brembo', 'NGK', 'KYB', 'Varta', 'Mann-filter', 'Castrol'];
const categories = ['Масла и жидкости', 'Фильтры', 'Тормозная система', 'Двигатель', 'Подвеска', 'Электрика'];

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    productApi.seedData();
    const allProducts = productApi.getAll();
    setProducts(allProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Price
    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }

    // Stock
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, selectedBrands, priceRange, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: Product) => item.id === product.id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
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
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AutoParts.kz
            </Link>
            
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по каталогу..."
                  className="w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs & Title */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Главная</Link>
            <span className="mx-2">/</span>
            <span>Каталог</span>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCategory || 'Все товары'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Найдено: {filteredProducts.length} товаров</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg border p-4 space-y-6 sticky top-20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Фильтры</h3>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
                  Сбросить
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Категория</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Сбросить категорию
                    </button>
                  )}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Цена (₸)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Бренд</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Только в наличии</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & View */}
            <div className="bg-white rounded-lg border p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Сортировка:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent pr-8 pl-2 py-1 text-sm font-medium cursor-pointer"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border p-12 text-center">
                <p className="text-gray-500 mb-4">Товары не найдены</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 gap-4' 
                : 'space-y-3'
              }>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg border hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex gap-4 p-4' : ''
                    }`}
                  >
                    <Link href={`/product/${product.id}`} className={viewMode === 'list' ? 'w-32 flex-shrink-0' : ''}>
                      <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${viewMode === 'list' ? 'aspect-square' : 'aspect-square'}`}>
                        <img
                          src={product.image || '/placeholder.png'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Нет в наличии</span>
                          </div>
                        )}
                        {product.oldPrice && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className={viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : 'p-3'}>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-medium text-gray-900 text-sm hover:text-blue-600 line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="text-xs text-gray-400 mt-1">Арт: {product.sku}</div>
                      </div>

                      <div className={`${viewMode === 'list' ? 'flex items-center justify-between mt-4' : 'mt-3'}`}>
                        <div className={viewMode === 'list' ? '' : 'mb-2'}>
                          <span className="font-bold text-lg">{product.price.toLocaleString()} ₸</span>
                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {product.oldPrice.toLocaleString()} ₸
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {viewMode === 'list' && 'В корзину'}
                          </button>
                        </div>
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