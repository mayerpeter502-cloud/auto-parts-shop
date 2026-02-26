"use client";
import { useState } from "react";

interface CarSelectorProps {
  onSelect: (brand: string, model: string, year: string) => void;
}

const carDatabase = {
  brands: ["Toyota", "Lexus", "BMW", "Mercedes", "Hyundai", "Kia", "Volkswagen", "Audi"],
  models: {
    Toyota: ["Camry", "Corolla", "RAV4", "Land Cruiser", "Hilux"],
    Lexus: ["ES", "RX", "LX", "NX", "GX"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "X6"],
    Mercedes: ["C-Class", "E-Class", "GLE", "GLC", "S-Class"],
    Hyundai: ["Accent", "Elantra", "Tucson", "Santa Fe", "Creta"],
    Kia: ["Rio", "Optima", "Sportage", "Sorento", "Cerato"],
    Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Jetta"],
    Audi: ["A3", "A4", "A6", "Q5", "Q7"]
  },
  years: Array.from({ length: 25 }, (_, i) => 2025 - i)
};

export function CarSelector({ onSelect }: CarSelectorProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleSelect = () => {
    if (brand && model && year) {
      onSelect(brand, model, year);
    }
  };

  const reset = () => {
    setBrand("");
    setModel("");
    setYear("");
  };

  return (
    <div className="space-y-3">
      <select
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
          setModel("");
          setYear("");
        }}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Выберите марку</option>
        {carDatabase.brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      {brand && (
        <select
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setYear("");
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Выберите модель</option>
          {carDatabase.models[brand as keyof typeof carDatabase.models]?.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      )}

      {model && (
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Выберите год</option>
          {carDatabase.years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      )}

      {brand && model && year && (
        <button
          onClick={handleSelect}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Применить
        </button>
      )}

      {(brand || model || year) && (
        <button
          onClick={reset}
          className="w-full text-gray-500 text-sm hover:text-gray-700"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}