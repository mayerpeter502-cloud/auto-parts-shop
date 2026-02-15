"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProductCard } from "../../components/ProductCard";
import { FilterSidebar } from "../../components/FilterSidebar";
import { getProducts, Product } from "../lib/api";
import { SlidersHorizontal } from "lucide-react";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
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

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    let result = products;

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
      result = result.filter((p) => p.inStock);
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
  }, [filters, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-fit"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

          {/* Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">Каталог</h1>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} товаров
              </span>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">Товары не найдены</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
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
                    
                    {currentPage < totalPages && (
                      <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Показать еще
                      </button>
                    )}
                    
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