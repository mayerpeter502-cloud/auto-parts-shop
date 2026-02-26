"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateProduct, getProductById } from "../app/lib/api";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  checkout: (orderData: OrderData) => Promise<boolean>;
}

interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
      // ← ДОБАВЛЕНО: Событие для обновления счетчика в Header
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    }
  }, [items, isLoaded]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async (orderData: OrderData): Promise<boolean> => {
    try {
      items.forEach(cartItem => {
        const product = getProductById(cartItem.id);
        if (product && product.stock !== undefined) {
          const newStock = Math.max(0, product.stock - cartItem.quantity);
          updateProduct(product.id, { stock: newStock });
        }
      });

      clearCart();
      return true;
    } catch (error) {
      console.error('Checkout error:', error);
      return false;
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoaded) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}