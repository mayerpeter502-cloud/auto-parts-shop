'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  compact?: boolean;
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  productPrice, 
  productImage = '',
  compact = false 
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === productId);
    if (existingItem) {
      setIsAdded(true);
    }
    updateCartCount();
  }, [productId]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    setCartCount(count);
    // Обновляем счетчик в хедере через событие
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === productId);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsAdded(true);
    updateCartCount();

    // Показываем toast
    window.dispatchEvent(new CustomEvent('showToast', { 
      detail: { message: `${productName} добавлен в корзину`, type: 'success' } 
    }));

    // Сбрасываем состояние через 2 секунды
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (compact) {
    return (
      <button
        onClick={addToCart}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isAdded 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        title={isAdded ? 'Добавлено!' : 'В корзину'}
      >
        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
      </button>
    );
  }

  return (
    <button
      onClick={addToCart}
      disabled={isAdded}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-green-500 text-white cursor-default'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
      }`}
    >
      {isAdded ? (
        <>
          <Check size={18} />
          <span>Добавлено</span>
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          <span>В корзину</span>
        </>
      )}
    </button>
  );
}