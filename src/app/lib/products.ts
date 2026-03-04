import { Product, CarCompatibility } from '@/types';

const STORAGE_KEY = 'autoparts_products_v2';

export const productsApi = {
  getAll: (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return parsed.map((p: any) => ({
        ...p,
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
        stock: typeof p.stock === 'number' ? p.stock : 0,
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
      stock: typeof product.stock === 'number' ? product.stock : 0,
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
      stock: updates.stock !== undefined ? updates.stock : products[index].stock,
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
        description: 'Синтетическое моторное масло',
        image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=Mobil+1',
        stock: 50,
        rating: 4.8,
        reviewsCount: 124,
        isPopular: true,
        specifications: {
          'Объем': '4 литра',
          'Вязкость': '5W-30',
          'Тип': 'Синтетическое'
        },
        compatibility: [
          { brand: 'Toyota', model: 'Camry', yearFrom: 2010, yearTo: 2024, engine: '2.5L' },
          { brand: 'Lexus', model: 'ES', yearFrom: 2012, yearTo: 2024, engine: '2.5L' }
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
        stock: 100,
        rating: 4.7,
        reviewsCount: 56,
        isPopular: true,
        specifications: {
          'Тип': 'Вставной',
          'Высота': '75 мм'
        },
        compatibility: [
          { brand: 'Volkswagen', model: 'Golf', yearFrom: 2010, yearTo: 2020 }
        ] as CarCompatibility[]
      },
      {
        name: 'Тормозные колодки Brembo',
        sku: 'BRE-BP-1234',
        price: 8900,
        oldPrice: 10500,
        category: 'Тормозная система',
        brand: 'Brembo',
        description: 'Передние тормозные колодки',
        image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Brembo',
        stock: 30,
        rating: 4.9,
        reviewsCount: 78,
        isPopular: true,
        specifications: {
          'Тип': 'Передние',
          'Материал': 'Керамика'
        },
        compatibility: [
          { brand: 'BMW', model: '3 Series', yearFrom: 2012, yearTo: 2019 }
        ] as CarCompatibility[]
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    mockProducts.forEach(p => productsApi.create(p));
  }
};

export const productApi = productsApi;