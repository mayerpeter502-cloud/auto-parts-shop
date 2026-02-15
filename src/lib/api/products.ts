import { Product } from '@/types';

const STORAGE_KEY = 'auto_parts_products';

export const productApi = {
  getAll: (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  getById: (id: string): Product | null => {
    if (typeof window === 'undefined') return null;
    const products = productApi.getAll();
    return products.find(p => p.id === id) || null;
  },

  create: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    if (typeof window === 'undefined') throw new Error('Server side');
    const products = productApi.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...products, newProduct]));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    if (typeof window === 'undefined') return null;
    const products = productApi.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updated = { ...products[index], ...updates };
    products[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updated;
  },

  delete: (id: string): boolean => {
    if (typeof window === 'undefined') return false;
    const products = productApi.getAll();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  search: (query: string): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productApi.getAll();
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery)
    );
  },

  filterByCategory: (category: string): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productApi.getAll();
    return products.filter(p => p.category === category);
  },

  getPopular: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productApi.getAll();
    return products.filter(p => p.isPopular).slice(0, 8);
  },

  seedData: () => {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed) && parsed.length > 0) return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const mockProducts: Omit<Product, 'id' | 'createdAt'>[] = [
      {
        name: 'Моторное масло Mobil 1 5W-30',
        sku: 'MOB-5W30-4L',
        price: 12500,
        oldPrice: 15000,
        category: 'Масла и жидкости',
        brand: 'Mobil',
        description: 'Синтетическое моторное масло для бензиновых и дизельных двигателей',
        image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=Mobil+1',
        inStock: true,
        isPopular: true,
        specifications: {
          'Объем': '4 литра',
          'Вязкость': '5W-30',
          'Тип': 'Синтетическое',
          'ACEA': 'A5/B5',
          'API': 'SN/CF'
        },
        compatibility: ['Toyota', 'Lexus', 'Kia', 'Hyundai']
      },
      {
        name: 'Фильтр масляный Bosch',
        sku: 'BOS-OF-045',
        price: 1800,
        category: 'Фильтры',
        brand: 'Bosch',
        description: 'Высококачественный масляный фильтр',
        image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Bosch',
        inStock: true,
        isPopular: true,
        specifications: {
          'Тип': 'Вставной',
          'Высота': '75 мм',
          'Диаметр': '65 мм'
        },
        compatibility: ['Volkswagen', 'Audi', 'Skoda']
      },
      {
        name: 'Тормозные колодки Brembo',
        sku: 'BRE-BP-1234',
        price: 8900,
        oldPrice: 10500,
        category: 'Тормозная система',
        brand: 'Brembo',
        description: 'Передние тормозные колодки премиум класса',
        image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Brembo',
        inStock: true,
        isPopular: true,
        specifications: {
          'Тип': 'Передние',
          'Материал': 'Керамика',
          'Ось': 'Передняя'
        },
        compatibility: ['BMW', 'Mercedes', 'Audi']
      },
      {
        name: 'Свечи зажигания NGK Iridium',
        sku: 'NGK-ILZK-7',
        price: 3200,
        category: 'Двигатель',
        brand: 'NGK',
        description: 'Иридиевые свечи зажигания с увеличенным ресурсом',
        image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=NGK',
        inStock: true,
        isPopular: false,
        specifications: {
          'Тип': 'Iridium',
          'Шаг резьбы': 'M14x1.25',
          'Ключ': '14 мм'
        },
        compatibility: ['Honda', 'Toyota', 'Mazda']
      },
      {
        name: 'Амортизатор KYB Excel-G',
        sku: 'KYB-EX-567',
        price: 15600,
        category: 'Подвеска',
        brand: 'KYB',
        description: 'Газомасляный амортизатор',
        image: 'https://via.placeholder.com/300x300/6366f1/ffffff?text=KYB',
        inStock: true,
        isPopular: false,
        specifications: {
          'Тип': 'Газомасляный',
          'Ось': 'Передняя',
          'Сторона': 'Левая/Правая'
        },
        compatibility: ['Toyota Camry', 'Lexus ES']
      },
      {
        name: 'Аккумулятор Varta Blue Dynamic',
        sku: 'VAR-BD-60',
        price: 28500,
        oldPrice: 32000,
        category: 'Электрика',
        brand: 'Varta',
        description: 'Автомобильный аккумулятор 60Ah',
        image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Varta',
        inStock: true,
        isPopular: true,
        specifications: {
          'Емкость': '60 Ah',
          'Пусковой ток': '540 A',
          'Полярность': 'Прямая'
        },
        compatibility: ['Универсальный']
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    mockProducts.forEach(p => productApi.create(p));
  }
};