'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import CompareButton from './CompareButton';

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Нет фото
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              Новинка
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(product);
            }}
            className={`p-2 rounded-lg shadow-md transition-colors ${
              isFavorite ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <CompareButton product={product} />
        </div>
      </div>

      <div className="p-4">
        {product.sku && (
          <p className="text-xs text-gray-500 mb-1">Артикул: {product.sku}</p>
        )}
        
        <Link href={`/product?id=${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {product.price?.toLocaleString()} ₸
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString()} ₸
            </span>
          )}
        </div>

        {product.inStock ? (
          <p className="text-xs text-green-600 mb-3 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            В наличии
          </p>
        ) : (
          <p className="text-xs text-orange-600 mb-3">Под заказ</p>
        )}

        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          В корзину
        </button>
      </div>
    </div>
  );
}