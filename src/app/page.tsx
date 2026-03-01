import { Metadata } from "next";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  title: "AutoParts.kz — Автозапчасти в Казахстане | Масла, Фильтры, Тормозные системы",
  description: "Интернет-магазин автозапчастей в Казахстане. Большой выбор масел, фильтров, тормозных систем. Доставка по Алматы и всему Казахстану. Гарантия качества.",
  keywords: ["автозапчасти", "масла", "фильтры", "тормозные системы", "Казахстан", "Алматы"],
  authors: [{ name: "AutoParts.kz" }],
  openGraph: {
    title: "AutoParts.kz — Автозапчасти в Казахстане",
    description: "Интернет-магазин автозапчастей. Доставка по всему Казахстану.",
    type: "website",
    locale: "ru_KZ",
    siteName: "AutoParts.kz",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoParts.kz — Автозапчасти в Казахстане",
    description: "Интернет-магазин автозапчастей. Доставка по всему Казахстану.",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}