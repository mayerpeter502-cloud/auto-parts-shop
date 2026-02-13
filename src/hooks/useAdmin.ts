import { useAuth } from '@/contexts/AuthContext';

const ADMIN_EMAILS = ['admin@autoparts.kz']; // Добавь свои email

export const useAdmin = () => {
  const { user, profile } = useAuth();
  
  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
  
  return { isAdmin, user, profile };
};