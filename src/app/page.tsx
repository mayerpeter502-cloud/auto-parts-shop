"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Car, FileText, Search, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { productsApi, initStorage, categories } from "./lib/api";
import { useCart } from "../contexts/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    initStorage();
    const allProducts = productsApi.getAll();
    setProducts(allProducts.slice(0, 8));
  }, []);

  const banners = [
    {
      id: "banner-1",
      title: "Тормозные системы Brembo",
      subtitle: "Премиум качество",
      color: "bg-gradient-to-r from-red-600 to-red-500",
      link: "/catalog?brand=Brembo"
    },
    {
      id: "banner-2",
      title: "Моторные масла Shell",
      subtitle: "Скидки до 30%",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-400",
      link: "/catalog?category=Масла"
    },
    {
      id: "banner-3",
      title: "Фильтры Bosch",
      subtitle: "Надежность проверена временем",
      color: "bg-gradient-to-r from-blue-600 to-blue-500",
      link: "/catalog?brand=Bosch"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const categoryIcons: Record<string, string> = {
    "Масла": "🛢️",
    "Фильтры": "🔄",
    "Тормозная система": "🛑",
    "Подвеска": "🔧",
    "Двигатель": "⚙️",
    "Трансмиссия": "⚡",
    "Электрика": "🔌",
    "Кузовные детали": "🚗"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          {/* Search Block */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Link
                href="/catalog?carSelector=true"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Car className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Подбор по автомобилю</div>
                  <div className="text-sm text-blue-100">Выберите марку и модель</div>
                </div>
              </Link>
              <Link
                href="/vin-check"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all"
              >
                <FileText className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Подбор по VIN</div>
                  <div className="text-sm text-gray-500">Проверьте по номеру кузова</div>
                </div>
              </Link>
            </div>

            {/* Main Search */}
            <form action="/catalog" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Поиск по названию, артикулу или VIN..."
                className="w-full pl-6 pr-16 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Banner Carousel */}
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-64 md:h-80">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className={`${banner.color} h-full flex items-center px-8 md:px-16`}>
                    <div className="text-white">
                      <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
                      <p className="text-lg md:text-xl mb-6 opacity-90">{banner.subtitle}</p>
                      <Link
                        href={banner.link}
                        className="inline-block px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((banner, index) => (
                <button
                  key={`dot-${banner.id}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
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
                    <div className="text-6xl">📦</div>
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
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🚚", title: "Быстрая доставка", desc: "По всему Казахстану" },
              { icon: "✅", title: "Гарантия качества", desc: "Оригинальные запчасти" },
              { icon: "🔍", title: "Подбор по VIN", desc: "Точная совместимость" },
              { icon: "🎧", title: "Поддержка 24/7", desc: "Всегда на связи" }
            ].map((feature, index) => (
              <div key={`feature-${index}`} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}