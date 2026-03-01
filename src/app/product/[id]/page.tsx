import { Metadata } from "next";
import { getProductById } from "../../lib/api";
import ProductPageContent from "./ProductPageContent";

// ← ДОБАВИТЬ: Динамические метатеги для товара
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: "Товар не найден | AutoParts.kz",
      description: "Запрашиваемый товар не найден в нашем каталоге.",
    };
  }

  return {
    title: `${product.name} — купить в Казахстане | AutoParts.kz`,
    description: `${product.description || `Купить ${product.name} по цене ${product.price.toLocaleString()} ₸. Бренд: ${product.brand}. В наличии ${product.stock || 0} шт.`}`,
    keywords: [
      product.name,
      product.brand,
      product.sku || "",
      product.category,
      "автозапчасти",
      "Казахстан"
    ].filter(Boolean),
    openGraph: {
  title: `${product.name} — AutoParts.kz`,
  description: `${product.brand} | ${product.price.toLocaleString()} ₸`,
  type: "article",  // ← Заменить на "article"
  locale: "ru_KZ",
  siteName: "AutoParts.kz",
  images: product.image ? [{
    url: product.image,
    width: 800,
    height: 600,
    alt: product.name,
  }] : undefined,
},
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — AutoParts.kz`,
      description: `${product.brand} | ${product.price.toLocaleString()} ₸`,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Товар не найден</h1>
          <p className="text-gray-500 mb-4">Запрашиваемый товар не существует или был удален.</p>
          <a href="/catalog" className="text-blue-600 hover:underline">
            ← Вернуться в каталог
          </a>
        </div>
      </div>
    );
  }

  return <ProductPageContent product={product} />;
}