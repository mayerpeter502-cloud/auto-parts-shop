// src/app/lib/api.ts
import { v4 as uuidv4 } from 'uuid';

// Типы данных
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

// Инициализация данных в localStorage при первом запуске
function initializeStorage() {
  if (!localStorage.getItem('products')) {
    // Пример данных для тестирования
    const initialProducts: Product[] = [
      {
        id: uuidv4(),
        name: "Масляный фильтр Mann HU 714/2x",
        description: "Высококачественный масляный фильтр для двигателей с увеличенным ресурсом",
        price: 2500,
        brand: "Mann",
        category: "Фильтры",
        compatibility: {
          makes: ["Toyota", "Honda", "Nissan"],
          models: ["Camry", "Accord", "Altima"],
          years: ["2015-2020"]
        },
        images: ["/images/filters/filter1.jpg"],
        specifications: {
          "Тип": "Масляный",
          "Высота, мм": "95",
          "Диаметр, мм": "75",
          "Тип резьбы": "M20x1.5"
        },
        inStock: true,
        rating: 4.7,
        reviewsCount: 45,
        vendorCode: "HU7142X"
      },
      // Добавьте больше тестовых товаров при необходимости
    ];
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
  
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
}

// API для работы с товарами
export const productApi = {
  getAll: (): Product[] => {
    initializeStorage();
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  },
  
  getById: (id: string): Product | undefined => {
    const products = productApi.getAll();
    return products.find(product => product.id === id);
  },
  
  create: (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: uuidv4()
    };
    
    const products = productApi.getAll();
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    return newProduct;
  },
  
  update: (id: string, productData: Partial<Product>): Product => {
    let products = productApi.getAll();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    products[index] = { ...products[index], ...productData };
    localStorage.setItem('products', JSON.stringify(products));
    
    return products[index];
  },
  
  delete: (id: string): void => {
    let products = productApi.getAll();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
  }
};

// API для работы с заказами
export const orderApi = {
  getAll: (): Order[] => {
    initializeStorage();
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  },
  
  getById: (id: string): Order | undefined => {
    const orders = orderApi.getAll();
    return orders.find(order => order.id === id);
  },
  
  create: (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder: Order = {
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
    let orders = orderApi.getAll();
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    orders[index].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return orders[index];
  }
};

initializeStorage();