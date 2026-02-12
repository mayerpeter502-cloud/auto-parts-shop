'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ToastProvider';

const CART_KEY = 'autoparts_cart';

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToast } = useToast();

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

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        addToast(`Количество обновлено: ${existing.name}`, 'success');
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      addToast(`Добавлено в корзину: ${product.name}`, 'success');
      return [...prev, { ...product, quantity }];
    });
  }, [addToast]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);
      if (item) addToast('Товар удален из корзины', 'info');
      return prev.filter(item => item.id !== productId);
    });
  }, [addToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    addToast('Корзина очищена', 'info');
  }, [addToast]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
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