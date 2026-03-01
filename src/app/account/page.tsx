import { Metadata } from "next";
import AccountPageContent from "./AccountPageContent";

export const metadata: Metadata = {
  title: "Личный кабинет | AutoParts.kz",
  description: "Управление заказами, избранным и настройками профиля.",
  robots: { index: false }, // Не индексировать ЛК
};

export default function AccountPage() {
  return <AccountPageContent />;
}