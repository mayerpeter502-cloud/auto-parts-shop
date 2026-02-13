'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, LogOut } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import Link from 'next/link';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  deliveryMethod: 'courier' | 'pickup';
  paymentMethod: 'card' | 'cash';
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Ожидает',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменен'
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Иван Петров',
    customerPhone: '+7 777 123 4567',
    customerEmail: 'ivan@example.com',
    address: 'ул. Абая 123, кв 45',
    city: 'Алматы',
    total: 14300,
    status: 'pending',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    createdAt: '2024-02-13T10:30:00',
    items: [
      { id: '1', name: 'Моторное масло Mobil 1 5W-30', sku: 'MOB-5W30-4L', price: 12500, quantity: 1 },
      { id: '2', name: 'Фильтр масляный Bosch', sku: 'BOS-OF-045', price: 1800, quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Анна Сидорова',
    customerPhone: '+7 701 987 6543',
    address: 'пр. Назарбаева 45, офис 12',
    city: 'Астана',
    total: 8900,
    status: 'processing',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    createdAt: '2024-02-13T09:15:00',
    items: [
      { id: '3', name: 'Тормозные колодки Brembo', sku: 'BRE-BP-1234', price: 8900, quantity: 1 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Мария Ким',
    customerPhone: '+7 747 555 8899',
    customerEmail: 'maria@example.com',
    address: 'ул. Достык 78',
    city: 'Алматы',
    total: 28500,
    status: 'shipped',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    createdAt: '2024-02-12T16:45:00',
    items: [
      { id: '6', name: 'Аккумулятор Varta Blue Dynamic', sku: 'VAR-BD-60', price: 28500, quantity: 1 }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Алексей Иванов',
    customerPhone: '+7 705 111 2233',
    address: 'мкр. Аксай-4, дом 12',
    city: 'Алматы',
    total: 3200,
    status: 'delivered',
    deliveryMethod: 'courier',
    paymentMethod: 'cash',
    createdAt: '2024-02-10T14:20:00',
    items: [
      { id: '4', name: 'Свечи зажигания NGK Iridium', sku: 'NGK-ILZK-7', price: 3200, quantity: 1 }
    ]
  }
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const { isAdmin, loading: adminLoading, logout } = useAdmin();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push('/login');
      return;
    }
    
    if (!adminLoading && isAdmin) {
      // Загрузка из localStorage или мок-данные
      const saved = localStorage.getItem('auto_parts_orders');
      if (saved) {
        try {
          setOrders(JSON.parse(saved));
        } catch {
          setOrders(mockOrders);
          localStorage.setItem('auto_parts_orders', JSON.stringify(mockOrders));
        }
      } else {
        setOrders(mockOrders);
        localStorage.setItem('auto_parts_orders', JSON.stringify(mockOrders));
      }
      setLoading(false);
    }
  }, [adminLoading, isAdmin, router]);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('auto_parts_orders', JSON.stringify(updated));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Заказы</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:underline">На сайт</Link>
            <button onClick={logout} className="flex items-center gap-2 text-red-600">
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по номеру, имени или телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="processing">В обработке</option>
            <option value="shipped">Отправлен</option>
            <option value="delivered">Доставлен</option>
            <option value="cancelled">Отменен</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">№ Заказа</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Клиент</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Сумма</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Статус</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Дата</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Заказы не найдены
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-medium">{order.total.toLocaleString()} ₸</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('ru-KZ')}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Заказ {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Информация о клиенте</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="text-gray-500">Имя:</span> {selectedOrder.customerName}</p>
                  <p><span className="text-gray-500">Телефон:</span> {selectedOrder.customerPhone}</p>
                  {selectedOrder.customerEmail && (
                    <p><span className="text-gray-500">Email:</span> {selectedOrder.customerEmail}</p>
                  )}
                  <p><span className="text-gray-500">Адрес:</span> {selectedOrder.address}, {selectedOrder.city}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Товары</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Арт: {item.sku} × {item.quantity}</p>
                      </div>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₸</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  <span className="font-semibold">Итого:</span>
                  <span className="text-xl font-bold text-blue-600">{selectedOrder.total.toLocaleString()} ₸</span>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Доставка</span>
                  </div>
                  <p className="font-medium">
                    {selectedOrder.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Оплата</span>
                  </div>
                  <p className="font-medium">
                    {selectedOrder.paymentMethod === 'card' ? 'Картой' : 'Наличными'}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-semibold mb-3">Изменить статус</h3>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(statusLabels) as OrderStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.status === status
                          ? statusColors[status]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'pending' && <Package className="w-4 h-4 inline mr-1" />}
                      {status === 'processing' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                      {status === 'shipped' && <Truck className="w-4 h-4 inline mr-1" />}
                      {status === 'delivered' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                      {status === 'cancelled' && <XCircle className="w-4 h-4 inline mr-1" />}
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}