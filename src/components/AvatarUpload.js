'use client';

import { useState, useRef } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import LazyImage from './LazyImage';

export default function AvatarUpload({ currentAvatar, onUpload }) {
  const [preview, setPreview] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { addToast } = useToast();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Валидация
    if (!file.type.startsWith('image/')) {
      addToast('Пожалуйста, выберите изображение', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addToast('Размер файла не должен превышать 5MB', 'error');
      return;
    }

    // Предпросмотр
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Имитация загрузки
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUpload?.(reader.result);
      addToast('Аватар успешно обновлен', 'success');
    }, 1500);
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload?.(null);
    addToast('Аватар удален', 'info');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
          {preview ? (
            <LazyImage
              src={preview}
              alt="Аватар"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
              ?
            </div>
          )}
        </div>
        
        {loading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Camera className="w-5 h-5" />
        </button>

        {preview && (
          <button
            onClick={handleRemove}
            className="absolute top-0 right-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="mt-3 text-sm text-gray-500 text-center">
        JPG, PNG до 5MB
      </p>
    </div>
  );
}