"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts, categories } from "./lib/api";

const banners = [
  { id: 1, title: "Скидка 20% на масла", subtitle: "При покупке от 10 000 ₸", color: "bg-blue-600" },
  { id: 2, title: "Новые фильтры", subtitle: "Большой выбор Mann и Bosch", color: "bg-green-600" },
  { id: 3, title: "Тормозные колодки", subtitle: "Безопасность превыше всего", color: "bg-red-600" }
];

export default function HomePage() {
  const products = getProducts().slice(0, 8);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-gray-900 h-64 md:h-96 overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              } ${banner.color} flex items-center justify-center`}
            >
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
                <Link 
                  href="/catalog" 
                  className="inline-block mt-6 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100"
                >
                  Перейти в каталог
                </Link>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBanner ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Баннер ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Categories with Subcategories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярные категории</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col">
                  {/* Parent Category */}
                  <Link
                    href={`/catalog?category=${category.slug}`}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all mb-2"
                  >
                    <div className="w-16 h-16 mb-3 flex items-center justify-center text-3xl bg-white rounded-full shadow-sm">
                      {category.icon}
                    </div>
                    <span className="text-sm text-center text-gray-700 font-medium">{category.name}</span>
                  </Link>
                  
                  {/* Subcategories */}
                  {category.children && category.children.length > 0 && (
                    <div className="pl-2 space-y-1">
                      {category.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/catalog?category=${child.slug}`}
                          className="block text-xs text-gray-500 hover:text-blue-600 py-1 px-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          {child.icon} {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Популярные товары</h2>
              <Link href="/catalog" className="text-blue-600 hover:text-blue-700">
                Все товары →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    image: product.image || '/placeholder.jpg'
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}