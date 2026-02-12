'use client';

import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';

export default function PromoCode({ onApply, appliedDiscount = null, onRemove }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    // Имитация API-запроса
    setTimeout(() => {
      const mockPromos = {
        'AUTOPARTS10': { type: 'percent', value: 10, name: 'Скидка 10%' },
        'WELCOME500': { type: 'fixed', value: 500, name: 'Скидка 500₸' },
      };

      const promo = mockPromos[code.toUpperCase()];
      if (promo) {
        onApply({ ...promo, code: code.toUpperCase() });
        setCode('');
      } else {
        setError('Промокод не найден или истёк');
      }
      setIsLoading(false);
    }, 500);
  };

  if (appliedDiscount) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-green-800 text-sm">
              {appliedDiscount.name}
            </div>
            <div className="text-xs text-green-600">
              Промокод: {appliedDiscount.code}
            </div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-green-100 rounded transition-colors"
        >
          <X className="w-4 h-4 text-green-600" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Промокод"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm uppercase"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !code.trim()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '...' : 'Применить'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </form>
  );
}