// src/app/lib/api.ts
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  brand: string;
  category: string;
  compatibility: {
    makes: string[];
    models: string[];
    years: string[];
  };
  images: string[];
  specifications: {
    [key: string]: string;
  };
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
  vendorCode: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}

function initializeStorage() {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify([]));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
}

export const productApi = {
  getAll: (): Product[] => {
    initializeStorage();
    return JSON.parse(localStorage.getItem('products') || '[]');
  },
  
  getById: (id: string): Product | undefined => {
    return productApi.getAll().find(p => p.id === id);
  },
  
  create: (productData: Omit<Product, 'id'>): Product => {
    const newProduct = { ...productData, id: uuidv4() };
    const products = productApi.getAll();
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
  },
  
  update: (id: string, productData: Partial<Product>): Product => {
    const products = productApi.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...productData };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  },
  
  delete: (id: string): void => {
    const products = productApi.getAll().filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
  }
};

export const orderApi = {
  getAll: (): Order[] => {
    initializeStorage();
    return JSON.parse(localStorage.getItem('orders') || '[]');
  },
  
  create: (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder = {
      ...orderData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'processing'
    };
    const orders = orderApi.getAll();
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  },
  
  updateStatus: (id: string, status: Order['status']): Order => {
    const orders = orderApi.getAll();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    orders[index].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    return orders[index];
  }
};

initializeStorage();