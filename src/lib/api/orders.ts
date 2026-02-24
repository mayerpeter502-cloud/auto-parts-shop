import { Order } from '@/types';

const ORDERS_STORAGE_KEY = 'auto_parts_orders';

export const orderApi = {
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (typeof window === 'undefined') throw new Error('Server side');
    
    const orders = await this.getAll();
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return newOrder.id;
  },

  async getByUser(userId: string): Promise<Order[]> {
    if (typeof window === 'undefined') return [];
    
    const orders = await this.getAll();
    return orders.filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(orderId: string): Promise<Order | null> {
    if (typeof window === 'undefined') return null;
    
    const orders = await this.getAll();
    return orders.find(order => order.id === orderId) || null;
  },

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
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

  async getAll(): Promise<Order[]> {
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