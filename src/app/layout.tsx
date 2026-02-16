import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "AutoParts.kz - Интернет-магазин автозапчастей",
    template: "%s | AutoParts.kz"
  },
  description: "Широкий выбор автозапчастей с доставкой по Казахстану. Моторные масла, фильтры, тормозные системы и многое другое.",
  keywords: ["автозапчасти", "моторное масло", "фильтры", "тормоза", "доставка", "Казахстан", "Алматы"],
  authors: [{ name: "AutoParts.kz" }],
  creator: "AutoParts.kz",
  metadataBase: new URL("https://autoparts.kz"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://autoparts.kz",
    siteName: "AutoParts.kz",
    title: "AutoParts.kz - Интернет-магазин автозапчастей",
    description: "Широкий выбор автозапчастей с доставкой по Казахстану",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}