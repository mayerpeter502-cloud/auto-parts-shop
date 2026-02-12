'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GitCompare, X } from 'lucide-react';

export default function CompareWidget() {
  const [compareList, setCompareList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateList = () => {
      const list = JSON.parse(localStorage.getItem('autoparts_compare') || '[]');
      setCompareList(list);
    };

    updateList();
    window.addEventListener('storage', updateList);
    return () => window.removeEventListener('storage', updateList);
  }, []);

  const removeItem = (id) => {
    const updated = compareList.filter(item => item.id !== id);
    localStorage.setItem('autoparts_compare', JSON.stringify(updated));
    setCompareList(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const clearAll = () => {
    localStorage.setItem('autoparts_compare', '[]');
    setCompareList([]);
    window.dispatchEvent(new Event('storage'));
  };

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <GitCompare className="w-6 h-6" />
        <span className="font-bold">{compareList.length}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Сравнение ({compareList.length})</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {compareList.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm truncate flex-1">{item.name}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-2">
            <Link
              href="/compare"
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Сравнить
            </Link>
            <button
              onClick={clearAll}
              className="block w-full text-center text-gray-500 hover:text-gray-700 text-sm"
            >
              Очистить список
            </button>
          </div>
        </div>
      )}
    </div>
  );
}