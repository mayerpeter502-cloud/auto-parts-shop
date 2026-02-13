'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductImageUrl } from '@/lib/imageUtils';

export default function SmartImage({ 
  src, 
  alt, 
  fill = false,
  width = 400,
  height = 400,
  className = '',
  priority = false,
  category = 'default'
}) {
  const [imgSrc, setImgSrc] = useState(getProductImageUrl(src, category));

  const handleError = () => {
    setImgSrc(getProductImageUrl(null, category));
  };

  const props = fill 
    ? { fill: true, sizes: '(max-width: 768px) 100vw, 50vw' }
    : { width, height };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...props}
      className={className}
      onError={handleError}
      priority={priority}
      unoptimized={imgSrc.startsWith('https://')} // Для внешних URL
    />
  );
}