'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/app/lib/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'autoparts_cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Фильтруем corrupted данные
        const validItems = Array.isArray(parsed)
          ? parsed.filter((item: any) =>
              item &&
              item.product &&
              typeof item.product === 'object' &&
              item.product.id &&
              typeof item.product.price === 'number' &&
              typeof item.quantity === 'number'
            )
          : [];
        setItems(validItems);
      } catch (e) {
        console.error('Failed to parse cart', e);
        setItems([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (!product || !product.id) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.product?.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product?.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product?.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product?.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const qty = item.quantity || 0;
    return sum + price * qty;
  }, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    loaded,
  };
}
