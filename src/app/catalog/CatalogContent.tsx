"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Home, ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { ProductCardSkeleton } from "../../components/ProductCardSkeleton";
import { SearchAutocomplete } from "../../components/SearchAutocomplete";
import { CarSelector } from "../../components/CarSelector";
import {
  getProducts,
  Product,
  getCategoryBySlug,
  getCategoryParents,
  getChildCategories
} from "../lib/api";

export default function CatalogContent({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const urlSearchParams = useSearchParams();
  const categoryFromUrl = urlSearchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryFromUrl || "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    carBrand: "",
    carModel: "",
    year: "",
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const itemsPerPage = 12;
  const availableBrands = Array.from(new Set(products.map(p => p.brand))).sort();

  // Получаем текущую категорию и родителей
  const currentCategory = categoryFromUrl ? getCategoryBySlug(categoryFromUrl) : undefined;
  const categoryParents = categoryFromUrl ? getCategoryParents(categoryFromUrl) : [];

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setIsLoading(false);
  }, []);

  // Сброс фильтров при переходе на /catalog без параметров
  useEffect(() => {
    if (!categoryFromUrl && filters.category) {
      setFilters({
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        carBrand: "",
        carModel: "",
        year: "",
      });
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
  }, [categoryFromUrl, setFilters]);

  useEffect(() => {
    let result = products;

    // Поиск по названию/бренду/SKU
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории (с поддержкой вложенности)
    if (filters.category) {
      const categoryInfo = getCategoryBySlug(filters.category);
      
      if (categoryInfo?.parentId) {
        // Это подкатегория — ищем товары ТОЛЬКО этой подкатегории
        result = result.filter((p) => {
          return p.category === filters.category ||
                 p.category === categoryInfo.slug ||
                 p.category === categoryInfo.name ||
                 p.category === categoryInfo.parentId;
        });
      } else if (categoryInfo) {
        // Это родительская категория — показываем все товары родителя + подкатегорий
        const childCategories = getChildCategories(filters.category);
        const childSlugs = childCategories.map(child => child.slug);
        const childNames = childCategories.map(child => child.name);
        
        result = result.filter((p) => {
          return p.category === filters.category || 
                 p.category === categoryInfo.name ||
                 childSlugs.includes(p.category) ||
                 childNames.includes(p.category);
        });
      }
    }

    // Фильтр по бренду
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Фильтр по цене
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Фильтр "В наличии"
    if (filters.inStock) {
      result = result.filter((p) => p.stock !== undefined && p.stock > 0);
    }

    // Фильтр по авто
    if (filters.carBrand) {
      result = result.filter((p) =>
        p.compatibility?.some(c => c.brand.toLowerCase() === filters.carBrand.toLowerCase())
      );
    }

    if (filters.carModel) {
      result = result.filter((p) =>
        p.compatibility?.some(c => c.model.toLowerCase() === filters.carModel.toLowerCase())
      );
    }

    if (filters.year) {
      result = result.filter((p) =>
        p.compatibility?.some(c => c.yearFrom <= Number(filters.year) && c.yearTo >= Number(filters.year))
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, products, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCarSelect = (brand: string, model: string, year: string) => {
    setFilters(prev => ({
      ...prev,
      carBrand: brand,
      carModel: model,
      year: year
    }));
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      oil: "Масла и жидкости",
      "oil-motor": "Моторные масла",
      "oil-trans": "Трансмиссионные масла",
      "oil-coolant": "Охлаждающие жидкости",
      filter: "Фильтры",
      "filter-oil": "Масляные фильтры",
      "filter-air": "Воздушные фильтры",
      "filter-fuel": "Топливные фильтры",
      brake: "Тормозная система",
      "brake-pads": "Тормозные колодки",
      "brake-discs": "Тормозные диски",
      suspension: "Подвеска",
      "suspension-shock": "Амортизаторы",
      electrical: "Электрика",
      "electrical-spark": "Свечи зажигания",
      "electrical-battery": "Аккумуляторы",
      engine: "Двигатель",
      "engine-belt": "Ремни ГРМ"
    };
    return names[category] || category;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            <span>Главная</span>
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">
            Каталог
          </Link>
          
          {/* Родительские категории */}
          {categoryParents.map((parent) => (
            <>
              <ChevronRight className="w-4 h-4 flex-shrink-0" key={parent.id + '-icon'} />
              <Link 
                href={`/catalog?category=${parent.slug}`} 
                className="hover:text-blue-600 transition-colors"
                key={parent.id}
              >
                {parent.name}
              </Link>
            </>
          ))}
          
          {/* Текущая категория */}
          {currentCategory && (
            <>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{currentCategory.name}</span>
            </>
          )}
          
          {!currentCategory && filters.category && (
            <>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-900 font-medium">{getCategoryName(filters.category)}</span>
            </>
          )}
        </nav>

        {/* Search */}
        <div className="mb-6">
          <SearchAutocomplete
            value={searchQuery}
            onChange={setSearchQuery}
            onSelect={(product) => {
              window.location.href = `/product/${product.id}`;
            }}
            placeholder="Поиск по номеру, названию..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-fit"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Фильтры</h2>
                <button
                  onClick={() => {
                    setFilters({
                      category: "",
                      brand: "",
                      minPrice: "",
                      maxPrice: "",
                      inStock: false,
                      carBrand: "",
                      carModel: "",
                      year: "",
                    });
                    setSearchQuery("");
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Сбросить
                </button>
              </div>

              {/* Подбор по авто */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Подбор по авто</h3>
                <CarSelector onSelect={handleCarSelect} />
                {(filters.carBrand || filters.carModel || filters.year) && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                    <div className="font-medium text-blue-900">Выбрано:</div>
                    <div className="text-blue-700">
                      {filters.carBrand} {filters.carModel} {filters.year}
                    </div>
                  </div>
                )}
              </div>

              {/* Категория */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Все категории</option>
                  <option value="oil">Масла и жидкости</option>
                  <option value="filter">Фильтры</option>
                  <option value="brake">Тормозная система</option>
                  <option value="engine">Двигатель</option>
                  <option value="suspension">Подвеска</option>
                  <option value="electrical">Электрика</option>
                </select>
              </div>

              {/* Бренд */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Бренд ({availableBrands.length})
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Все бренды</option>
                  {availableBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Цена */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена, ₸</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* В наличии */}
              <div className="border-t pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">В наличии</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                {currentCategory?.name || filters.category ? getCategoryName(filters.category) : "Каталог"}
              </h1>
              <span className="text-sm text-gray-500">{filteredProducts.length} товаров</span>
            </div>

            {paginatedProducts.length === 0 && !isLoading ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">Товары не найдены</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {isLoading ? (
                    Array.from({ length: itemsPerPage }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))
                  ) : (
                    paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          ...product,
                          image: product.image || '/placeholder.jpg'
                        }}
                      />
                    ))
                  )}
                </div>

                {!isLoading && filteredProducts.length > itemsPerPage && (
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Показано {Math.min(currentPage * itemsPerPage, filteredProducts.length)} из {filteredProducts.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}