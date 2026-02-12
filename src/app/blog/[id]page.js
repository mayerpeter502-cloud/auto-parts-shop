'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ChevronLeft, Share2, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import LazyImage from '@/components/LazyImage';
import ProductCard from '@/components/ProductCard';

// Моковые данные статей
const articlesData = {
  1: {
    id: 1,
    title: 'Как правильно выбрать моторное масло для вашего автомобиля',
    content: `
      <p>Выбор моторного масла — один из важнейших аспектов ухода за автомобилем. От правильного подбора зависит долговечность двигателя и его производительность.</p>
      
      <h2>Классификация масел по вязкости</h2>
      <p>Обозначение вязкости масла состоит из двух чисел, разделенных буквой W (winter). Первое число показывает вязкость при низких температурах, второе — при рабочей температуре двигателя.</p>
      
      <h2>Типы моторных масел</h2>
      <ul>
        <li><strong>Минеральные</strong> — базовый вариант, требуют частой замены</li>
        <li><strong>Полусинтетические</strong> — золотая середина по цене и качеству</li>
        <li><strong>Синтетические</strong> — лучшая защита, длительный интервал замены</li>
      </ul>
      
      <h2>Допуски производителей</h2>
      <p>Каждый автопроизводитель устанавливает свои требования к маслам. Например, VW требует допуск 502.00/505.00, BMW — LL-01, Mercedes — MB 229.5.</p>
    `,
    image: '/blog/oil-guide.jpg',
    category: 'Обслуживание',
    author: 'Алексей Петров',
    date: '12 февраля 2025',
    readTime: '8 минут',
    relatedProducts: [
      { id: 1, name: 'Castrol EDGE 5W-30 4L', price: 12500, brand: 'Castrol', rating: 4.9, reviews: 342, inStock: true, image: '/products/oil1.jpg', sku: 'CAST-5W30-4L' },
      { id: 2, name: 'Mobil 1 ESP 5W-30 4L', price: 15800, brand: 'Mobil', rating: 4.8, reviews: 256, inStock: true, image: '/products/oil2.jpg', sku: 'MOB-ESP-5W30' },
    ]
  }
};

export default function BlogArticlePage() {
  const params = useParams();
  const article = articlesData[params.id] || articlesData[1];

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Блог', href: '/blog' },
          { label: article.title, href: `/blog/${article.id}` }
        ]} />
        
        {/* Кнопка назад */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад к статьям
        </Link>

        {/* Заголовок */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-96">
            <LazyImage
              src={article.image}
              alt={article.title}
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Контент */}
          <div className="p-6 md:p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Действия */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Поделиться
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4" />
                В избранное
              </button>
            </div>
          </div>
        </div>

        {/* Рекомендуемые товары */}
        {article.relatedProducts && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Рекомендуемые товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}