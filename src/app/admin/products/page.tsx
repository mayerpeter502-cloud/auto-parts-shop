"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { productsApi, categories } from "../../lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(productsApi.getAll());
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить товар?")) {
      productsApi.delete(id);
      loadProducts();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление товарами</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Добавить товар
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по названию или артикулу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4">Товар</th>
              <th className="text-left py-3 px-4">Артикул</th>
              <th className="text-left py-3 px-4">Цена</th>
              <th className="text-left py-3 px-4">Наличие</th>
              <th className="text-left py-3 px-4">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.brand}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.sku}</td>
                <td className="py-3 px-4 font-medium">{product.price.toLocaleString()} ₸</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock > 0 ? `${product.stock} шт` : "Нет в наличии"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Товары не найдены
          </div>
        )}
      </div>
    </div>
  );
}