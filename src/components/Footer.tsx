import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">AutoParts.kz</h3>
            <p className="text-gray-400 text-sm mb-4">Интернет-магазин автозапчастей в Казахстане.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">О нас</Link></li>
              <li><Link href="/delivery" className="hover:text-white">Доставка</Link></li>
              <li><Link href="/contacts" className="hover:text-white">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>+7 (777) 123-45-67</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>info@autoparts.kz</span></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Алматы</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">© 2024 AutoParts.kz</div>
      </div>
    </footer>
  );
}