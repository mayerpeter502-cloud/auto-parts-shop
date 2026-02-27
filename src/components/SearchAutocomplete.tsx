"use client";
import { useState, useEffect, useRef } from "react";
import { getProducts, Product } from "../app/lib/api";

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (product: Product) => void;
  placeholder?: string;
}

export function SearchAutocomplete({ 
  value, 
  onChange, 
  onSelect, 
  placeholder 
}: SearchAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фильтрация товаров
  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const products = getProducts();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase()) ||
      p.brand.toLowerCase().includes(value.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(value.toLowerCase()))  // ✅ Поиск по SKU
    );
    setSuggestions(filtered);
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder || "Поиск по названию, бренду или артикулу..."}
        className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                onSelect(product);
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">
                🔧
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {product.name}
                </div>
                <div className="text-sm text-gray-500">
                  {product.brand} • {product.sku && `SKU: ${product.sku} • `}{product.price.toLocaleString()} ₸
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          Товары не найдены
        </div>
      )}
    </div>
  );
}