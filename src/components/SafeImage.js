'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getOptimizedImageUrl } from '@/lib/imageUtils';

export default function SafeImage({ 
  src, 
  alt, 
  fill = false,
  width = 400,
  height = 400,
  className = '',
  priority = false,
  category = 'default'
}) {
  const [error, setError] = useState(false);

  const imageUrl = error || !src || src.startsWith('/products/')
    ? getOptimizedImageUrl(null, width, height, category)
    : src;

  const handleError = () => setError(true);

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      priority={priority}
    />
  );
}