import { Inter } from 'next/font/google';
import './globals.css';
import CompareWidget from '@/components/CompareWidget';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'AutoParts.kz - Интернет-магазин автозапчастей',
  description: 'Оригинальные автозапчасти и качественные аналоги для всех марок автомобилей. Доставка по Казахстану.',
  keywords: 'автозапчасти, купить запчасти, масло, фильтры, тормоза, двигатель',
  openGraph: {
    title: 'AutoParts.kz - Интернет-магазин автозапчастей',
    description: 'Оригинальные автозапчасти для всех марок автомобилей',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <CompareWidget />
      </body>
    </html>
  );
}