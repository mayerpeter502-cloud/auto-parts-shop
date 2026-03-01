import { Metadata } from "next";
import { Suspense } from "react";
import { 
  getProducts, 
  Product, 
  getCategoryBySlug, 
  getCategoryParents,
  getAllCategories,
  getChildCategories 
} from "../lib/api";
import CatalogContent from "./CatalogContent";

// ← ДОБАВИТЬ: Динамические метатеги для каталога
export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}): Promise<Metadata> {
  const category = searchParams.category ? getCategoryBySlug(searchParams.category) : null;
  const searchQuery = searchParams.search;

  if (searchQuery) {
    return {
      title: `Поиск: ${searchQuery} | AutoParts.kz`,
      description: `Результаты поиска по запросу "${searchQuery}". Автозапчасти в Казахстане.`,
    };
  }

  if (category) {
    return {
      title: `${category.name} — купить в Казахстане | AutoParts.kz`,
      description: `Большой выбор категории "${category.name}". Доставка по Алматы и всему Казахстану. Гарантия качества.`,
      keywords: [category.name, category.slug, "автозапчасти", "Казахстан"],
    };
  }

  return {
    title: "Каталог автозапчастей | AutoParts.kz",
    description: "Все автозапчасти в одном месте. Масла, фильтры, тормозные системы, подвеска и многое другое.",
  };
}

export default function CatalogPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка...</p>
        </div>
      </div>
    }>
      <CatalogContent searchParams={searchParams} />
    </Suspense>
  );
}