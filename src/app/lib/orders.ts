export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
  items: OrderItem[];
  customer?: {
    name: string;
    phone: string;
  };
}

const ORDERS_KEY = 'autoparts_orders';

export const ordersApi = {
  getAll: (): Order[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ORDERS_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  },

  // ← ДОБАВИТЬ: Метод getById
  getById: (orderId: string): Order | undefined => {
    const orders = ordersApi.getAll();
    return orders.find(order => order.id === orderId);
  },

  getByUser: (userId: string): Order[] => {
    const orders = ordersApi.getAll();
    return orders.filter(order => order.userId === userId || order.userId === 'guest');
  },

  create: (order: Omit<Order, 'id' | 'createdAt'>): Order => {
    const orders = ordersApi.getAll();
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('ordersUpdated'));
    return newOrder;
  },

  updateStatus: (orderId: string, status: Order['status']): void => {
    const orders = ordersApi.getAll();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      window.dispatchEvent(new CustomEvent('ordersUpdated'));
    }
  },

  delete: (orderId: string): void => {
    const orders = ordersApi.getAll();
    const filtered = orders.filter(o => o.id !== orderId);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('ordersUpdated'));
  }
};