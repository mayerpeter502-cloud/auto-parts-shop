"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Check, ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { productsApi } from "../../lib/api";
import { useCart } from "../../../contexts/CartContext";
import { RelatedProducts } from "../../../components/RelatedProducts";
import { ProductReviews } from "../../../components/ProductReviews";
import { FrequentlyBoughtTogether } from "../../../components/FrequentlyBoughtTogether";
import { getProducts, Product } from "../../lib/api";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const products = getProducts();
    setAllProducts(products);
    if (params.id) {
      const found = productsApi.getById(params.id as string);
      setProduct(found || null);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Загрузка...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Link href="/catalog" className="text-blue-600 hover:underline">
            ← Вернуться в каталог
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/catalog" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-4 h-4" />
              Назад в каталог
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Image */}
              <div className="bg-gray-100 rounded-lg flex items-center justify-center h-64 md:h-96 relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="text-8xl">📦</div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">4.8</span>
                  </div>
                  <span className="text-gray-400">(12 отзывов)</span>
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
                  <Check className={`w-5 h-5 ${product.stock && product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock && product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>

                <button
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || '/placeholder.jpg',
                    sku: product.sku || product.id
                  })}
                  disabled={!product.stock || product.stock === 0}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </button>

                {/* Description */}
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-lg font-semibold mb-4">Описание</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description || "Описание отсутствует"}</p>
                </div>

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
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
                )}

                {/* Compatibility */}
                {product.compatibility && product.compatibility.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-lg font-semibold mb-4">Совместимость</h2>
                    <div className="space-y-2">
                      {product.compatibility.map((compat, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium">{compat.brand} {compat.model}</div>
                          <div className="text-sm text-gray-500">
                            {compat.yearFrom}-{compat.yearTo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Frequently Bought Together */}
          <FrequentlyBoughtTogether mainProduct={product} />

          {/* Reviews */}
          <div className="mb-8">
            <ProductReviews productId={product.id} />
          </div>

          {/* Related Products */}
          <RelatedProducts products={allProducts} currentProductId={product.id} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}