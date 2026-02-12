'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import LazyImage from '@/components/LazyImage';

const articles = [
  {
    id: 1,
    title: 'Как правильно выбрать моторное масло для вашего автомобиля',
    excerpt: 'Полное руководство по выбору масла: вязкость, допуски, типы двигателей и частые ошибки.',
    image: '/blog/oil-guide.jpg',
    category: 'Обслуживание',
    author: 'Алексей Петров',
    date: '12 фев 2025',
    readTime: '8 мин',
    featured: true
  },
  {
    id: 2,
    title: 'ТО-1, ТО-2, ТО-3: что входит в плановое обслуживание',
    excerpt: 'Разбираем регламент технического обслуживания для популярных марок авто.',
    image: '/blog/to-guide.jpg',
    category: 'Ремонт',
    author: 'Иван Сидоров',
    date: '10 фев 2025',
    readTime: '6 мин',
    featured: false
  },
  {
    id: 3,
    title: '5 признаков износа тормозных колодок',
    excerpt: 'Когда пора менять колодки и как не попасть на дорогой ремонт суппортов.',
    image: '/blog/brakes.jpg',
    category: 'Безопасность',
    author: 'Мария Ким',
    date: '8 фев 2025',
    readTime: '5 мин',
    featured: false
  },
  {
    id: 4,
    title: 'Зимний уход за аккумулятором: советы профессионалов',
    excerpt: 'Как продлить жизнь АКБ в морозы и что делать, если машина не заводится.',
    image: '/blog/battery.jpg',
    category: 'Советы',
    author: 'Алексей Петров',
    date: '5 фев 2025',
    readTime: '4 мин',
    featured: false
  },
  {
    id: 5,
    title: 'Оригинал vs аналог: стоит ли переплачивать',
    excerpt: 'Сравниваем качество оригинальных запчастей и проверенных аналогов.',
    image: '/blog/original.jpg',
    category: 'Выбор',
    author: 'Иван Сидоров',
    date: '3 фев 2025',
    readTime: '7 мин',
    featured: false
  },
  {
    id: 6,
    title: 'Как проверить VIN автомобиля перед покупкой',
    excerpt: 'Пошаговая инструкция по проверке истории авто по VIN-номеру.',
    image: '/blog/vin-check.jpg',
    category: 'Покупка',
    author: 'Мария Ким',
    date: '1 фев 2025',
    readTime: '6 мин',
    featured: false
  },
];

const categories = ['Все', 'Обслуживание', 'Ремонт', 'Безопасность', 'Советы', 'Выбор', 'Покупка'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredArticles = selectedCategory === 'Все' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const featuredArticle = articles.find(a => a.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }]} />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Блог о ремонте и обслуживании</h1>

        {/* Главная статья */}
        {featuredArticle && selectedCategory === 'Все' && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <LazyImage
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="absolute inset-0"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                  {featuredArticle.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${featuredArticle.id}`}>{featuredArticle.title}</Link>
                </h2>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <Link 
                  href={`/blog/${featuredArticle.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                >
                  Читать статью <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.filter(a => !a.featured || selectedCategory !== 'Все').map(article => (
            <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <LazyImage
                  src={article.image}
                  alt={article.title}
                  fill
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-gray-800 text-xs font-medium rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}