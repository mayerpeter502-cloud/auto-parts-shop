'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit2, Trash2, LogOut } from 'lucide-react';
import { Product } from '@/types';
import { productApi } from '@/lib/api/products';
import { useAdmin } from '@/hooks/useAdmin';
import Link from 'next/link';

export default function AdminProductsPage() {
  const router = useRouter();
  const { isAdmin, loading: adminLoading, logout } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push('/login');
      return;
    }
    
    if (!adminLoading && isAdmin) {
      loadProducts();
    }
  }, [adminLoading, isAdmin, router]);

  const loadProducts = () => {
    try {
      productApi.seedData();
      const data = productApi.getAll();
      console.log('Loaded products:', data); // для отладки
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) {
      productApi.delete(id);
      loadProducts();
    }
  };

  const filteredProducts = Array.isArray(products) 
    ? products.filter(p => 
        p?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p?.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          <h1 className="text-2xl font-bold">Админ-панель</h1>
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Добавить товар
          </Link>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Фото</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Артикул</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Цена</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Категория</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {!Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Товары не найдены
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product?.id || Math.random()} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img
                          src={product?.image || '/placeholder.png'}
                          alt={product?.name || 'Product'}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm">{product?.name}</div>
                        <div className="text-xs text-gray-500">{product?.brand}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product?.sku}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {product?.price?.toLocaleString()} ₸
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product?.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/edit/${product?.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => product?.id && handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}