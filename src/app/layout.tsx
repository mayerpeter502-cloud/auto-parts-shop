// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'AutoParts.kz - Автозапчасти с доставкой',
  description: 'Интернет-магазин автозапчастей для вашего автомобиля',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ToastProvider />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}