export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  image?: string;
  images?: string[];
  inStock: boolean;
  description?: string;
  compatibility?: {
    brand: string;
    model: string;
    yearFrom: number;
    yearTo: number;
  }[];
  specifications?: Record<string, string>;
  rating?: number;
  reviewsCount?: number;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Моторное масло Castrol EDGE 5W-30 4L",
    brand: "Castrol",
    category: "oil",
    price: 18500,
    oldPrice: 22000,
    inStock: true,
    image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=Castrol+5W30",
    images: ["https://via.placeholder.com/300x300/2563eb/ffffff?text=Castrol+5W30"],
    description: "Синтетическое моторное масло премиум класса",
    compatibility: [
      { brand: "Toyota", model: "Camry", yearFrom: 2010, yearTo: 2024 },
      { brand: "BMW", model: "X5", yearFrom: 2015, yearTo: 2024 }
    ],
    specifications: {
      "Вязкость": "5W-30",
      "Объем": "4 литра",
      "Тип": "Синтетическое"
    },
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: "2",
    name: "Моторное масло Mobil 1 0W-40 4L",
    brand: "Mobil",
    category: "oil",
    price: 21000,
    inStock: true,
    image: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Mobil+0W40",
    images: ["https://via.placeholder.com/300x300/dc2626/ffffff?text=Mobil+0W40"],
    compatibility: [
      { brand: "Mercedes", model: "E-Class", yearFrom: 2012, yearTo: 2024 },
      { brand: "Audi", model: "A6", yearFrom: 2015, yearTo: 2024 }
    ],
    specifications: {
      "Вязкость": "0W-40",
      "Объем": "4 литра",
      "Тип": "Синтетическое"
    },
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: "3",
    name: "Фильтр масляный Bosch F026407183",
    brand: "Bosch",
    category: "filter",
    price: 2500,
    inStock: true,
    image: "https://via.placeholder.com/300x300/059669/ffffff?text=Bosch+Filter",
    images: ["https://via.placeholder.com/300x300/059669/ffffff?text=Bosch+Filter"],
    compatibility: [
      { brand: "Volkswagen", model: "Golf", yearFrom: 2010, yearTo: 2020 },
      { brand: "Audi", model: "A3", yearFrom: 2012, yearTo: 2020 }
    ],
    specifications: {
      "Тип": "Масляный",
      "Высота": "76 мм"
    },
    rating: 4.7,
    reviewsCount: 56
  },
  {
    id: "4",
    name: "Фильтр воздушный Mann C30130",
    brand: "Mann",
    category: "filter",
    price: 3200,
    oldPrice: 3800,
    inStock: true,
    image: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Mann+Air",
    images: ["https://via.placeholder.com/300x300/7c3aed/ffffff?text=Mann+Air"],
    compatibility: [
      { brand: "Toyota", model: "Corolla", yearFrom: 2008, yearTo: 2018 },
      { brand: "Toyota", model: "RAV4", yearFrom: 2006, yearTo: 2012 }
    ],
    specifications: {
      "Тип": "Воздушный",
      "Длина": "280 мм"
    },
    rating: 4.6,
    reviewsCount: 42
  },
  {
    id: "5",
    name: "Тормозные колодки Brembo P85020",
    brand: "Brembo",
    category: "brake",
    price: 15800,
    inStock: true,
    image: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Brembo+Brake",
    images: ["https://via.placeholder.com/300x300/dc2626/ffffff?text=Brembo+Brake"],
    compatibility: [
      { brand: "BMW", model: "3 Series", yearFrom: 2012, yearTo: 2019 },
      { brand: "BMW", model: "5 Series", yearFrom: 2010, yearTo: 2017 }
    ],
    specifications: {
      "Ось": "Передняя",
      "Тип": "Дисковые"
    },
    rating: 4.9,
    reviewsCount: 78
  },
  {
    id: "6",
    name: "Тормозной диск ATE 24.0122-0150.1",
    brand: "ATE",
    category: "brake",
    price: 12500,
    inStock: false,
    image: "https://via.placeholder.com/300x300/4b5563/ffffff?text=ATE+Disc",
    images: ["https://via.placeholder.com/300x300/4b5563/ffffff?text=ATE+Disc"],
    compatibility: [
      { brand: "Mercedes", model: "C-Class", yearFrom: 2014, yearTo: 2021 }
    ],
    specifications: {
      "Диаметр": "300 мм",
      "Толщина": "28 мм"
    },
    rating: 4.5,
    reviewsCount: 23
  },
  {
    id: "7",
    name: "Амортизатор KYB 341346",
    brand: "KYB",
    category: "suspension",
    price: 18900,
    inStock: true,
    image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=KYB+Shock",
    images: ["https://via.placeholder.com/300x300/2563eb/ffffff?text=KYB+Shock"],
    compatibility: [
      { brand: "Honda", model: "Civic", yearFrom: 2006, yearTo: 2011 },
      { brand: "Honda", model: "Accord", yearFrom: 2008, yearTo: 2012 }
    ],
    specifications: {
      "Ось": "Задняя",
      "Тип": "Газомасляный"
    },
    rating: 4.7,
    reviewsCount: 34
  },
  {
    id: "8",
    name: "Свеча зажигания NGK BKR6E",
    brand: "NGK",
    category: "electrical",
    price: 1200,
    inStock: true,
    image: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=NGK+Spark",
    images: ["https://via.placeholder.com/300x300/f59e0b/ffffff?text=NGK+Spark"],
    compatibility: [
      { brand: "Toyota", model: "Avensis", yearFrom: 2003, yearTo: 2008 },
      { brand: "Mazda", model: "6", yearFrom: 2002, yearTo: 2008 }
    ],
    specifications: {
      "Тип": "Nickel",
      "Количество": "1 шт"
    },
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: "9",
    name: "Аккумулятор Varta Blue Dynamic 60Ah",
    brand: "Varta",
    category: "electrical",
    price: 45000,
    oldPrice: 52000,
    inStock: true,
    image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=Varta+60Ah",
    images: ["https://via.placeholder.com/300x300/1e40af/ffffff?text=Varta+60Ah"],
    compatibility: [
      { brand: "Universal", model: "All", yearFrom: 2000, yearTo: 2024 }
    ],
    specifications: {
      "Емкость": "60 Ah",
      "Пусковой ток": "540 A",
      "Полярность": "Прямая"
    },
    rating: 4.6,
    reviewsCount: 67
  },
  {
    id: "10",
    name: "Ремень ГРМ Gates 5669XS",
    brand: "Gates",
    category: "engine",
    price: 8900,
    inStock: true,
    image: "https://via.placeholder.com/300x300/374151/ffffff?text=Gates+Belt",
    images: ["https://via.placeholder.com/300x300/374151/ffffff?text=Gates+Belt"],
    compatibility: [
      { brand: "Volkswagen", model: "Polo", yearFrom: 2010, yearTo: 2020 },
      { brand: "Skoda", model: "Fabia", yearFrom: 2010, yearTo: 2014 }
    ],
    specifications: {
      "Длина": "1049 мм",
      "Ширина": "30 мм"
    },
    rating: 4.7,
    reviewsCount: 45
  },
  {
    id: "11",
    name: "Масло Shell Helix Ultra 5W-40 4L",
    brand: "Shell",
    category: "oil",
    price: 19500,
    inStock: true,
    image: "https://via.placeholder.com/300x300/fbbf24/ffffff?text=Shell+5W40",
    images: ["https://via.placeholder.com/300x300/fbbf24/ffffff?text=Shell+5W40"],
    compatibility: [
      { brand: "Hyundai", model: "Solaris", yearFrom: 2010, yearTo: 2024 },
      { brand: "Kia", model: "Rio", yearFrom: 2011, yearTo: 2024 }
    ],
    specifications: {
      "Вязкость": "5W-40",
      "Объем": "4 литра",
      "Тип": "Синтетическое"
    },
    rating: 4.8,
    reviewsCount: 112
  },
  {
    id: "12",
    name: "Фильтр топливный Delphi HDF924",
    brand: "Delphi",
    category: "filter",
    price: 4500,
    inStock: true,
    image: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Delphi+Fuel",
    images: ["https://via.placeholder.com/300x300/0891b2/ffffff?text=Delphi+Fuel"],
    compatibility: [
      { brand: "Ford", model: "Focus", yearFrom: 2008, yearTo: 2011 },
      { brand: "Ford", model: "Mondeo", yearFrom: 2007, yearTo: 2014 }
    ],
    specifications: {
      "Тип": "Топливный",
      "Топливо": "Бензин"
    },
    rating: 4.5,
    reviewsCount: 28
  }
];

const PRODUCTS_KEY = 'autoparts_products';

// Инициализация localStorage при первом запуске
const initStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }
  }
};

export const getProducts = (): Product[] => {
  initStorage();
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return defaultProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter(p => p.category === category);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return getProducts()
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

export const addProduct = (product: Product): void => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

export const updateProduct = (id: string, updates: Partial<Product>): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

// Для обратной совместимости
export const productsApi = {
  getAll: getProducts,
  getById: getProductById,
  create: (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() } as Product;
    addProduct(newProduct);
    return newProduct;
  },
  update: updateProduct,
  delete: deleteProduct
};