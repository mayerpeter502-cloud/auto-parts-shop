'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    sku?: string;
  };
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const existingItem = items.find(item => item.id === product.id);
  const quantity = existingItem?.quantity || 0;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      sku: product.sku || '',
      quantity: 1
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isAdded ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        title={isAdded ? 'Добавлено!' : 'В корзину'}
      >
        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-green-500 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
      }`}
    >
      {isAdded ? (
        <>
          <Check size={18} />
          <span>Добавлено ({quantity + 1})</span>
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          <span>{quantity > 0 ? `В корзине (${quantity})` : 'В корзину'}</span>
        </>
      )}
    </button>
  );
}