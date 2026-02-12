'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ToastProvider';

export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const message = err.message || 'Произошла ошибка';
      setError(message);
      addToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, addToast]);

  return { data, loading, error, execute };
}

// Хук для мутаций (POST, PUT, DELETE)
export function useApiMutation(apiFunction, options = {}) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { successMessage, errorMessage } = options;

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    
    try {
      const result = await apiFunction(...args);
      if (successMessage) addToast(successMessage, 'success');
      return result;
    } catch (err) {
      const msg = errorMessage || err.message || 'Ошибка';
      addToast(msg, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, addToast, successMessage, errorMessage]);

  return { mutate, loading };
}