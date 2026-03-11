"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserCar } from '@/types';
import { garageApi } from '../app/lib/garage';

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
    // Загружаем гараж при монтировании
    const initialCars = garageApi.getAll();
    setCars(initialCars);
    setIsLoading(false);
  }, []);

  const addCar = (car: Omit<UserCar, 'id'>) => {
    const newCar = garageApi.addCar(car);
    setCars(prev => [...prev, newCar]);
    return newCar;
  };

  const removeCar = (carId: string) => {
    const success = garageApi.removeCar(carId);
    if (success) {
      setCars(prev => prev.filter(car => car.id !== carId));
    }
    return success;
  };

  const setDefaultCar = (carId: string) => {
    const success = garageApi.setDefault(carId);
    if (success) {
      const updated = garageApi.getAll();
      setCars(updated);
    }
    return success;
  };

  // Находим автомобиль по умолчанию (у которого isDefault: true)
  const defaultCar = cars.find(car => car.isDefault) || (cars.length > 0 ? cars[0] : null);

  return (
    <GarageContext.Provider value={{ 
      cars, 
      defaultCar,
      addCar, 
      removeCar, 
      setDefaultCar, 
      isLoading 
    }}>
      {children}
    </GarageContext.Provider>
  );
}

// ДОБАВЛЕНО: Экспорт хука для использования в компонентах
export function useGarage() {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}