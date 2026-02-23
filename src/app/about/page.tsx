import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
  description: "Информация о компании AutoParts.kz",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">О нас</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            AutoParts.kz — крупнейший интернет-магазин автозапчастей в Казахстане.
            Мы предлагаем широкий ассортимент оригинальных и неоригинальных запчастей
            для всех марок автомобилей.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Наши преимущества</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Более 50 000 товаров в наличии</li>
            <li>Быстрая доставка по всему Казахстану</li>
            <li>Гарантия качества на все товары</li>
            <li>Профессиональная консультация специалистов</li>
            <li>Удобный подбор по VIN и марке автомобиля</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Контакты</h2>
          <p className="text-gray-700">
            Телефон: +7 (777) 123-45-67<br />
            Email: info@autoparts.kz<br />
            Адрес: Алматы, пр. Назарбаева 123
          </p>
        </div>
      </div>
    </div>
  );
}
