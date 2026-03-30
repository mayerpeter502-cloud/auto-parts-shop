import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { GarageProvider } from '../contexts/GarageContext';
import LayoutWrapper from '@/components/LayoutWrapper'; // Импортируем обертку

export const metadata: Metadata = {
  title: {
    default: "AutoParts.kz — Автозапчасти в Казахстане",
    template: "%s | AutoParts.kz",
  },
  description: "Интернет-магазин автозапчастей в Казахстане. Масла, фильтры, тормозные системы. Доставка по Алматы и всему Казахстану.",
  keywords: ["автозапчасти", "Казахстан", "Алматы", "масла", "фильтры", "тормозные системы"],
  authors: [{ name: "AutoParts.kz" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: "AutoParts.kz",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <GarageProvider>
              {/* Оборачиваем children в наш новый компонент */}
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </GarageProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}