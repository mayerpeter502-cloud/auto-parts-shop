"use client";

import { useState } from "react";
import { Car, ChevronDown, Search } from "lucide-react";

const carBrands = [
  "Toyota", "BMW", "Mercedes-Benz", "Audi", "Volkswagen",
  "Hyundai", "Kia", "Nissan", "Honda", "Mazda", "Lexus", "Ford"
];

const carModels: Record<string, string[]> = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Prado"],
  "BMW": ["X5", "X3", "3 Series", "5 Series", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  "Audi": ["A4", "A6", "Q5", "Q7", "A3"],
  "Volkswagen": ["Passat", "Tiguan", "Polo", "Golf", "Touareg"],
  "Hyundai": ["Solaris", "Creta", "Tucson", "Santa Fe", "Elantra"],
  "Kia": ["Rio", "Sportage", "Seltos", "K5", "Sorento"],
  "Nissan": ["Qashqai", "X-Trail", "Teana", "Almera", "Patrol"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  "Mazda": ["CX-5", "CX-9", "Mazda3", "Mazda6", "CX-30"],
  "Lexus": ["RX", "NX", "ES", "LX", "IS"],
  "Ford": ["Focus", "Mondeo", "Kuga", "Explorer", "Mustang"]
};

const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

interface CarSelectorProps {
  onSelect: (brand: string, model: string, year: number) => void;
  selectedBrand?: string;
  selectedModel?: string;
  selectedYear?: number;
}

export default function CarSelector({ onSelect, selectedBrand, selectedModel, selectedYear }: CarSelectorProps) {
  const [brand, setBrand] = useState(selectedBrand || "");
  const [model, setModel] = useState(selectedModel || "");
  const [year, setYear] = useState(selectedYear || 2024);
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    if (brand && model) {
      onSelect(brand, model, year);
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setBrand("");
    setModel("");
    setYear(2024);
    onSelect("", "", 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Car className="w-5 h-5" />
          <span className="font-medium">
            {brand && model ? `${brand} ${model} ${year}` : "Подбор по автомобилю"}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Марка</label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Выберите марку</option>
                {carBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Модель</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!brand}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Выберите модель</option>
                {brand && carModels[brand]?.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Год</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApply}
              disabled={!brand || !model}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Применить
            </button>
            {(brand || model) && (
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}