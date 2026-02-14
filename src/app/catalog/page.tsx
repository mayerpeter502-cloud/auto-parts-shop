"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, Filter, X, Car, ChevronDown } from "lucide-react";
import { productsApi, categories, carBrands } from "../lib/api";
import { useCart } from "../../contexts/CartContext";

// Данные для подбора авто
const carModels: Record<string, string[]> = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Prado"],
  "BMW": ["X5", "X3", "3 Series", "5 Series", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  "Audi": ["A4", "A6", "Q5", "Q7", "A3"],
  "Volkswagen": ["Passat", "Tiguan", "Polo", "Golf", "Touareg"],
  "Hyundai": ["Solaris", "Creta", "Tucson", "Santa Fe", "Elantra"],
  "Kia": ["Rio", "Sportage", "Seltos", "K5", "Sorento"],
  "Nissan": ["Qashqai", "X-Trail", "Teana", "Almera", "Patrol"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  "Mazda": ["CX-5", "CX-9", "Mazda3", "Mazda6", "CX-30"],
  "Lexus": ["RX", "NX", "ES", "LX", "IS"],
  "Ford": ["Focus", "Mondeo", "Kuga", "Explorer", "Mustang"]
};

const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filters
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Car selector
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [carBrand, setCarBrand] = useState(searchParams.get("carBrand") || "");
  const [carModel, setCarModel] = useState(searchParams.get("carModel") || "");
  const [carYear, setCarYear] = useState(Number(searchParams.get("year")) || 2024);
  const [brandSearch, setBrandSearch] = useState(searchParams.get("carBrand") || "");
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [searchParams]);

  const loadProducts = () => {
    setLoading(true);
    let result = productsApi.getAll();
    
    // Search filter
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      result = productsApi.search(searchQuery);
      setSearch(searchQuery);
    }
    
    // Category filter
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
      setSelectedCategory(categoryParam);
    }
    
    // Car filter
    const carBrandParam = searchParams.get("carBrand");
    const carModelParam = searchParams.get("carModel");
    const yearParam = searchParams.get("year");
    
    if (carBrandParam && carModelParam) {
      result = result.filter(p => 
        p.compatibility?.some((c: any) => 
          c.brand.toLowerCase() === carBrandParam.toLowerCase() &&
          c.model.toLowerCase() === carModelParam.toLowerCase() &&
          (!yearParam || (c.yearFrom <= Number(yearParam) && c.yearTo >= Number(yearParam)))
        )
      );
      setCarBrand(carBrandParam);
      setCarModel(carModelParam);
      setCarYear(Number(yearParam) || 2024);
      setBrandSearch(carBrandParam);
    }
    
    setProducts(result);
    setLoading(false);
  };

  const applyFilters = () => {
    let result = productsApi.getAll();
    
    if (search) {
      result = productsApi.search(search);
    }
    
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (carBrand && carModel) {
      result = result.filter(p => 
        p.compatibility?.some((c: any) => 
          c.brand.toLowerCase() === carBrand.toLowerCase() &&
          c.model.toLowerCase() === carModel.toLowerCase() &&
          (carYear === 0 || (c.yearFrom <= carYear && c.yearTo >= carYear))
        )
      );
    }
    
    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }
    
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }
    
    setProducts(result);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setCarBrand("");
    setCarModel("");
    setCarYear(2024);
    setBrandSearch("");
    setProducts(productsApi.getAll());
  };

  const handleCarSelect = () => {
    if (carBrand && carModel) {
      applyFilters();
      setShowCarSelector(false);
    }
  };

  const filteredBrands = carBrands.filter(b => 
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const activeFiltersCount = [
    search, selectedCategory, carBrand, minPrice, maxPrice, inStockOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Главная</Link>
          <span>/</span>
          <span className="text-gray-900">Каталог</span>
          {carBrand && carModel && (
            <>
              <span>/</span>
              <span className="text-blue-600">{carBrand} {carModel} {carYear}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-6">Каталог запчастей</h1>

        {/* Search and Car Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию или артикулу..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowCarSelector(true)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                carBrand && carModel 
                  ? "bg-green-100 text-green-700 hover:bg-green-200" 
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              <Car className="w-5 h-5" />
              {carBrand && carModel ? `${carBrand} ${carModel}` : "Подбор по авто"}
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Найти
            </button>
          </div>

          {/* Active filters */}
          {(carBrand || selectedCategory) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              {carBrand && carModel && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {carBrand} {carModel} {carYear}
                  <button onClick={() => { setCarBrand(""); setCarModel(""); applyFilters(); }} className="hover:text-green-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {selectedCategory}
                  <button onClick={() => { setSelectedCategory(""); applyFilters(); }} className="hover:text-blue-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-700">
                Сбросить все
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-6">
              <div className="flex items-center justify-between lg:hidden">
                <h3 className="font-semibold">Фильтры</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <h3 className="font-semibold mb-3">Категория</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => { setSelectedCategory(""); applyFilters(); }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Все</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => { setSelectedCategory(cat); applyFilters(); }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-semibold mb-3">Цена</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => { setInStockOnly(e.target.checked); applyFilters(); }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm">Только в наличии</span>
                </label>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <Filter className="w-4 h-4" />
                  Фильтры {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
                <span className="text-gray-500">Найдено: {products.length}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>По популярности</option>
                  <option>По цене (возр)</option>
                  <option>По цене (убыв)</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-12">Загрузка...</div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                <p className="text-gray-500 mb-4">Попробуйте изменить параметры поиска</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <Link href={`/product/${product.id}`} className={`block ${viewMode === "list" ? "w-48 shrink-0" : ""}`}>
                      <div className={`bg-gray-100 flex items-center justify-center ${viewMode === "list" ? "h-full" : "h-48"}`}>
                        <div className="text-6xl">📦</div>
                      </div>
                    </Link>
                    
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        {product.oldPrice && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shrink-0">
                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            {product.price.toLocaleString()} ₸
                          </div>
                          {product.oldPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              {product.oldPrice.toLocaleString()} ₸
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            sku: product.sku
                          })}
                          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ShoppingCart className="w-5 h-5" />
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

      {/* Car Selector Modal */}
      {showCarSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Car className="w-6 h-6 text-blue-600" />
                Подбор по автомобилю
              </h2>
              <button 
                onClick={() => setShowCarSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Марка автомобиля *</label>
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => {
                    setBrandSearch(e.target.value);
                    setShowBrandSuggestions(true);
                    setCarBrand("");
                    setCarModel("");
                  }}
                  onFocus={() => setShowBrandSuggestions(true)}
                  placeholder="Начните вводить марку..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {showBrandSuggestions && filteredBrands.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredBrands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => {
                          setCarBrand(brand);
                          setBrandSearch(brand);
                          setShowBrandSuggestions(false);
                          setCarModel("");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Модель *</label>
                <select
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  disabled={!carBrand}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Выберите модель</option>
                  {carBrand && carModels[carBrand]?.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Год выпуска</label>
                <select
                  value={carYear}
                  onChange={(e) => setCarYear(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCarSelect}
                disabled={!carBrand || !carModel}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold mt-4"
              >
                Показать запчасти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}