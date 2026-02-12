'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ComparePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const compareList = JSON.parse(localStorage.getItem('autoparts_compare') || '[]');
    setProducts(compareList);
    setLoading(false);
  };

  const removeProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem('autoparts_compare', JSON.stringify(updated));
    setProducts(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const clearAll = () => {
    localStorage.setItem('autoparts_compare', '[]');
    setProducts([]);
    window.dispatchEvent(new Event('storage'));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Товар добавлен в корзину');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'Сравнение товаров' }]} />
          
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Сравнение товаров</h1>
            <p className="text-gray-500 mb-6">Добавьте товары для сравнения из каталога</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Перейти в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Характеристики для сравнения
  const specs = [
    { key: 'price', label: 'Цена' },
    { key: 'brand', label: 'Бренд' },
    { key: 'sku', label: 'Артикул' },
    { key: 'warranty', label: 'Гарантия' },
    { key: 'country', label: 'Страна производства' },
    { key: 'compatibility', label: 'Совместимость' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Сравнение товаров' }]} />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Сравнение товаров
            <span className="text-lg font-normal text-gray-500 ml-2">({products.length})</span>
          </h1>
          
          <button
            onClick={clearAll}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Очистить список
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left font-medium text-gray-500 w-48 bg-gray-50">Характеристика</th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Нет фото
                            </div>
                          )}
                        </div>
                        
                        <Link href={`/product?id=${product.id}`} className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
                          {product.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, idx) => (
                  <tr key={spec.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium text-gray-700">{spec.label}</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        {spec.key === 'price' ? (
                          <span className="text-lg font-bold text-blue-600">
                            {product[spec.key]?.toLocaleString()} ₸
                          </span>
                        ) : (
                          <span className="text-gray-600">
                            {product[spec.key] || '—'}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="p-4"></td>
                  {products.map(product => (
                    <td key={product.id} className="p-4">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Нет фото
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Link href={`/product?id=${product.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {product.name}
                  </Link>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    {product.price?.toLocaleString()} ₸
                  </p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                {specs.slice(1).map(spec => (
                  <div key={spec.key} className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="text-gray-900">{product[spec.key] || '—'}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </button>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}