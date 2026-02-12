'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { mockApi } from '@/services/api';

export default function SearchAutocomplete({ onClose }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Загрузка истории поиска
  useEffect(() => {
    const saved = localStorage.getItem('autoparts_search_history');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    inputRef.current?.focus();
  }, []);

  // Поиск с дебаунсом
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          // Используем мок API для демо
          const results = await mockApi.products.search(query);
          setSuggestions(results.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Сохранение в историю
  const saveToHistory = useCallback((searchQuery) => {
    const newHistory = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newHistory);
    localStorage.setItem('autoparts_search_history', JSON.stringify(newHistory));
  }, [recentSearches]);

  // Обработка выбора
  const handleSelect = (product) => {
    saveToHistory(product.name);
    window.location.href = `/product?id=${product.id}`;
    onClose?.();
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveToHistory(query.trim());
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      onClose?.();
    }
  };

  // Очистка истории
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('autoparts_search_history');
  };

  // Клик вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, артикулу или бренду..."
            className="w-full pl-12 pr-12 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
          )}
        </div>
      </form>

      {/* Выпадающий список */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                Товары
              </div>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand} • {product.category}</div>
                  </div>
                  <div className="font-bold text-blue-600">
                    {product.price.toLocaleString()} ₸
                  </div>
                </button>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => saveToHistory(query)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Все результаты поиска
                </Link>
              </div>
            </div>
          ) : query.length >= 2 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              Ничего не найдено
            </div>
          ) : null}
        </div>
      )}

      {/* История поиска */}
      {!showSuggestions && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
              <Clock className="w-4 h-4" />
              Недавний поиск
            </div>
            <button
              onClick={clearHistory}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Очистить
            </button>
          </div>
          {recentSearches.map((search, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(search);
                window.location.href = `/search?q=${encodeURIComponent(search)}`;
                onClose?.();
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{search}</span>
            </button>
          ))}
        </div>
      )}

      {/* Популярные запросы */}
      {!showSuggestions && recentSearches.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Популярное
          </div>
          {['Моторное масло', 'Тормозные колодки', 'Воздушный фильтр', 'Свечи зажигания'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                window.location.href = `/search?q=${encodeURIComponent(term)}`;
                onClose?.();
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{term}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}