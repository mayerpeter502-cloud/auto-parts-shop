import { useAuth } from '@/contexts/AuthContext';

const ADMIN_EMAILS = ['admin@autoparts.kz'];

export const useAdmin = () => {
  const { user } = useAuth();

  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
  return { isAdmin, user };
};
