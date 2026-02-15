'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productApi } from '@/lib/api/products';

export default function NewProduct() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    sku: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await productApi.create({
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      category: form.category,
      brand: form.brand,
      stock: Number(form.stock),
      description: form.description,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
      specifications: {},
      compatibility: [],
      rating: 0,
      reviewsCount: 0
    });
    
    router.push('/admin/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Новый товар</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Название</label>
          <input required className="w-full p-2 border rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input required className="w-full p-2 border rounded" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Бренд</label>
            <input required className="w-full p-2 border rounded" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Цена</label>
            <input required type="number" className="w-full p-2 border rounded" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Наличие</label>
            <input required type="number" className="w-full p-2 border rounded" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Категория</label>
          <select required className="w-full p-2 border rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="">Выберите</option>
            <option value="maslo">Масло</option>
            <option value="filtr">Фильтры</option>
            <option value="tormoza">Тормоза</option>
            <option value="podveska">Подвеска</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Описание</label>
          <textarea rows={4} className="w-full p-2 border rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded hover:bg-gray-50">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}