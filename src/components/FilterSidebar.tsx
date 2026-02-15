"use client";

import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    category: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
    inStock: boolean;
    carBrand: string;
    carModel: string;
    year: string;
  };
  setFilters: (filters: any) => void;
}

const categories = [
  { value: "", label: "Все категории" },
  { value: "oil", label: "Моторные масла" },
  { value: "filter", label: "Фильтры" },
  { value: "brake", label: "Тормозные системы" },
  { value: "suspension", label: "Подвеска" },
  { value: "electrical", label: "Электрика" },
  { value: "engine", label: "Двигатель" },
];

const brands = [
  { value: "", label: "Все бренды" },
  { value: "Castrol", label: "Castrol" },
  { value: "Mobil", label: "Mobil" },
  { value: "Shell", label: "Shell" },
  { value: "Bosch", label: "Bosch" },
  { value: "Mann", label: "Mann-Filter" },
  { value: "Denso", label: "Denso" },
];

const carBrands = [
  { value: "", label: "Все марки" },
  { value: "Toyota", label: "Toyota" },
  { value: "Honda", label: "Honda" },
  { value: "BMW", label: "BMW" },
  { value: "Mercedes", label: "Mercedes-Benz" },
  { value: "Audi", label: "Audi" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Kia", label: "Kia" },
  { value: "Hyundai", label: "Hyundai" },
];

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
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
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== "" && v !== false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Фильтры</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Сбросить
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Car Selection */}
        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-3">Подбор по авто</h3>
          
          <div className="space-y-3">
            <select
              value={filters.carBrand}
              onChange={(e) => updateFilter("carBrand", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {carBrands.map((brand) => (
                <option key={brand.value} value={brand.value}>
                  {brand.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Модель"
              value={filters.carModel}
              onChange={(e) => updateFilter("carModel", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Год выпуска"
              value={filters.year}
              onChange={(e) => updateFilter("year", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Бренд
          </label>
          <select
            value={filters.brand}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            {brands.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена, ₸
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="От"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* In Stock */}
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilter("inStock", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">В наличии</span>
          </label>
        </div>
      </div>
    </div>
  );
}