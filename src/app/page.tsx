"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Car } from "lucide-react";
import { getProducts, Product } from "./lib/api";

const categories = [
  "Моторные масла",
  "Фильтры",
  "Тормозные системы",
  "Подвеска",
  "Электрика",
  "Двигатель",
  "Кузовные детали",
  "Аксессуары"
];

const categoryIcons: Record<string, string> = {
  "Моторные масла": "🛢️",
  "Фильтры": "🔄",
  "Тормозные системы": "🛑",
  "Подвеска": "🔧",
  "Электрика": "⚡",
  "Двигатель": "⚙️",
  "Кузовные детали": "🚗",
  "Аксессуары": "🔌"
};

const banners = [
  { id: 1, title: "Скидка 20% на масла", subtitle: "При покупке от 10 000 ₸", color: "bg-blue-600" },
  { id: 2, title: "Новые фильтры", subtitle: "Большой выбор Mann и Bosch", color: "bg-green-600" },
  { id: 3, title: "Тормозные колодки", subtitle: "Безопасность превыше всего", color: "bg-red-600" }
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts.slice(0, 8));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gray-900 h-64 md:h-96 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${banner.color} flex items-center justify-center`}
          >
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
              <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
              <Link
                href="/catalog"
                className="inline-block mt-6 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={`category-${category}`}
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center text-3xl bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {categoryIcons[category] || "🔧"}
                </div>
                <span className="text-sm text-center text-gray-700 font-medium group-hover:text-blue-600">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Популярные товары</h2>
            <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium">
              Все товары →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={`product-${product.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-6xl">🔧</div>
                    {product.oldPrice && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">4.8 (12)</span>
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
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                        const existing = cart.find((item: any) => item.id === product.id);
                        if (existing) {
                          existing.quantity += 1;
                        } else {
                          cart.push({ ...product, quantity: 1 });
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                        window.dispatchEvent(new Event("storage"));
                      }}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}