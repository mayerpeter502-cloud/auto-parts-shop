'use client';

import { useState, useEffect, useRef } from 'react';

const mockParts = [
  { id: 1, name: "Тормозные колодки Brembo", number: "P85020", brand: "Brembo", price: 2450, icon: "🛑" },
  { id: 2, name: "Масло моторное Castrol 5W-30", number: "CAST5W30", brand: "Castrol", price: 890, icon: "🛢" },
  { id: 3, name: "Аккумулятор Varta 60Ah", number: "VARTA60", brand: "Varta", price: 8900, icon: "⚡" },
  { id: 4, name: "Воздушный фильтр Mann", number: "C30130", brand: "Mann", price: 450, icon: "🌪" },
  { id: 5, name: "Свечи зажигания NGK", number: "BKR6E", brand: "NGK", price: 320, icon: "⚡" },
  { id: 6, name: "Амортизатор KYB Excel-G", number: "341322", brand: "KYB", price: 3400, icon: "🌀" },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    setTimeout(() => {
      const filtered = mockParts.filter(part => 
        part.name.toLowerCase().includes(value.toLowerCase()) ||
        part.number.toLowerCase().includes(value.toLowerCase()) ||
        part.brand.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  };

  const addToCart = (item) => {
    setToast({ name: item.name, type: 'cart' });
    setQuery('');
    setIsOpen(false);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} className="bg-blue-100 text-blue-700 px-0.5 rounded">{part}</span> : part
    );
  };

  return (
    <>
      <div ref={wrapperRef} className="relative w-full max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Поиск по номеру или названию..."
          className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 md:text-lg"
        />
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 md:mt-3">
            {loading ? (
              <div className="p-4 text-gray-500">Поиск...</div>
            ) : results.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <div className="text-3xl mb-2">🔍</div>
                <div>Ничего не найдено</div>
              </div>
            ) : (
              <>
                <div className="px-4 py-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Найдено {results.length} товаров
                </div>
                {results.map(item => (
                  <div
                    key={item.id}
                    className="p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0 md:gap-4"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 md:w-14 md:h-14">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {highlightText(item.name, query)}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {item.brand} • {item.number}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-blue-600">
                        {item.price.toLocaleString()} ₽
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors md:mt-2 md:px-4"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 bg-green-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-in">
          <span className="text-xl">✓</span>
          <div className="flex-1">
            <div className="font-semibold">Добавлено в корзину</div>
            <div className="text-sm opacity-90 truncate">{toast.name}</div>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-xl opacity-80 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}