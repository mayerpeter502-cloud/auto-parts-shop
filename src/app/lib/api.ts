// API для работы с localStorage

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  compatibility: Array<{
    brand: string;
    model: string;
    yearFrom: number;
    yearTo: number;
    engine?: string;
  }>;
  stock: number;
  rating: number;
  reviews: number;
  type?: string;
  volume?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    method: "pickup" | "courier" | "post";
    address?: string;
    city: string;
  };
  payment: {
    method: "card" | "cash" | "kaspi";
  };
  createdAt: string;
  updatedAt: string;
}

// Products API
export const productsApi = {
  getAll: (): Product[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("products") || "[]");
  },

  getById: (id: string): Product | null => {
    const products = productsApi.getAll();
    return products.find((p) => p.id === id) || null;
  },

  getByCategory: (category: string): Product[] => {
    const products = productsApi.getAll();
    return products.filter((p) => p.category === category);
  },

  search: (query: string): Product[] => {
    const products = productsApi.getAll();
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.sku.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
    );
  },

  filter: (filters: {
    brand?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    carBrand?: string;
    carModel?: string;
    year?: number;
  }): Product[] => {
    let products = productsApi.getAll();

    if (filters.brand) {
      products = products.filter((p) => p.brand === filters.brand);
    }
    if (filters.category) {
      products = products.filter((p) => p.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      products = products.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStock) {
      products = products.filter((p) => p.stock > 0);
    }
    if (filters.carBrand && filters.carModel) {
      products = products.filter((p) =>
        p.compatibility.some(
          (c) =>
            c.brand.toLowerCase() === filters.carBrand!.toLowerCase() &&
            c.model.toLowerCase() === filters.carModel!.toLowerCase() &&
            (!filters.year || (c.yearFrom <= filters.year && c.yearTo >= filters.year))
        )
      );
    }

    return products;
  },

  create: (product: Omit<Product, "id">): Product => {
    const products = productsApi.getAll();
    const newProduct = { ...product, id: crypto.randomUUID() };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const products = productsApi.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem("products", JSON.stringify(products));
    return products[index];
  },

  delete: (id: string): boolean => {
    const products = productsApi.getAll();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    
    localStorage.setItem("products", JSON.stringify(filtered));
    return true;
  },

  // Seed demo data
  seed: () => {
    const existing = localStorage.getItem("products");
    if (existing && JSON.parse(existing).length > 0) return;

    const demoProducts: Omit<Product, "id">[] = [
      {
        name: "Моторное масло Shell Helix Ultra 5W-40",
        sku: "SHELL-5W40-4L",
        price: 12500,
        oldPrice: 14900,
        image: "/images/oil-shell.jpg",
        category: "Масла",
        brand: "Shell",
        description: "Синтетическое моторное масло премиум класса",
        specifications: {
          "Вязкость": "5W-40",
          "Объем": "4л",
          "Тип": "Синтетическое",
          "Допуск": "API SN/CF, ACEA A3/B4"
        },
        compatibility: [
          { brand: "Toyota", model: "Camry", yearFrom: 2010, yearTo: 2024 },
          { brand: "BMW", model: "X5", yearFrom: 2015, yearTo: 2024 }
        ],
        stock: 25,
        rating: 4.8,
        reviews: 128,
        type: "Моторное",
        volume: "4л"
      },
      {
        name: "Воздушный фильтр Bosch S0097",
        sku: "BOSCH-AIR-0097",
        price: 3200,
        image: "/images/filter-bosch.jpg",
        category: "Фильтры",
        brand: "Bosch",
        description: "Высококачественный воздушный фильтр",
        specifications: {
          "Тип": "Воздушный",
          "Материал": "Целлюлоза"
        },
        compatibility: [
          { brand: "Toyota", model: "Corolla", yearFrom: 2013, yearTo: 2019 }
        ],
        stock: 50,
        rating: 4.6,
        reviews: 89
      },
      {
        name: "Тормозные колодки Brembo P85098",
        sku: "BREMBO-BRAKE-85098",
        price: 18900,
        oldPrice: 22000,
        image: "/images/brakes-brembo.jpg",
        category: "Тормозная система",
        brand: "Brembo",
        description: "Спортивные тормозные колодки",
        specifications: {
          "Тип": "Передние",
          "Материал": "Керамика"
        },
        compatibility: [
          { brand: "BMW", model: "3 Series", yearFrom: 2012, yearTo: 2019 }
        ],
        stock: 12,
        rating: 4.9,
        reviews: 245
      }
    ];

    demoProducts.forEach((p) => productsApi.create(p));
  }
};

// Orders API
export const ordersApi = {
  getAll: (): Order[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("orders") || "[]");
  },

  getByUser: (userId: string): Order[] => {
    const orders = ordersApi.getAll();
    return orders.filter((o) => o.userId === userId);
  },

  getById: (id: string): Order | null => {
    const orders = ordersApi.getAll();
    return orders.find((o) => o.id === id) || null;
  },

  create: (order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order => {
    const orders = ordersApi.getAll();
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  },

  updateStatus: (id: string, status: Order["status"]): Order | null => {
    const orders = ordersApi.getAll();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    
    orders[index] = { 
      ...orders[index], 
      status,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem("orders", JSON.stringify(orders));
    return orders[index];
  },

  delete: (id: string): boolean => {
    const orders = ordersApi.getAll();
    const filtered = orders.filter((o) => o.id !== id);
    if (filtered.length === orders.length) return false;
    
    localStorage.setItem("orders", JSON.stringify(filtered));
    return true;
  }
};

// Categories
export const categories = [
  "Масла",
  "Фильтры",
  "Тормозная система",
  "Подвеска",
  "Двигатель",
  "Трансмиссия",
  "Электрика",
  "Кузовные детали"
];

// Car brands for selector
export const carBrands = [
  "Toyota",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Hyundai",
  "Kia",
  "Nissan",
  "Honda",
  "Mazda",
  "Lexus",
  "Ford"
];

// Initialize
export const initStorage = () => {
  productsApi.seed();
};