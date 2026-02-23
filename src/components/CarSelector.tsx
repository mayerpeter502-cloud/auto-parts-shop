"use client";

import { useState, useRef, useEffect } from "react";

const carDatabase = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Hilux"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot"],
  "BMW": ["3 Series", "5 Series", "X3", "X5", "X6"],
  "Mercedes": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  "Volkswagen": ["Golf", "Passat", "Tiguan", "Polo"],
  "Kia": ["Rio", "Optima", "Sportage", "Sorento"],
  "Hyundai": ["Solaris", "Elantra", "Tucson", "Santa Fe"]
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

interface CarSelectorProps {
  onSelect: (brand: string, model: string, year: string) => void;
}

export function CarSelector({ onSelect }: CarSelectorProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const [showYearSuggestions, setShowYearSuggestions] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setShowBrandSuggestions(false);
      }
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setShowModelSuggestions(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const brands = Object.keys(carDatabase);
  const models = brand ? carDatabase[brand as keyof typeof carDatabase] || [] : [];

  const handleBrandSelect = (b: string) => {
    setBrand(b);
    setModel("");
    setShowBrandSuggestions(false);
  };

  const handleModelSelect = (m: string) => {
    setModel(m);
    setShowModelSuggestions(false);
  };

  const handleYearSelect = (y: string) => {
    setYear(y);
    setShowYearSuggestions(false);
  };

  const handleSubmit = () => {
    if (brand && model && year) {
      onSelect(brand, model, year);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative" ref={brandRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Марка</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setShowBrandSuggestions(true);
          }}
          onFocus={() => setShowBrandSuggestions(true)}
          placeholder="Выберите марку"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        {showBrandSuggestions && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-auto">
            {brands.filter(b => b.toLowerCase().includes(brand.toLowerCase())).map(b => (
              <button
                key={b}
                onClick={() => handleBrandSelect(b)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={modelRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Модель</label>
        <input
          type="text"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setShowModelSuggestions(true);
          }}
          onFocus={() => brand && setShowModelSuggestions(true)}
          placeholder={brand ? "Выберите модель" : "Сначала выберите марку"}
          disabled={!brand}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        {showModelSuggestions && brand && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-auto">
            {models.filter(m => m.toLowerCase().includes(model.toLowerCase())).map(m => (
              <button
                key={m}
                onClick={() => handleModelSelect(m)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={yearRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Год выпуска</label>
        <input
          type="text"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setShowYearSuggestions(true);
          }}
          onFocus={() => setShowYearSuggestions(true)}
          placeholder="Выберите год"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        {showYearSuggestions && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-auto">
            {years.filter(y => y.includes(year)).map(y => (
              <button
                key={y}
                onClick={() => handleYearSelect(y)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!brand || !model || !year}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Подобрать запчасти
      </button>
    </div>
  );
}
