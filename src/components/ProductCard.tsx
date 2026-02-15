"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { Product } from "../app/lib/api";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    setIsInCart(true);
    setTimeout(() => setIsInCart(false), 2000);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const index = favorites.findIndex((id: string) => id === product.id);
    
    if (index > -1) {
      favorites.splice(index, 1);
      setIsInFavorites(false);
    } else {
      favorites.push(product.id);
      setIsInFavorites(true);
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-4">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-6xl">🔧</div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isInFavorites ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
            />
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm h-10">
            {product.name}
          </h3>
          
          <div className="flex items-end gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString("ru-RU")} ₸
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString("ru-RU")} ₸
              </span>
            )}
          </div>

          <button
            onClick={addToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              product.inStock
                ? isInCart
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                Добавлено
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}