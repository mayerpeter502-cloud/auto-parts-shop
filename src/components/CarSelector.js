'use client';

import { useState } from 'react';
import { Car, ChevronDown, X } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

// Моковые данные
const carData = {
  Toyota: {
    models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Hilux'],
    years: { Camry: [2024, 2023, 2022, 2021, 2020], Corolla: [2024, 2023, 2022, 2021] }
  },
  Kia: {
    models: ['K5', 'Sportage', 'Sorento', 'Rio', 'Cerato'],
    years: { K5: [2024, 2023, 2022, 2021], Sportage: [2024, 2023, 2022] }
  },
  Hyundai: {
    models: ['Sonata', 'Tucson', 'Santa Fe', 'Creta', 'Elantra'],
    years: { Sonata: [2024, 2023, 2022, 2021], Tucson: [2024, 2023, 2022] }
  },
  BMW: {
    models: ['X5', 'X3', '5 Series', '3 Series', 'X6'],
    years: { 'X5': [2024, 2023, 2022, 2021, 2020], 'X3': [2024, 2023, 2022] }
  },
  Mercedes: {
    models: ['E-Class', 'C-Class', 'GLE', 'GLC', 'S-Class'],
    years: { 'E-Class': [2024, 2023, 2022, 2021], 'GLE': [2024, 2023, 2022] }
  }
};

export default function CarSelector({ onSelect, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ brand: '', model: '', year: '' });
  const { addToast } = useToast();

  const brands = Object.keys(carData);
  const models = selected.brand ? carData[selected.brand].models : [];
  const years = selected.brand && selected.model 
    ? carData[selected.brand].years[selected.model] || [2024, 2023, 2022, 2021, 2020]
    : [];

  const handleBrandSelect = (brand) => {
    setSelected({ brand, model: '', year: '' });
    setStep(2);
  };

  const handleModelSelect = (model) => {
    setSelected({ ...selected, model, year: '' });
    setStep(3);
  };

  const handleYearSelect = (year) => {
    const finalSelection = { ...selected, year };
    setSelected(finalSelection);
    onSelect?.(finalSelection);
    addToast(`Выбрано: ${finalSelection.brand} ${finalSelection.model} ${finalSelection.year}`, 'success');
    setIsOpen(false);
    setStep(1);
  };

  const reset = () => {
    setSelected({ brand: '', model: '', year: '' });
    setStep(1);
  };

  if (compact) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Car className="w-5 h-5" />
        <span className="hidden sm:inline">
          {selected.brand ? `${selected.brand} ${selected.model}` : 'Подбор по авто'}
        </span>
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
          isOpen 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            <Car className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500 uppercase font-medium">Ваш автомобиль</div>
            <div className="font-medium text-gray-900">
              {selected.brand 
                ? `${selected.brand} ${selected.model} ${selected.year}` 
                : 'Выберите автомобиль'}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Выпадающий селектор */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          {/* Шаг 1: Марка */}
          {step === 1 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Выберите марку</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{brand}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 2: Модель */}
          {step === 2 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  ← Назад
                </button>
                <h3 className="font-bold text-gray-900">{selected.brand} — выберите модель</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {models.map(model => (
                  <button
                    key={model}
                    onClick={() => handleModelSelect(model)}
                    className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{model}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 3: Год — ВЕРТИКАЛЬНЫЙ СПИСОК */}
          {step === 3 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setStep(2)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  ← Назад
                </button>
                <h3 className="font-bold text-gray-900">{selected.brand} {selected.model} — год</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-900 bg-white"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Сброс выбора */}
      {selected.brand && !isOpen && (
        <button
          onClick={reset}
          className="mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Сбросить выбор
        </button>
      )}
    </div>
  );
}