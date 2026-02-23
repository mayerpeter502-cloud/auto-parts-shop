"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from '../../components/ProductCard';
import { SearchAutocomplete } from "../../components/SearchAutocomplete";
import { CarSelector } from "../../components/CarSelector";
import { getProducts, Product } from "../lib/api";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }
    if (filters.inStock) {
      // ← ИСПРАВЛЕНО: проверяем stock вместо inStock
      result = result.filter((p) => p.stock && p.stock > 0);
    }
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
      oil: "Моторные масла",
      filter: "Фильтры",
      brake: "Тормозные системы",
      suspension: "Подвеска",
      electrical: "Электрика",
      engine: "Двигатель"
    };
    return names[category] || "Каталог";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SearchAutocomplete
          value={searchQuery}
          onChange={setSearchQuery}
          onSelect={(product) => {
            window.location.href = `/product/${product.id}`;
          }}
          placeholder="Поиск по номеру, названию..."
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-fit"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

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

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Все категории</option>
                  <option value="Масла и жидкости">Масла и жидкости</option>
                  <option value="Фильтры">Фильтры</option>
                  <option value="Тормозная система">Тормозная система</option>
                  <option value="Двигатель">Двигатель</option>
                  <option value="Подвеска">Подвеска</option>
                  <option value="Электрика">Электрика</option>
                </select>
              </div>

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

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                {filters.category ? getCategoryName(filters.category) : "Каталог"}
              </h1>
              <span className="text-sm text-gray-500">{filteredProducts.length} товаров</span>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">Товары не найдены</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        image: product.image || '/placeholder.jpg'
                      }}
                    />
                  ))}
                </div>

                {filteredProducts.length > itemsPerPage && (
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

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
