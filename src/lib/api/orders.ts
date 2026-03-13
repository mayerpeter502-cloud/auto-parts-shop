import { Order } from '@/types';

const ORDERS_STORAGE_KEY = 'auto_parts_orders';

// ✅ ДОБАВЛЕНО: Отдельный интерфейс для элементов заказа (плоская структура)
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

// ✅ ИЗМЕНЕНО: Используем OrderItem вместо CartItem из типов
interface OrderData {
  userId: string;
  status: Order['status'];
  total: number;
  items: OrderItem[];
  customer?: {
    name: string;
    phone: string;
  };
}

export const orderApi = {
  async create(order: Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (typeof window === 'undefined') throw new Error('Server side');
    
    const orders = await this.getAll();
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    orders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return newOrder.id;
  },
  
  async getByUser(userId: string): Promise<any[]> {
    if (typeof window === 'undefined') return [];
    const orders = await this.getAll();
    return orders.filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  async getById(orderId: string): Promise<any | null> {
    if (typeof window === 'undefined') return null;
    const orders = await this.getAll();
    return orders.find(order => order.id === orderId) || null;
  },
  
  async updateStatus(orderId: string, status: string): Promise<void> {
    if (typeof window === 'undefined') return;
    const orders = await this.getAll();
    const index = orders.findIndex(order => order.id === orderId);

    if (index !== -1) {
      orders[index] = {
        ...orders[index],
        status,
        updatedAt: new Date()
      };
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  },
  
  async getAll(): Promise<any[]> {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return parsed.map((order: any) => ({
        ...order,
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
        updatedAt: order.updatedAt ? new Date(order.updatedAt) : new Date()
      }));
    } catch {
      return [];
    }
  }
};