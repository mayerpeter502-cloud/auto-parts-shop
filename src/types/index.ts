// Файл: src/types/index.ts
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  oldPrice?: number;
  image?: string;  // ← ИЗМЕНИТЕ: добавьте ? (сделайте опциональным)
  images?: string[];
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  compatibility: CarCompatibility[];
  stock: number;
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  isPopular?: boolean;  // ← Добавьте это поле
}

export interface CarCompatibility {
  brand: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  engine?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  delivery: {
    type: 'courier' | 'pickup' | 'post';
    address: string;
    city: string;
    phone: string;
  };
  payment: {
    method: 'card' | 'kaspi' | 'cash';
    status: 'pending' | 'paid' | 'failed';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  cars: UserCar[];
  addresses: Address[];
  favorites: string[];
  ordersCount: number;
}

export interface UserCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin?: string;
  engine?: string;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  isDefault: boolean;
}