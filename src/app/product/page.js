'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CompareButton from '@/components/CompareButton';
import { Heart, ShoppingCart, Check, Truck, Shield, ChevronRight } from 'lucide-react';

const mockProduct = {
  id: 1,
  name: 'Моторное масло Mobil 1 5W-30 4L',
  price: 24500,
  oldPrice: 28900,
  brand: 'Mobil',
  sku: 'MOB-5W30-4L',
  inStock: true,
  warranty: '2 года',
  country: 'США',
  description: 'Синтетическое моторное масло премиум-класса. Обеспечивает исключительную защиту двигателя в любых условиях эксплуатации.',
  compatibility: ['Toyota Camry', 'Honda Accord', 'BMW X5', 'Mercedes C-Class'],
  specs: {
    'Вязкость': '5W-30',
    'Объем': '4 литра',
    'Тип': 'Синтетическое',
    'Допуск': 'API SN/CF',
  }
};

const relatedProducts = [
  { id: 2, name: 'Фильтр масляный Mann-Filter', price: 3200, brand: 'Mann-Filter' },
  { id: 3, name: 'Масло Castrol EDGE 5W-40', price: 26800, brand: 'Castrol' },
  { id: 4, name: 'Свечи зажигания NGK', price: 4800, brand: 'NGK' },
];

export default function ProductPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(mockProduct);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    setIsFavorite(saved.some(item => item.id === product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('autoparts_favorites') || '[]');
    const exists = saved.find(item => item.id === product.id);
    
    let updated;
    if (exists) {
      updated = saved.filter(item => item.id !== product.id);
      setIsFavorite(false);
    } else {
      updated = [...saved, product];
      setIsFavorite(true);
    }
    
    localStorage.setItem('autoparts_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert(`Добавлено ${quantity} шт. в корзину`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'Каталог', href: '/catalog' },
          { label: product.name }
        ]} />

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Нет фото
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex gap-2">
                  <CompareButton product={product} />
                  <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-lg border ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <p className="text-gray-500 mb-4">Артикул: {product.sku} | Бренд: {product.brand}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} ₸</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₸</span>
                )}
              </div>

              {product.inStock ? (
                <p className="text-green-600 flex items-center gap-2 mb-6">
                  <Check className="w-5 h-5" />
                  В наличии
                </p>
              ) : (
                <p className="text-orange-600 mb-6">Под заказ</p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >-</button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >+</button>
                </div>
                
                <button
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Доставка 1-2 дня
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  Гарантия {product.warranty}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b flex gap-6 px-6">
            {['description', 'specs', 'compatibility'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'description' && 'Описание'}
                {tab === 'specs' && 'Характеристики'}
                {tab === 'compatibility' && 'Совместимость'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {activeTab === 'specs' && (
              <table className="w-full max-w-2xl">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 text-gray-500 w-1/3">{key}</td>
                      <td className="py-3 font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'compatibility' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.compatibility.map(car => (
                  <div key={car} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-500" />
                    {car}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">С этим покупают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <Link key={item.id} href={`/product?id=${item.id}`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                  Нет фото
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
                <p className="text-lg font-bold text-gray-900">{item.price.toLocaleString()} ₸</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}