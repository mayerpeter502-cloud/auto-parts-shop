'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productApi } from '@/lib/api/products';
import { Product } from '@/types';

export default function NewProduct() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    oldPrice: '',
    category: '',
    brand: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await productApi.create({
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        category: formData.category,
        brand: formData.brand,
        stock: Number(formData.stock),
        description: formData.description,
        image: formData.image,
        specifications: {},
        compatibility: [],
        rating: 0,
        reviewsCount: 0
      });
      router.push('/admin/products');
    } catch (error) {
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full p-2 border rounded focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Новый товар</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Название *</label>
          <input
            type="text"
            required
            className={inputClass}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input
              type="text"
              required
              className={inputClass}
              value={formData.sku}
              onChange={e => setFormData({...formData, sku: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Бренд *</label>
            <input
              type="text"
              required
              className={inputClass}
              value={formData.brand}
              onChange={e => setFormData({...formData, brand: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Цена *</label>
            <input
              type="number"
              required
              className={inputClass}
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Старая цена</label>
            <input
              type="number"
              className={inputClass}
              value={formData.oldPrice}
              onChange={e => setFormData({...formData, oldPrice: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Наличие *</label>
            <input
              type="number"
              required
              className={inputClass}
              value={formData.stock}
              onChange={e => setFormData({...formData, stock: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Категория *</label>
          <select
            required
            className={inputClass}
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Выберите</option>
            <option value="maslo">Масло</option>
            <option value="filtr">Фильтры</option>
            <option value="tormoza">Тормоза</option>
            <option value="podveska">Подвеска</option>
            <option value="dvigatel">Двигатель</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Описание</label>
          <textarea
            rows={4}
            className={inputClass}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded hover:bg-gray-50"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}