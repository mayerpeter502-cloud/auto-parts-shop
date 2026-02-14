"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import { productsApi, categories } from "../../lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    oldPrice: "",
    brand: "",
    category: categories[0],
    stock: "",
    description: "",
    rating: "4.5",
    reviews: "0"
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(productsApi.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      brand: formData.brand,
      category: formData.category,
      stock: Number(formData.stock),
      description: formData.description,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      image: "/images/product.jpg",
      specifications: {},
      compatibility: []
    };

    if (editingProduct) {
      productsApi.update(editingProduct.id, productData);
    } else {
      productsApi.create(productData);
    }

    closeForm();
    loadProducts();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: "",
      price: "",
      oldPrice: "",
      brand: "",
      category: categories[0],
      stock: "",
      description: "",
      rating: "4.5",
      reviews: "0"
    });
  };

 const handleEdit = (product: any) => {
  setEditingProduct(product);
  setFormData({
    name: product.name || "",
    sku: product.sku || "",
    price: product.price?.toString() || "",
    oldPrice: product.oldPrice?.toString() || "",
    brand: product.brand || "",
    category: product.category || categories[0],
    stock: product.stock?.toString() || "",
    description: product.description || "",
    rating: product.rating?.toString() || "4.5",
    reviews: product.reviews?.toString() || "0"
  });
  setShowForm(true);
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

      {/* Products - Desktop */}
<div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
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
          <td className="py-3 px-4 font-medium">{product.price?.toLocaleString()} ₸</td>
          <td className="py-3 px-4">
            <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.stock > 0 ? `${product.stock} шт` : "Нет"}
            </span>
          </td>
          <td className="py-3 px-4">
            <div className="flex gap-2">
              <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Products - Mobile */}
<div className="md:hidden space-y-4">
  {filteredProducts.map((product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <div className="font-medium text-sm truncate">{product.name}</div>
          <div className="text-xs text-gray-500">{product.brand}</div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
          <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">{product.sku}</span>
        <span className="font-medium">{product.price?.toLocaleString()} ₸</span>
      </div>
      <div className="mt-2">
        <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {product.stock > 0 ? `${product.stock} шт` : "Нет"}
        </span>
      </div>
    </div>
  ))}
</div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingProduct ? "Редактировать товар" : "Добавить товар"}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Название</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Артикул (SKU)</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Цена</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Старая цена</label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Бренд</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Категория</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Наличие (шт)</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Описание</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? "Сохранить" : "Добавить"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}