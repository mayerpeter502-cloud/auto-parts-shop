"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Определяем интерфейс прямо здесь для надежности сборки
export interface UserCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate?: string;
  isDefault?: boolean; // Добавили это свойство
}

interface GarageContextType {
  cars: UserCar[];
  defaultCar: UserCar | null;
  addCar: (car: Omit<UserCar, 'id'>) => UserCar;
  removeCar: (carId: string) => boolean;
  setDefaultCar: (carId: string) => boolean;
  isLoading: boolean;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<UserCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('autoparts_garage');
    if (stored) {
      setCars(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const saveToStorage = (updatedCars: UserCar[]) => {
    localStorage.setItem('autoparts_garage', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const addCar = (carData: Omit<UserCar, 'id'>) => {
    const newCar: UserCar = {
      ...carData,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [...cars, newCar];
    saveToStorage(updated);
    return newCar;
  };

  const removeCar = (carId: string) => {
    const updated = cars.filter(c => c.id !== carId);
    saveToStorage(updated);
    return true;
  };

  const setDefaultCar = (carId: string) => {
    const updated = cars.map(c => ({
      ...c,
      isDefault: c.id === carId
    }));
    saveToStorage(updated);
    return true;
  };

  const defaultCar = cars.find(c => c.isDefault) || (cars.length > 0 ? cars[0] : null);

  return (
    <GarageContext.Provider value={{ cars, defaultCar, addCar, removeCar, setDefaultCar, isLoading }}>
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}