'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const decrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Уменьшить количество"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      
      <span className="w-12 text-center font-medium text-gray-900">
        {quantity}
      </span>
      
      <button
        onClick={increase}
        disabled={quantity >= max}
        className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Увеличить количество"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}