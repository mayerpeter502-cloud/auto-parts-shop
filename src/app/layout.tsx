import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

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
    icon: "/favicon.ico",
  },
};

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}