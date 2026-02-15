"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Check, ChevronLeft, Star } from "lucide-react";
import { productsApi } from "../../lib/api";
import { useCart } from "../../../contexts/CartContext";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (params.id) {
      const found = productsApi.getById(params.id as string);
      setProduct(found);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Link href="/catalog" className="text-blue-600 hover:underline">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/catalog" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
            <ChevronLeft className="w-4 h-4" />
            Назад в каталог
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image */}
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-64 md:h-96">
              <div className="text-8xl">📦</div>
            </div>

            {/* Info */}
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} отзывов)</span>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString()} ₸
                </div>
                {product.oldPrice && (
                  <div className="text-lg text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} ₸
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Check className={`w-5 h-5 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `В наличии (${product.stock} шт)` : 'Нет в наличии'}
                </span>
              </div>

              <button
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  sku: product.sku
                })}
                disabled={product.stock === 0}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                В корзину
              </button>

              {/* Description */}
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-lg font-semibold mb-4">Описание</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-lg font-semibold mb-4">Характеристики</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              {product.compatibility && product.compatibility.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-lg font-semibold mb-4">Совместимость</h2>
                  <div className="space-y-2">
                    {product.compatibility.map((compat: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium">{compat.brand} {compat.model}</div>
                        <div className="text-sm text-gray-500">
                          {compat.yearFrom}-{compat.yearTo} {compat.engine && `• ${compat.engine}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}