import Image from 'next/image';
import Link from 'next/link';
import { Heart, Scale } from 'lucide-react';
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
  rating?: number;
  reviewsCount?: number;
}

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Изображение */}
      <Link href={`/product/${product.id}`} className="relative block aspect-square bg-gray-50">
        <Image
          src={product.image}
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
        
        {/* Кнопки избранного и сравнения */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={16} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition-colors">
            <Scale size={16} />
          </button>
        </div>
      </Link>

      {/* Контент */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors text-sm sm:text-base">
            {product.name}
          </h3>
        </Link>
        
        {/* Рейтинг */}
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

        {/* Цена */}
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

          {showAddToCart && product.inStock && (
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              productPrice={product.price}
              productImage={product.image}
            />
          )}
          
          {!product.inStock && (
            <button disabled className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </div>
  );
}