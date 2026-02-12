'use client';

import { useState, useEffect } from 'react';
import { GitCompare, Check } from 'lucide-react';

export default function CompareButton({ product }) {
  const [inCompare, setInCompare] = useState(false);

  useEffect(() => {
    const compareList = JSON.parse(localStorage.getItem('autoparts_compare') || '[]');
    setInCompare(compareList.some(item => item.id === product.id));
  }, [product.id]);

  const toggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const compareList = JSON.parse(localStorage.getItem('autoparts_compare') || '[]');
    
    if (inCompare) {
      const updated = compareList.filter(item => item.id !== product.id);
      localStorage.setItem('autoparts_compare', JSON.stringify(updated));
      setInCompare(false);
    } else {
      if (compareList.length >= 4) {
        alert('Можно сравнивать не более 4 товаров');
        return;
      }
      compareList.push(product);
      localStorage.setItem('autoparts_compare', JSON.stringify(compareList));
      setInCompare(true);
    }
    
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <button
      onClick={toggleCompare}
      className={`p-2 rounded-lg transition-colors ${
        inCompare 
          ? 'bg-blue-100 text-blue-600' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={inCompare ? 'Убрать из сравнения' : 'Добавить к сравнению'}
    >
      {inCompare ? <Check className="w-5 h-5" /> : <GitCompare className="w-5 h-5" />}
    </button>
  );
}