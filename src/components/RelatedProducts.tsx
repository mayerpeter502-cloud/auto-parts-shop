"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "../app/lib/api";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const related = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">С этим покупают</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link href={`/product/${product.id}`} className="block">
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-3">
                <div className="text-4xl">🔧</div>
              </div>
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm">
                {product.name}
              </h3>
              <div className="text-lg font-bold text-gray-900 mb-3">
                {product.price.toLocaleString()} ₸
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}