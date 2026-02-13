'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  X, 
  ChevronRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Car
} from 'lucide-react';
import { Product, productApi } from '@/app/lib/api';
import { useCart } from '@/app/hooks/useCart';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = () => {
      const id = params.id as string;
      const found = productApi.getById(id);
      if (found) {
        setProduct(found);
      }
      setLoading(false);
    };
    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert('Товар добавлен в корзину');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
        <Link href="/catalog" className="text-blue-600 hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const mockImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const compatibility = [
    { brand: 'Toyota', model: 'Camry', year: '2018-2023', engine: '2.5L' },
    { brand: 'Toyota', model: 'RAV4', year: '2019-2024', engine: '2.5L' },
    { brand: 'Lexus', model: 'ES 250', year: '2019-2023', engine: '2.5L' },
  ];

  const reviews = [
    { id: 1, name: 'Александр', rating: 5, date: '15.01.2026', text: 'Отличное качество, подошло идеально!' },
    { id: 2, name: 'Мария', rating: 4, date: '10.01.2026', text: 'Хороший товар, быстрая доставка.' },
  ];

  const relatedProducts = productApi.getAll().slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Главная</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/catalog" className="hover:text-blue-600">Каталог</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Основная информация */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Галерея */}
            <div>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={mockImages[activeImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {mockImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                      activeImage === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Информация */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-500">{product.brand}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(12 отзывов)</span>
                </div>
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" /> В наличии
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} ₸</span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₸</span>
                )}
              </div>

              {/* Краткие характеристики */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Характеристики</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Артикул:</span>
                  <span>ART-{product.id.padStart(6, '0')}</span>
                  <span className="text-gray-500">Бренд:</span>
                  <span>{product.brand}</span>
                  <span className="text-gray-500">Категория:</span>
                  <span>{product.category}</span>
                  <span className="text-gray-500">Страна:</span>
                  <span>Германия</span>
                </div>
              </div>

              {/* Количество и кнопки */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100"
                  >-</button>
                  <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100"
                  >+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700"
                >
                  Купить сейчас
                </button>
              </div>

              {/* Преимущества */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Доставка 1-3 дня
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Гарантия 12 месяцев
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  Возврат 14 дней
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  Оригинал 100%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Таблица совместимости */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            Подходит для автомобилей
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium">Марка</th>
                  <th className="text-left p-3 font-medium">Модель</th>
                  <th className="text-left p-3 font-medium">Год</th>
                  <th className="text-left p-3 font-medium">Двигатель</th>
                  <th className="text-left p-3 font-medium">Совместимость</th>
                </tr>
              </thead>
              <tbody>
                {compatibility.map((car, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{car.brand}</td>
                    <td className="p-3">{car.model}</td>
                    <td className="p-3">{car.year}</td>
                    <td className="p-3">{car.engine}</td>
                    <td className="p-3">
                      <span className="text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Подтверждено
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Описание и отзывы */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-bold mb-4">Описание</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Высококачественный автомобильный компонент от проверенного производителя. '
                  + 'Изготовлен из прочных материалов, обеспечивает долгий срок службы и надежную работу. '
                  + 'Прошел все необходимые сертификации и тестирования. Рекомендуется для профессионального '
                  + 'и любительского использования.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-bold mb-4">Отзывы покупателей</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* С этим покупают */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold mb-4">С этим покупают</h2>
            <div className="space-y-4">
              {relatedProducts.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/product/${item.id}`}
                  className="flex gap-3 group"
                >
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium group-hover:text-blue-600 line-clamp-2">{item.name}</h4>
                    <p className="text-blue-600 font-bold mt-1">{item.price.toLocaleString()} ₸</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}