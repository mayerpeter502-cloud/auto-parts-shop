import Link from "next/link";
import { Metadata } from "next";
import { Search, ChevronLeft, ChevronRight, Car } from "lucide-react";
import { getProducts, Product } from "./lib/api";

export const metadata: Metadata = {
  title: "AutoParts.kz - Интернет-магазин автозапчастей",
  description: "Широкий выбор автозапчастей с доставкой по Казахстану",
};

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
  const products = getProducts().slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gray-900 h-64 md:h-96 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === 0 ? "opacity-100" : "opacity-0"} ${banner.color} flex items-center justify-center`}
          >
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
              <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
              <Link href="/catalog" className="inline-block mt-6 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100">
                Перейти в каталог
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center text-3xl bg-white rounded-full shadow-sm">
                  {categoryIcons[category]}
                </div>
                <span className="text-sm text-center text-gray-700 font-medium">{category}</span>
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
            <Link href="/catalog" className="text-blue-600 hover:text-blue-700">Все товары →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Link href={`/product/${product.id}`}>
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
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString()} ₸
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