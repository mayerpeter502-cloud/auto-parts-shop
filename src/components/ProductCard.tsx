'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Scale, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  brand: string;
  category: string;
  inStock: boolean;
  sku?: string;
  rating?: number;
  reviewsCount?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isInCompare, setIsInCompare] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  // Проверка что приходит в product
  console.log('ProductCard product:', product.id, product.name, product.image?.substring(0, 50));

  useEffect(() => {
    const compare = JSON.parse(localStorage.getItem('compare') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsInCompare(compare.some((item: any) => item.id === product.id));
    setIsInFavorites(favorites.some((item: any) => item.id === product.id));
  }, [product.id]);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const compare = JSON.parse(localStorage.getItem('compare') || '[]');
    const existingIndex = compare.findIndex((item: any) => item.id === product.id);
    
    if (existingIndex > -1) {
      compare.splice(existingIndex, 1);
      setIsInCompare(false);
    } else {
      if (compare.length >= 4) {
        alert('Максимум 4 товара для сравнения');
        return;
      }
      compare.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand
      });
      setIsInCompare(true);
    }
    
    localStorage.setItem('compare', JSON.stringify(compare));
    window.dispatchEvent(new CustomEvent('compareUpdated'));
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const existingIndex = favorites.findIndex((item: any) => item.id === product.id);
    
    if (existingIndex > -1) {
      favorites.splice(existingIndex, 1);
      setIsInFavorites(false);
    } else {
      favorites.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand
      });
      setIsInFavorites(true);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
  };

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  // Если нет image, показываем заглушку
  const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <Link href={`/product/${product.id}`} className="relative block aspect-square bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">
              Нет в наличии
            </span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isInFavorites 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 hover:text-red-500'
            }`}
            title={isInFavorites ? 'В избранном' : 'В избранное'}
          >
            <Heart size={16} className={isInFavorites ? 'fill-current' : ''} />
          </button>
          <button
            onClick={toggleCompare}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isInCompare 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-400 hover:text-blue-500'
            }`}
            title={isInCompare ? 'В сравнении' : 'Сравнить'}
          >
            {isInCompare ? <Check size={16} /> : <Scale size={16} />}
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors text-sm sm:text-base">
            {product.name}
          </h3>
        </Link>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating!) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviewsCount || 0})</span>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {product.price.toLocaleString('ru-RU')} ₸
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₸
              </span>
            )}
          </div>

          {product.inStock ? (
            <AddToCartButton product={{...product, image: imageUrl}} />
          ) : (
            <button disabled className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </div>
  );
}