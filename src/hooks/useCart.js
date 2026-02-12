'use client';

import { useState, useEffect, useCallback } from 'react';

const CART_KEY = 'autoparts_cart';

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка из localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing cart:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Добавить в корзину
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  // Изменить количество
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Удалить из корзины
  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Очистить корзину
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Подсчет общего количества
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Подсчет общей суммы
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cart,
    isLoaded,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  };
}