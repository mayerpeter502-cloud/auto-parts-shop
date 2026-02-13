'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: { email: string; uid: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; uid: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Локальная авторизация
    if (email === 'admin@autoparts.kz' && password === 'admin123') {
      const adminUser = { email, uid: 'admin-1' };
      setUser(adminUser);
      setProfile({
        uid: 'admin-1',
        email,
        displayName: 'Админ',
        cars: [],
        addresses: [],
        favorites: [],
        ordersCount: 0
      });
      localStorage.setItem('user', JSON.stringify(adminUser));
    } else {
      throw new Error('Неверный логин или пароль');
    }
  };

  const signInAsAdmin = () => {
    const adminUser = { email: 'admin@autoparts.kz', uid: 'admin-1' };
    setUser(adminUser);
    setProfile({
      uid: 'admin-1',
      email: 'admin@autoparts.kz',
      displayName: 'Админ',
      cars: [],
      addresses: [],
      favorites: [],
      ordersCount: 0
    });
    localStorage.setItem('user', JSON.stringify(adminUser));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signInAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};