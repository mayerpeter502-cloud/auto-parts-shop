import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    author: 'Азамат К.',
    rating: 5,
    date: '2024-01-15',
    text: 'Отличное масло, двигатель работает тише. Проверил по коду - оригинал.',
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    author: 'Дмитрий С.',
    rating: 5,
    date: '2024-01-10',
    text: 'Второй раз беру, нареканий нет. Доставка быстрая.',
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    author: 'Елена М.',
    rating: 4,
    date: '2023-12-28',
    text: 'Хорошее масло, но упаковка была немного помята.',
    helpful: 3,
    verified: false
  }
];

const specifications = [
  { label: 'Вязкость', value: '5W-40' },
  { label: 'Объем', value: '4 литра' },
  { label: 'Тип', value: 'Синтетическое' },
  { label: 'Спецификация', value: 'API SN/CF, ACEA A3/B4' },
  { label: 'Производитель', value: 'Германия' },
  { label: 'Срок годности', value: '5 лет' }
];

const compatibility = [
  { brand: 'Toyota', models: ['Camry', 'RAV4', 'Corolla'], years: '2010-2024' },
  { brand: 'Kia', models: ['Optima', 'Sportage', 'Sorento'], years: '2012-2024' },
  { brand: 'Hyundai', models: ['Sonata', 'Tucson', 'Santa Fe'], years: '2011-2024' },
  { brand: 'BMW', models: ['3 Series', '5 Series', 'X3'], years: '2008-2020' }
];

export const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());

  const handleHelpful = (reviewId) => {
    setHelpfulReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'description', label: 'Описание' },
          { id: 'specs', label: 'Характеристики' },
          { id: 'compatibility', label: 'Совместимость' },
          { id: 'reviews', label: `Отзывы (${reviews.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors relative ${
              activeTab === tab.id 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-4">О товаре</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {product?.description || 'Премиальное моторное масло с технологией синтеза. Обеспечивает максимальную защиту двигателя в экстремальных условиях эксплуатации. Подходит для современных бензиновых и дизельных двигателей с турбонаддувом и без.'}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Защита от износа при холодном запуске</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Экономия топлива до 2%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Увеличенный интервал замены - до 15,000 км</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'specs' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compatibility' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Подходит для автомобилей</h3>
            <div className="space-y-4">
              {compatibility.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{item.brand}</span>
                    <span className="text-sm text-gray-500">{item.years}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.models.map((model, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Отзывы покупателей</h3>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(5)}
                  <span className="text-sm text-gray-500">4.8 из 5</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Написать отзыв
              </button>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Покупка подтверждена
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{review.text}</p>
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      helpfulReviews.has(review.id) 
                        ? 'text-blue-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${helpfulReviews.has(review.id) ? 'fill-current' : ''}`} />
                    <span>Полезно ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};