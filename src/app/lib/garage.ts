import { UserCar } from '@/types';

const GARAGE_STORAGE_KEY = 'autoparts_garage';

export const garageApi = {
  // Добавить авто в гараж
  addCar(car: Omit<UserCar, 'id'>): UserCar {
    if (typeof window === 'undefined') throw new Error('Server side');
    
    const garage = this.getAll();
    const newCar: UserCar = {
      ...car,
      id: Date.now().toString()
    };
    
    garage.push(newCar);
    localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(garage));
    return newCar;
  },

  // Получить все авто
  getAll(): UserCar[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(GARAGE_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // Удалить авто
  removeCar(carId: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const garage = this.getAll();
    const filtered = garage.filter(car => car.id !== carId);
    
    if (filtered.length === garage.length) return false;
    
    localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Установить как основное авто
  setDefault(carId: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const garage = this.getAll();
    const car = garage.find(c => c.id === carId);
    
    if (!car) return false;
    
    // Перемещаем выбранное авто в начало списка
    const updated = [car, ...garage.filter(c => c.id !== carId)];
    localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // Получить основное авто (первое в списке)
  getDefault(): UserCar | null {
    const garage = this.getAll();
    return garage.length > 0 ? garage[0] : null;
  },

  // Проверить совместимость товара с авто из гаража
  isCompatible(productId: string, car: UserCar): boolean {
    // Здесь логика проверки совместимости
    // Можно расширить позже
    return true;
  }
};