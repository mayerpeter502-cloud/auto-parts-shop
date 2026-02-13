import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'AutoParts.kz - Интернет-магазин автозапчастей',
  description: 'Оригинальные и качественные автозапчасти с доставкой по Казахстану. Подбор по VIN, низкие цены, гарантия.',
  keywords: 'автозапчасти, купить запчасти, подбор по VIN, масло, фильтры, тормозные колодки',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}