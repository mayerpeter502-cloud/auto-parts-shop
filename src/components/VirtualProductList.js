'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import ProductCardOptimized from './ProductCardOptimized';

const ITEM_HEIGHT = 380; // Высота карточки в grid
const ITEMS_PER_ROW = 4; // Десктоп
const BUFFER_SIZE = 2; // Дополнительные строки для плавности

export default function VirtualProductList({ 
  products, 
  favorites, 
  compare,
  onToggleFavorite,
  onToggleCompare,
  onAddToCart,
  onQuickView
}) {
  const containerRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const [containerWidth, setContainerWidth] = useState(0);

  // Определение количества колонок
  const getItemsPerRow = useCallback(() => {
    if (containerWidth < 640) return 1; // mobile
    if (containerWidth < 768) return 2; // sm
    if (containerWidth < 1024) return 3; // md
    return 4; // lg+
  }, [containerWidth]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemsPerRow = getItemsPerRow();
      const rowHeight = ITEM_HEIGHT;
      
      const startRow = Math.floor(scrollTop / rowHeight);
      const visibleRows = Math.ceil(container.clientHeight / rowHeight);
      
      const start = Math.max(0, (startRow - BUFFER_SIZE) * itemsPerRow);
      const end = Math.min(
        products.length,
        (startRow + visibleRows + BUFFER_SIZE) * itemsPerRow
      );

      setVisibleRange({ start, end });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [products.length, getItemsPerRow]);

  const itemsPerRow = getItemsPerRow();
  const totalRows = Math.ceil(products.length / itemsPerRow);
  const totalHeight = totalRows * ITEM_HEIGHT;

  const visibleProducts = products.slice(visibleRange.start, visibleRange.end);
  const offsetY = Math.floor(visibleRange.start / itemsPerRow) * ITEM_HEIGHT;

  return (
    <div 
      ref={containerRef}
      className="overflow-auto max-h-[80vh]"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          className="grid gap-4 px-4 absolute w-full"
          style={{ 
            top: offsetY,
            gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`
          }}
        >
          {visibleProducts.map((product) => (
            <ProductCardOptimized
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              isInCompare={compare.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCompare={onToggleCompare}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}