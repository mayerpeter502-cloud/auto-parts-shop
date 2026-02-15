"use client";

import { useState } from "react";
import { Search, Car, CheckCircle, XCircle } from "lucide-react";
import { productsApi } from "../lib/api";

export default function VinCheckPage() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация проверки VIN
    setTimeout(() => {
      const products = productsApi.getAll();
      setResult({
        vin: vin.toUpperCase(),
        car: "Toyota Camry 2018",
        compatibleProducts: products.slice(0, 4),
        found: true
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Проверка по VIN</h1>
        
        <form onSubmit={handleCheck} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Введите VIN номер (17 символов)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 uppercase"
              maxLength={17}
            />
            <button
              type="submit"
              disabled={loading || vin.length < 17}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? "Проверка..." : "Проверить"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Пример: JTDBU4EE3B9123456</p>
        </form>

        {result && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">{result.car}</h2>
                <p className="text-gray-500">VIN: {result.vin}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
            </div>
            
            <h3 className="font-semibold mb-4">Подходящие запчасти:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.compatibleProducts.map((product: any) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-blue-600 font-bold">{product.price.toLocaleString()} ₸</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}