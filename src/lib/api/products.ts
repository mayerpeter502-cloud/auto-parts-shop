import { Product, CarCompatibility } from '@/types';

// ← ВАЖНО: используем тот же ключ что в src/app/lib/api.ts
const STORAGE_KEY = 'autoparts_products_v2';

export const productsApi = {
  getAll: (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      // Преобразуем строки createdAt обратно в Date объекты
      return parsed.map((p: any) => ({
        ...p,
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
        // ← ВАЖНО: гарантируем что stock есть (по умолчанию 0)
        stock: typeof p.stock === 'number' ? p.stock : 0,
        // Убеждаемся что image есть
        image: p.image || '/placeholder.jpg'
      }));
    } catch {
      return [];
    }
  },

  getById: (id: string): Product | null => {
    if (typeof window === 'undefined') return null;
    const products = productsApi.getAll();
    return products.find(p => p.id === id) || null;
  },

  create: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    if (typeof window === 'undefined') throw new Error('Server side');
    const products = productsApi.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      // ← ВАЖНО: гарантируем что stock сохраняется
      stock: typeof product.stock === 'number' ? product.stock : 0,
      // Гарантируем что image не undefined
      image: product.image || '/placeholder.jpg'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...products, newProduct]));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    if (typeof window === 'undefined') return null;
    const products = productsApi.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = {
      ...products[index],
      ...updates,
      // ← ВАЖНО: если обновляем stock, сохраняем его
      stock: updates.stock !== undefined ? updates.stock : products[index].stock,
      // Если обновляем image, гарантируем что не undefined
      image: updates.image !== undefined ? updates.image : products[index].image
    };
    products[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updated;
  },

  delete: (id: string): boolean => {
    if (typeof window === 'undefined') return false;
    const products = productsApi.getAll();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  search: (query: string): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productsApi.getAll();
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery)
    );
  },

  filterByCategory: (category: string): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productsApi.getAll();
    return products.filter(p => p.category === category);
  },

  getPopular: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const products = productsApi.getAll();
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
        stock: 50,  // ← stock добавлен
        rating: 4.8,
        reviewsCount: 124,
        isPopular: true,
        specifications: {
          'Объем': '4 литра',
          'Вязкость': '5W-30',
          'Тип': 'Синтетическое',
          'ACEA': 'A5/B5',
          'API': 'SN/CF'
        },
        compatibility: [
          { brand: 'Toyota', model: 'Camry', yearFrom: 2010, yearTo: 2024, engine: '2.5L' },
          { brand: 'Lexus', model: 'ES', yearFrom: 2012, yearTo: 2024, engine: '2.5L' },
          { brand: 'Kia', model: 'Optima', yearFrom: 2011, yearTo: 2020, engine: '2.4L' },
          { brand: 'Hyundai', model: 'Sonata', yearFrom: 2011, yearTo: 2020, engine: '2.4L' }
        ] as CarCompatibility[]
      },
      {
        name: 'Фильтр масляный Bosch',
        sku: 'BOS-OF-045',
        price: 1800,
        category: 'Фильтры',
        brand: 'Bosch',
        description: 'Высококачественный масляный фильтр',
        image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Bosch',
        stock: 100,  // ← stock добавлен
        rating: 4.7,
        reviewsCount: 56,
        isPopular: true,
        specifications: {
          'Тип': 'Вставной',
          'Высота': '75 мм',
          'Диаметр': '65 мм'
        },
        compatibility: [
          { brand: 'Volkswagen', model: 'Golf', yearFrom: 2010, yearTo: 2020 },
          { brand: 'Audi', model: 'A3', yearFrom: 2012, yearTo: 2020 },
          { brand: 'Skoda', model: 'Octavia', yearFrom: 2010, yearTo: 2018 }
        ] as CarCompatibility[]
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
        stock: 30,  // ← stock добавлен
        rating: 4.9,
        reviewsCount: 78,
        isPopular: true,
        specifications: {
          'Тип': 'Передние',
          'Материал': 'Керамика',
          'Ось': 'Передняя'
        },
        compatibility: [
          { brand: 'BMW', model: '3 Series', yearFrom: 2012, yearTo: 2019 },
          { brand: 'Mercedes', model: 'C-Class', yearFrom: 2014, yearTo: 2021 },
          { brand: 'Audi', model: 'A4', yearFrom: 2010, yearTo: 2017 }
        ] as CarCompatibility[]
      },
      {
        name: 'Свечи зажигания NGK Iridium',
        sku: 'NGK-ILZK-7',
        price: 3200,
        category: 'Двигатель',
        brand: 'NGK',
        description: 'Иридиевые свечи зажигания с увеличенным ресурсом',
        image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=NGK',
        stock: 200,  // ← stock добавлен
        rating: 4.8,
        reviewsCount: 156,
        isPopular: false,
        specifications: {
          'Тип': 'Iridium',
          'Шаг резьбы': 'M14x1.25',
          'Ключ': '14 мм'
        },
        compatibility: [
          { brand: 'Honda', model: 'Civic', yearFrom: 2006, yearTo: 2011 },
          { brand: 'Toyota', model: 'Corolla', yearFrom: 2008, yearTo: 2018 },
          { brand: 'Mazda', model: '6', yearFrom: 2002, yearTo: 2008 }
        ] as CarCompatibility[]
      },
      {
        name: 'Амортизатор KYB Excel-G',
        sku: 'KYB-EX-567',
        price: 15600,
        category: 'Подвеска',
        brand: 'KYB',
        description: 'Газомасляный амортизатор',
        image: 'https://via.placeholder.com/300x300/6366f1/ffffff?text=KYB',
        stock: 25,  // ← stock добавлен
        rating: 4.7,
        reviewsCount: 34,
        isPopular: false,
        specifications: {
          'Тип': 'Газомасляный',
          'Ось': 'Передняя',
          'Сторона': 'Левая/Правая'
        },
        compatibility: [
          { brand: 'Toyota', model: 'Camry', yearFrom: 2010, yearTo: 2017 },
          { brand: 'Lexus', model: 'ES', yearFrom: 2012, yearTo: 2018 }
        ] as CarCompatibility[]
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
        stock: 15,  // ← stock добавлен
        rating: 4.6,
        reviewsCount: 67,
        isPopular: true,
        specifications: {
          'Емкость': '60 Ah',
          'Пусковой ток': '540 A',
          'Полярность': 'Прямая'
        },
        compatibility: [
          { brand: 'Универсальный', model: 'Все авто', yearFrom: 2000, yearTo: 2025 }
        ] as CarCompatibility[]
      }
    ];

    // Очищаем и создаём новые товары
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    mockProducts.forEach(p => productsApi.create(p));
  }
};

// Для обратной совместимости
export const productApi = productsApi;
