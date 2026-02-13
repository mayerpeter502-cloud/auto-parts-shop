import { Product } from '@/types';

const STORAGE_KEY = 'products';

const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Мок-данные
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Моторное масло Castrol 5W-30',
    sku: 'OIL-001',
    price: 8500,
    oldPrice: 9900,
    category: 'maslo',
    brand: 'Castrol',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
    description: 'Синтетическое моторное масло',
    specifications: { viscosity: '5W-30', volume: '4л' },
    compatibility: [],
    rating: 4.5,
    reviewsCount: 12,
    createdAt: new Date()
  }
];

export const productApi = {
  async getAll(): Promise<{ products: Product[] }> {
    const products = getProducts();
    if (products.length === 0) {
      saveProducts(mockProducts);
      return { products: mockProducts };
    }
    return { products };
  },

  async getById(id: string): Promise<Product | null> {
    const products = getProducts();
    return products.find(p => p.id === id) || null;
  },

  async create(product: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
    const products = getProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct.id;
  },

  async update(id: string, data: Partial<Product>): Promise<void> {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      saveProducts(products);
    }
  },

  async delete(id: string): Promise<void> {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
  }
};