export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  deliveryMethod: string;
  paymentMethod: string;
}

const orders: Order[] = [];

export const ordersApi = {
  getAll: (): Order[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("orders");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  },

  getById: (id: string): Order | undefined => {
    const orders = ordersApi.getAll();
    return orders.find(o => o.id === id);
  },

  getByUser: (userId: string): Order[] => {
    const orders = ordersApi.getAll();
    return orders.filter(o => o.userId === userId);
  },

  create: (order: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const orders = ordersApi.getAll();
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  },

  updateStatus: (id: string, status: Order["status"]): void => {
    const orders = ordersApi.getAll();
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  },

  delete: (id: string): void => {
    const orders = ordersApi.getAll();
    const filtered = orders.filter(o => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(filtered));
  }
};