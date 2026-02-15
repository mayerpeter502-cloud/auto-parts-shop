import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: '/banners/oil-sale.jpg',
    title: 'Скидки на моторное масло',
    subtitle: 'До 40% на топовые бренды',
    cta: 'Смотреть акцию',
    link: '/catalog/oil',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 2,
    image: '/banners/brakes.jpg',
    title: 'Тормозные колодки',
    subtitle: 'Бесплатная замена при покупке',
    cta: 'Подобрать',
    link: '/catalog/brakes',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 3,
    image: '/banners/filters.jpg',
    title: 'Комплект ТО по выгодной цене',
    subtitle: 'Масло + фильтры = скидка 20%',
    cta: 'Собрать комплект',
    link: '/catalog/service-kit',
    color: 'from-green-600 to-green-800'
  },
  {
    id: 4,
    image: '/banners/vin-search.jpg',
    title: 'Подбор по VIN-коду',
    subtitle: 'Точный подбор запчастей за 10 секунд',
    cta: 'Проверить',
    link: '/vin-search',
    color: 'from-purple-600 to-purple-800'
  }
];

export const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % banners.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-out ${
            index === current ? 'translate-x-0' : 
            index < current ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          
          <div className="relative h-full flex items-center px-6 md:px-12 lg:px-20">
            <div className="max-w-xl text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4 backdrop-blur-sm">
                Акция
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {banner.subtitle}
              </p>
              <a
                href={banner.link}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {banner.cta}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};