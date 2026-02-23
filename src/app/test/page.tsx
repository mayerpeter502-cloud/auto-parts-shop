'use client';

import { useEffect, useState } from 'react';
import { db, auth, storage } from '@/lib/firebase';

export default function TestPage() {
  const [status, setStatus] = useState('Проверка...');

  useEffect(() => {
    try {
      if (db && auth && storage) {
        setStatus('✅ Firebase подключен!');
      } else {
        setStatus('❌ Firebase не инициализирован');
      }
    } catch (error) {
      setStatus(`❌ Ошибка: ${error}`);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест Firebase</h1>
      <p className="text-lg">{status}</p>
    </div>
  );
}
