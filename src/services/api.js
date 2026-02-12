const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.autoparts.kz/v1';

// Базовый fetch с обработкой ошибок
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// API методы
export const api = {
  // Товары
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/products?${query}`);
    },
    getById: (id) => fetchWithAuth(`/products/${id}`),
    search: (query) => fetchWithAuth(`/products/search?q=${encodeURIComponent(query)}`),
    getByVin: (vin) => fetchWithAuth(`/products/vin/${vin}`),
  },

  // Категории
  categories: {
    getAll: () => fetchWithAuth('/categories'),
    getById: (id) => fetchWithAuth(`/categories/${id}`),
  },

  // Бренды
  brands: {
    getAll: () => fetchWithAuth('/brands'),
    getById: (id) => fetchWithAuth(`/brands/${id}`),
  },

  // Заказы
  orders: {
    create: (data) => fetchWithAuth('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    getById: (id) => fetchWithAuth(`/orders/${id}`),
    getUserOrders: () => fetchWithAuth('/orders/my'),
  },

  // Пользователь
  auth: {
    login: (credentials) => fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    register: (data) => fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    getProfile: () => fetchWithAuth('/auth/profile'),
    updateProfile: (data) => fetchWithAuth('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },

  // VIN декодер
  vin: {
    decode: (vin) => fetchWithAuth(`/vin/decode?vin=${vin}`),
  },
};

// Моковые данные для демо (когда API недоступен)
export const mockApi = {
  products: {
    search: async (query) => {
      // Имитация задержки сети
      await new Promise(r => setTimeout(r, 300));
      
      const mockProducts = [
        { id: 1, name: 'Масло Castrol 5W-30', price: 12500, brand: 'Castrol', category: 'Масла' },
        { id: 2, name: 'Фильтр Bosch P7001', price: 2800, brand: 'Bosch', category: 'Фильтры' },
        { id: 3, name: 'Тормозные колодки Brembo', price: 18500, brand: 'Brembo', category: 'Тормоза' },
      ];
      
      return mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
    },
    
    getByVin: async (vin) => {
      await new Promise(r => setTimeout(r, 800));
      return {
        vin,
        vehicle: { brand: 'Toyota', model: 'Camry', year: 2020 },
        parts: [
          { id: 1, name: 'Масло Toyota 5W-30', price: 18500, compatibility: '100%' },
          { id: 2, name: 'Фильтр оригинальный', price: 3200, compatibility: '100%' },
        ]
      };
    }
  }
};