import { Metadata } from "next";
import AccountPageContent from "./AccountPageContent";

export const metadata: Metadata = {
  title: "Личный кабинет | AutoParts.kz",
  description: "Управление заказами, избранным и настройками профиля.",
  robots: { index: false }, // Не индексировать ЛК
};

<Link href="/account/garage" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md">
  <Car className="w-8 h-8 text-blue-600 mb-3" />
  <h3 className="font-semibold text-lg mb-1">Мой гараж</h3>
  <p className="text-gray-500 text-sm">Управление автомобилями</p>
</Link>

export default function AccountPage() {
  return <AccountPageContent />;
}