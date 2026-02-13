// Утилиты для изображений с fallback на Unsplash

const UNSPLASH_IMAGES = {
  oil: 'https://images.unsplash.com/photo-1605218427368-35b0f996d5e1?w=400&h=400&fit=crop',
  filter: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
  brake: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=400&fit=crop',
  battery: 'https://images.unsplash.com/photo-1619641442634-2132e273a4f3?w=400&h=400&fit=crop',
  spark: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
};

export function getProductImageUrl(src, category = 'default') {
  // Если src внешний URL — используем его
  if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
    return src;
  }
  
  // Если src локальный путь — пробуем определить категорию
  if (src && src.startsWith('/products/')) {
    const filename = src.toLowerCase();
    const key = Object.keys(UNSPLASH_IMAGES).find(k => filename.includes(k));
    return UNSPLASH_IMAGES[key] || UNSPLASH_IMAGES.default;
  }
  
  // Fallback по категории
  const key = Object.keys(UNSPLASH_IMAGES).find(k => 
    category.toLowerCase().includes(k)
  );
  return UNSPLASH_IMAGES[key] || UNSPLASH_IMAGES.default;
}