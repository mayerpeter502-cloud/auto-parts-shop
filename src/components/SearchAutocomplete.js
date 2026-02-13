'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

const mockSuggestions = [
  { id: 1, name: 'Масло моторное Castrol 5W-30', price: 12500 },
  { id: 2, name: 'Фильтр масляный Bosch', price: 2800 },
  { id: 3, name: 'Тормозные колодки Brembo', price: 18500 },
  { id: 4, name: 'Аккумулятор Varta 60Ah', price: 45000 },
  { id: 5, name: 'Свечи зажигания NGK', price: 3200 },
];

export default function SearchAutocomplete({ onClose }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Скрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = () => {
    setShowSuggestions(false);
    setQuery('');
    onClose?.();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder="Поиск по артикулу, названию..."
          className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Подсказки */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/product?id=${item.id}`}
              onClick={handleSelect}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <span className="text-gray-900">{item.name}</span>
              <span className="text-blue-600 font-medium">{item.price.toLocaleString()} ₸</span>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={handleSelect}
            className="block px-4 py-3 text-center text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Все результаты →
          </Link>
        </div>
      )}
    </div>
  );
}