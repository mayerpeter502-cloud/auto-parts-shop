'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

const CART_KEY = 'autoparts_cart';

export function useOptimizedCart() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка из localStorage только на клиенте
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Сохранение с дебаунсом
  useEffect(() => {
    if (!isLoaded) return;
    
    const timeoutId = setTimeout(() => {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [cart, isLoaded]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Мемоизированные вычисления
  const totals = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, [cart]);

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...totals
  };
}