import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Страница не найдена | AutoParts.kz',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            К сожалению, запрашиваемая страница не существует или была удалена
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              На главную
            </Link>
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              В каталог
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}