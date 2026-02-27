"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Upload, X } from "lucide-react";
import Image from "next/image";
import { productsApi, Product } from "../../lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    oldPrice: "",
    brand: "",
    category: "oil",
    stock: "0",
    inStock: true,
    images: [] as string[],
    description: "",
    crossNumbers: ""  // ✅ ДОБАВЛЕНО
  });

  useEffect(() => {
    setProducts(productsApi.getAll());
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, result]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
      inStock: formData.inStock,
      image: formData.images[0] || "https://via.placeholder.com/300x300?text=No+Image",
      images: formData.images,
      description: formData.description,
      crossNumbers: formData.crossNumbers ? formData.crossNumbers.split(',').map(s => s.trim()).filter(s => s) : [],  // ✅ ДОБАВЛЕНО
      rating: 0,
      reviewsCount: 0
    };

    if (editingProduct) {
      productsApi.update(editingProduct.id, productData);
    } else {
      productsApi.create(productData);
    }

    setProducts(productsApi.getAll());
    setIsModalOpen(false); 
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: "",
      price: "",
      oldPrice: "",
      brand: "",
      category: "oil",
      stock: "0",
      inStock: true,
      images: [],
      description: "",
      crossNumbers: ""  // ✅ ДОБАВЛЕНО
    });
  };  // ✅ ЗАКРЫТА ФУНКЦИЯ

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku || "",
      price: product.price.toString(),
      oldPrice: product.oldPrice?.toString() || "",
      brand: product.brand,
      category: product.category,
      stock: product.stock?.toString() || "0",
      inStock: product.inStock || (product.stock && product.stock > 0) || false,
      images: product.images?.length ? product.images : product.image ? [product.image] : [],
      description: product.description || "",
      crossNumbers: product.crossNumbers?.join(', ') || ""  // ✅ ДОБАВЛЕНО
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить товар?")) {
      productsApi.delete(id);
      setProducts(productsApi.getAll());
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: "",
                sku: "",
                price: "",
                oldPrice: "",
                brand: "",
                category: "oil",
                stock: "0",
                inStock: true,
                images: [],
                description: "",
                crossNumbers: ""  // ✅ ДОБАВЛЕНО
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Добавить товар
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию или бренду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Фото</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Бренд</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Цена</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Количество</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Наличие</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-gray-100 rounded relative overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">Нет фото</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.sku || "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                    <td className="px-4 py-3 font-medium">{product.price.toLocaleString()} ₸</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.stock || 0} шт.</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (product.inStock || (product.stock && product.stock > 0))
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {(product.inStock || (product.stock && product.stock > 0)) ? 'В наличии' : 'Нет'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingProduct ? "Редактировать товар" : "Добавить товар"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фото товара ({formData.images.length})
                </label>

                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden group">
                        <Image
                          src={img}
                          alt={`Фото ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-0.5">
                            Главное
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors w-fit">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Добавить фото</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">Первое фото будет главным</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Бренд</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Артикул (SKU)</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Количество на складе</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цена, ₸</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Старая цена</label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="oil">Моторные масла</option>
                  <option value="filter">Фильтры</option>
                  <option value="brake">Тормозные системы</option>
                  <option value="suspension">Подвеска</option>
                  <option value="electrical">Электрика</option>
                  <option value="engine">Двигатель</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* ✅ ДОБАВЛЕНО ПОЛЕ КРОСС-НОМЕРА */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Кросс-номера (через запятую)
                </label>
                <textarea
                  rows={2}
                  value={formData.crossNumbers}
                  onChange={(e) => setFormData({ ...formData, crossNumbers: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="OC91, OC92, BOSCH-123"
                />
                <p className="text-xs text-gray-500 mt-1">Введите SKU аналогов через запятую</p>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">В наличии</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}