export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  image?: string;
  images?: string[];
  inStock?: boolean;
  stock?: number;
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
  sku?: string;
  createdAt?: Date;
  isPopular?: boolean;
  crossNumbers?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parentId?: string | null;
  children?: Category[];
}

// ← ИСПРАВЛЕНО: Убраны лишние пробелы в строках
export const categories: Category[] = [
  {
    id: "oil",
    name: "Масла и жидкости",
    slug: "oil",
    icon: "🛢️",
    parentId: null,
    children: [
      { id: "oil-motor", name: "Моторные масла", slug: "oil-motor", icon: "🔧", parentId: "oil" },
      { id: "oil-trans", name: "Трансмиссионные масла", slug: "oil-trans", icon: "⚙️", parentId: "oil" },
      { id: "oil-coolant", name: "Охлаждающие жидкости", slug: "oil-coolant", icon: "❄️", parentId: "oil" }
    ]
  },
  {
    id: "filter",
    name: "Фильтры",
    slug: "filter",
    icon: "🔄",
    parentId: null,
    children: [
      { id: "filter-oil", name: "Масляные фильтры", slug: "filter-oil", icon: "🛢️", parentId: "filter" },
      { id: "filter-air", name: "Воздушные фильтры", slug: "filter-air", icon: "💨", parentId: "filter" },
      { id: "filter-fuel", name: "Топливные фильтры", slug: "filter-fuel", icon: "⛽", parentId: "filter" }
    ]
  },
  {
    id: "brake",
    name: "Тормозная система",
    slug: "brake",
    icon: "🛑",
    parentId: null,
    children: [
      { id: "brake-pads", name: "Тормозные колодки", slug: "brake-pads", icon: "🔲", parentId: "brake" },
      { id: "brake-discs", name: "Тормозные диски", slug: "brake-discs", icon: "💿", parentId: "brake" }
    ]
  },
  {
    id: "suspension",
    name: "Подвеска",
    slug: "suspension",
    icon: "🔧",
    parentId: null,
    children: [
      { id: "suspension-shock", name: "Амортизаторы", slug: "suspension-shock", icon: "📍", parentId: "suspension" }
    ]
  },
  {
    id: "electrical",
    name: "Электрика",
    slug: "electrical",
    icon: "⚡",
    parentId: null,
    children: [
      { id: "electrical-spark", name: "Свечи зажигания", slug: "electrical-spark", icon: "🔌", parentId: "electrical" },
      { id: "electrical-battery", name: "Аккумуляторы", slug: "electrical-battery", icon: "🔋", parentId: "electrical" }
    ]
  },
  {
    id: "engine",
    name: "Двигатель",
    slug: "engine",
    icon: "⚙️",
    parentId: null,
    children: [
      { id: "engine-belt", name: "Ремни ГРМ", slug: "engine-belt", icon: "🔗", parentId: "engine" }
    ]
  }
];

// ← ИСПРАВЛЕНО: Убраны лишние пробелы в продуктах
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Моторное масло Castrol EDGE 5W-30 4L",
    brand: "Castrol",
    category: "oil",
    price: 18500,
    oldPrice: 22000,
    inStock: true,
    stock: 15,
    sku: "CASTROL-5W30-4L",
    image: "https://dummyimage.com/300x300/2563eb/ffffff&text=Castrol+5W30",
    images: ["https://dummyimage.com/300x300/2563eb/ffffff&text=Castrol+5W30"],
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
    reviewsCount: 124,
    crossNumbers: ["MOBIL-5W30-4L", "SHELL-5W30-4L"]
  },
  {
    id: "2",
    name: "Моторное масло Mobil 1 0W-40 4L",
    brand: "Mobil",
    category: "oil",
    price: 21000,
    inStock: true,
    stock: 10,
    sku: "MOBIL-0W40-4L",
    image: "https://dummyimage.com/300x300/dc2626/ffffff&text=Mobil+0W40",
    images: ["https://dummyimage.com/300x300/dc2626/ffffff&text=Mobil+0W40"],
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
    reviewsCount: 89,
    crossNumbers: ["CASTROL-0W40-4L", "SHELL-0W40-4L"]
  },
  {
    id: "3",
    name: "Фильтр масляный Bosch F026407183",
    brand: "Bosch",
    category: "filter",
    price: 2500,
    inStock: true,
    stock: 50,
    sku: "BOSCH-F026407183",
    image: "https://dummyimage.com/300x300/059669/ffffff&text=Bosch+Filter",
    images: ["https://dummyimage.com/300x300/059669/ffffff&text=Bosch+Filter"],
    compatibility: [
      { brand: "Volkswagen", model: "Golf", yearFrom: 2010, yearTo: 2020 },
      { brand: "Audi", model: "A3", yearFrom: 2012, yearTo: 2020 }
    ],
    specifications: {
      "Тип": "Масляный",
      "Высота": "76 мм"
    },
    rating: 4.7,
    reviewsCount: 56,
    crossNumbers: ["MANN-W811/80", "FILTRON-OP596", "MAHLE-OC1051"]
  },
  {
    id: "4",
    name: "Фильтр воздушный Mann C30130",
    brand: "Mann",
    category: "filter",
    price: 3200,
    oldPrice: 3800,
    inStock: true,
    stock: 30,
    sku: "MANN-C30130",
    image: "https://dummyimage.com/300x300/7c3aed/ffffff&text=Mann+Air",
    images: ["https://dummyimage.com/300x300/7c3aed/ffffff&text=Mann+Air"],
    compatibility: [
      { brand: "Toyota", model: "Corolla", yearFrom: 2008, yearTo: 2018 },
      { brand: "Toyota", model: "RAV4", yearFrom: 2006, yearTo: 2012 }
    ],
    specifications: {
      "Тип": "Воздушный",
      "Длина": "280 мм"
    },
    rating: 4.6,
    reviewsCount: 42,
    crossNumbers: ["BOSCH-F026407183", "KNECHT-LX300"]
  },
  {
    id: "5",
    name: "Тормозные колодки Brembo P85020",
    brand: "Brembo",
    category: "brake",
    price: 15800,
    inStock: true,
    stock: 25,
    sku: "BREMBO-P85020",
    image: "https://dummyimage.com/300x300/dc2626/ffffff&text=Brembo+Brake",
    images: ["https://dummyimage.com/300x300/dc2626/ffffff&text=Brembo+Brake"],
    compatibility: [
      { brand: "BMW", model: "3 Series", yearFrom: 2012, yearTo: 2019 },
      { brand: "BMW", model: "5 Series", yearFrom: 2010, yearTo: 2017 }
    ],
    specifications: {
      "Ось": "Передняя",
      "Тип": "Дисковые"
    },
    rating: 4.9,
    reviewsCount: 78,
    crossNumbers: ["TEXTAR-2305701", "TRW-GDB3428"]
  },
  {
    id: "6",
    name: "Тормозной диск ATE 24.0122-0150.1",
    brand: "ATE",
    category: "brake",
    price: 12500,
    inStock: true,
    stock: 20,
    sku: "ATE-24012201",
    image: "https://dummyimage.com/300x300/4b5563/ffffff&text=ATE+Disc",
    images: ["https://dummyimage.com/300x300/4b5563/ffffff&text=ATE+Disc"],
    compatibility: [
      { brand: "Mercedes", model: "C-Class", yearFrom: 2014, yearTo: 2021 }
    ],
    specifications: {
      "Диаметр": "300 мм",
      "Толщина": "28 мм"
    },
    rating: 4.5,
    reviewsCount: 23,
    crossNumbers: ["BREMBO-08.7067.11", "ZIMMERMANN-150.1234.50"]
  },
  {
    id: "7",
    name: "Амортизатор KYB 341346",
    brand: "KYB",
    category: "suspension",
    price: 18900,
    inStock: true,
    stock: 12,
    sku: "KYB-341346",
    image: "https://dummyimage.com/300x300/2563eb/ffffff&text=KYB+Shock",
    images: ["https://dummyimage.com/300x300/2563eb/ffffff&text=KYB+Shock"],
    compatibility: [
      { brand: "Honda", model: "Civic", yearFrom: 2006, yearTo: 2011 },
      { brand: "Honda", model: "Accord", yearFrom: 2008, yearTo: 2012 }
    ],
    specifications: {
      "Ось": "Задняя",
      "Тип": "Газомасляный"
    },
    rating: 4.7,
    reviewsCount: 34,
    crossNumbers: ["SACHS-313534", "MONROE-E7189"]
  },
  {
    id: "8",
    name: "Свеча зажигания NGK BKR6E",
    brand: "NGK",
    category: "electrical",
    price: 1200,
    inStock: true,
    stock: 100,
    sku: "NGK-BKR6E",
    image: "https://dummyimage.com/300x300/f59e0b/ffffff&text=NGK+Spark",
    images: ["https://dummyimage.com/300x300/f59e0b/ffffff&text=NGK+Spark"],
    compatibility: [
      { brand: "Toyota", model: "Avensis", yearFrom: 2003, yearTo: 2008 },
      { brand: "Mazda", model: "6", yearFrom: 2002, yearTo: 2008 }
    ],
    specifications: {
      "Тип": "Nickel",
      "Количество": "1 шт"
    },
    rating: 4.8,
    reviewsCount: 156,
    crossNumbers: ["BOSCH-FR7DC+", "DENSO-K20PRU"]
  },
  {
    id: "9",
    name: "Аккумулятор Varta Blue Dynamic 60Ah",
    brand: "Varta",
    category: "electrical",
    price: 45000,
    oldPrice: 52000,
    inStock: true,
    stock: 8,
    sku: "VARTA-60AH",
    image: "https://dummyimage.com/300x300/1e40af/ffffff&text=Varta+60Ah",
    images: ["https://dummyimage.com/300x300/1e40af/ffffff&text=Varta+60Ah"],
    compatibility: [
      { brand: "Universal", model: "All", yearFrom: 2000, yearTo: 2024 }
    ],
    specifications: {
      "Емкость": "60 Ah",
      "Пусковой ток": "540 A",
      "Полярность": "Прямая"
    },
    rating: 4.6,
    reviewsCount: 67,
    crossNumbers: ["BOSCH-S4005", "EXIDE-EB604"]
  },
  {
    id: "10",
    name: "Ремень ГРМ Gates 5669XS",
    brand: "Gates",
    category: "engine",
    price: 8900,
    inStock: true,
    stock: 15,
    sku: "GATES-5669XS",
    image: "https://dummyimage.com/300x300/374151/ffffff&text=Gates+Belt",
    images: ["https://dummyimage.com/300x300/374151/ffffff&text=Gates+Belt"],
    compatibility: [
      { brand: "Volkswagen", model: "Polo", yearFrom: 2010, yearTo: 2020 },
      { brand: "Skoda", model: "Fabia", yearFrom: 2010, yearTo: 2014 }
    ],
    specifications: {
      "Длина": "1049 мм",
      "Ширина": "30 мм"
    },
    rating: 4.7,
    reviewsCount: 45,
    crossNumbers: ["CONTITECH-CT1061", "DAYCO-94990"]
  },
  {
    id: "11",
    name: "Масло Shell Helix Ultra 5W-40 4L",
    brand: "Shell",
    category: "oil",
    price: 19500,
    inStock: true,
    stock: 20,
    sku: "SHELL-5W40-4L",
    image: "https://dummyimage.com/300x300/fbbf24/ffffff&text=Shell+5W40",
    images: ["https://dummyimage.com/300x300/fbbf24/ffffff&text=Shell+5W40"],
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
    reviewsCount: 112,
    crossNumbers: ["CASTROL-5W40-4L", "MOBIL-5W40-4L"]
  },
  {
    id: "12",
    name: "Фильтр топливный Delphi HDF924",
    brand: "Delphi",
    category: "filter",
    price: 4500,
    inStock: true,
    stock: 40,
    sku: "DELPHI-HDF924",
    image: "https://dummyimage.com/300x300/0891b2/ffffff&text=Delphi+Fuel",
    images: ["https://dummyimage.com/300x300/0891b2/ffffff&text=Delphi+Fuel"],
    compatibility: [
      { brand: "Ford", model: "Focus", yearFrom: 2008, yearTo: 2011 },
      { brand: "Ford", model: "Mondeo", yearFrom: 2007, yearTo: 2014 }
    ],
    specifications: {
      "Тип": "Топливный",
      "Топливо": "Бензин"
    },
    rating: 4.5,
    reviewsCount: 28,
    crossNumbers: ["BOSCH-F026402016", "MANN-FK2000"]
  }
];

const PRODUCTS_KEY = 'autoparts_products_v2';

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

export const getAnalogProducts = (product: Product, limit: number = 4): Product[] => {
  if (!product.crossNumbers || product.crossNumbers.length === 0) return [];
  const allProducts = getProducts();
  return allProducts
    .filter(p =>
      p.id !== product.id &&
      product.crossNumbers?.includes(p.sku || '')
    )
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

// ← ИСПРАВЛЕНО: Убраны дублирующие экспорты
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

// ← ИСПРАВЛЕНО: Удален дублирующий export const productApi = productsApi;

// ← ДОБАВЛЕНО: Функции для работы с категориями
export const getAllCategories = (flat: boolean = false): Category[] => {
  if (flat) {
    const flat: Category[] = [];
    const flatten = (cats: Category[]) => {
      cats.forEach(cat => {
        flat.push({ ...cat, children: undefined });
        if (cat.children) flatten(cat.children);
      });
    };
    flatten(categories);
    return flat;
  }
  return categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  const flat = getAllCategories(true);
  return flat.find(cat => cat.slug === slug);
};

export const getCategoryParents = (slug: string): Category[] => {
  const parents: Category[] = [];
  const category = getCategoryBySlug(slug);
  if (!category || !category.parentId) return parents;

  const findParent = (parentId: string) => {
    const parent = categories.find(cat => cat.id === parentId);
    if (parent) {
      parents.unshift({ ...parent, children: undefined });
      if (parent.parentId) findParent(parent.parentId);
    }
  };

  findParent(category.parentId);
  return parents;
};

export const getChildCategories = (parentId: string): Category[] => {
  const parent = categories.find(cat => cat.id === parentId);
  return parent?.children || [];
};