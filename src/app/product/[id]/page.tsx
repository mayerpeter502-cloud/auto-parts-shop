"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Check, ChevronRight, Star, Home, Repeat } from "lucide-react";
import Image from "next/image";
import { productsApi, getProducts, Product, getCategoryBySlug, getCategoryParents } from "../../lib/api";
import { useCart } from "../../../contexts/CartContext";
import { RelatedProducts } from "../../../components/RelatedProducts";
import { ProductReviews } from "../../../components/ProductReviews";
import { FrequentlyBoughtTogether } from "../../../components/FrequentlyBoughtTogether";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { QuickOrderModal } from "../../../components/QuickOrderModal";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [analogProducts, setAnalogProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);

  useEffect(() => {
    const products = getProducts();
    setAllProducts(products);
    if (params.id) {
      const found = productsApi.getById(params.id as string);
      setProduct(found || null);
      setLoading(false);
    }
  }, [params.id]);

  // Поиск аналогов по кросс-номерам
  useEffect(() => {
    if (product?.crossNumbers && product.crossNumbers.length > 0) {
      const analogs = allProducts.filter(p =>
        product.crossNumbers?.includes(p.sku || '') && p.id !== product.id
      );
      setAnalogProducts(analogs);
    } else {
      setAnalogProducts([]);
    }
  }, [product, allProducts]);

  // Получаем категорию и родителей для хлебных крошек
  const category = product ? getCategoryBySlug(product.category) : undefined;
  const categoryParents = product ? getCategoryParents(product.category) : [];

  const getCategoryName = (categorySlug: string) => {
    const names: Record<string, string> = {
      "Масла и жидкости": "Масла и жидкости",
      "Фильтры": "Фильтры",
      "Тормозная система": "Тормозная система",
      "Двигатель": "Двигатель",
      "Подвеска": "Подвеска",
      "Электрика": "Электрика",
      oil: "Масла и жидкости",
      filter: "Фильтры",
      brake: "Тормозная система",
      engine: "Двигатель",
      suspension: "Подвеска",
      electrical: "Электрика"
    };
    return names[categorySlug] || categorySlug;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Загрузка...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Товар не найден</p>
            <Link href="/catalog" className="text-blue-600 hover:underline">
              ← Вернуться в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inStock = product.stock !== undefined && product.stock > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* BREADCRUMBS — ИСПРАВЛЕНО: Полная иерархия категорий */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
  <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
    <Home className="w-4 h-4" />
    <span>Главная</span>
  </Link>
  <ChevronRight className="w-4 h-4 flex-shrink-0" />
  <Link href="/catalog" className="hover:text-blue-600 transition-colors">
    Каталог
  </Link>
            
            {/* Родительские категории (дерево) */}
            {categoryParents.map((parent) => (
              <React.Fragment key={parent.id}>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <Link 
                  href={`/catalog?category=${parent.slug}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {parent.name}
                </Link>
              </React.Fragment>
            ))}
            
            {/* Текущая категория */}
            {category && (
              <>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <Link 
                  href={`/catalog?category=${category.slug}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {category.name}
                </Link>
              </>
            )}
            
            {/* Если категория не найдена в дереве — показываем старое название */}
            {!category && product.category && (
              <>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <Link 
                  href={`/catalog?category=${encodeURIComponent(product.category)}`} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {getCategoryName(product.category)}
                </Link>
              </>
            )}
            
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </nav>

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
                    <span className="font-medium">{product.rating || 4.8}</span>
                  </div>
                  <span className="text-gray-400">({product.reviewsCount || 0} отзывов)</span>
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
                  <Check className={`w-5 h-5 ${inStock ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={inStock ? 'text-green-600' : 'text-red-600'}>
                    {inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                  {inStock && product.stock && (
                    <span className="text-sm text-gray-500">({product.stock} шт.)</span>
                  )}
                </div>

                {/* КНОПКИ — ИСПРАВЛЕНО */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image || '/placeholder.jpg',
                      sku: product.sku || product.id
                    })}
                    disabled={!inStock}
                    className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    В корзину
                  </button>
                  
                  <button
                    onClick={() => setQuickOrderOpen(true)}
                    disabled={!inStock}
                    className="flex-1 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Купить в 1 клик
                  </button>
                </div>

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

                {/* Кросс-номера (Аналоги) */}
                {(product.crossNumbers && product.crossNumbers.length > 0) || analogProducts.length > 0 ? (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Repeat className="w-5 h-5 text-blue-600" />
                      Аналоги товара
                    </h2>
                    
                    {/* Кросс-номера (SKU) */}
                    {product.crossNumbers && product.crossNumbers.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Кросс-номера:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.crossNumbers.map((cross, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-mono"
                            >
                              {cross}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Товары-аналоги */}
                    {analogProducts.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {analogProducts.map(analog => (
                          <Link 
                            key={analog.id}
                            href={`/product/${analog.id}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 relative overflow-hidden">
                              {analog.image && (
                                <Image
                                  src={analog.image}
                                  alt={analog.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate text-sm">{analog.name}</div>
                              <div className="text-xs text-gray-500">{analog.brand}</div>
                              <div className="text-blue-600 font-semibold text-sm">
                                {analog.price.toLocaleString()} ₸
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {analogProducts.length === 0 && product.crossNumbers && product.crossNumbers.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Аналоги с указанными кросс-номерами не найдены в каталоге
                      </div>
                    )}
                  </div>
                ) : null}
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
      
      {/* Модальное окно быстрого заказа */}
      <QuickOrderModal
        isOpen={quickOrderOpen}
        onClose={() => setQuickOrderOpen(false)}
        product={product}
      />
      
      <Footer />
    </div>
  );
}