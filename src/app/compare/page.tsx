"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, X, ShoppingCart } from "lucide-react";
import { getProducts, Product } from "../lib/api";

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  useEffect(() => {
    const compareIds = JSON.parse(localStorage.getItem("compare") || "[]");
    const allProducts = getProducts();
    const compareProducts = allProducts.filter(p => compareIds.includes(p.id));
    setCompareItems(compareProducts);
  }, []);

  const removeFromCompare = (productId: string) => {
    const compareIds = JSON.parse(localStorage.getItem("compare") || "[]");
    const updated = compareIds.filter((id: string) => id !== productId);
    localStorage.setItem("compare", JSON.stringify(updated));
    setCompareItems(compareItems.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Нет товаров для сравнения</h1>
          <p className="text-gray-500 mb-6">Добавьте товары для сравнения характеристик</p>
          <Link
            href="/catalog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Сравнение товаров ({compareItems.length})</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="p-4 text-left border-b">Характеристика</th>
                {compareItems.map((product) => (
                  <th key={product.id} className="p-4 text-center border-b min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                        <div className="text-4xl">🔧</div>
                      </div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-lg font-bold text-blue-600 mt-1">
                        {product.price.toLocaleString()} ₸
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium">Бренд</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center">
                    {product.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Категория</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center">
                    {product.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Наличие</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center">
                    <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                      {product.inStock ? "В наличии" : "Нет в наличии"}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium">Действия</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center gap-2 mx-auto"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      В корзину
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}