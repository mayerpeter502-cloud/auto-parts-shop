'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { getProductImageUrl } from '@/lib/imageUtils';

export default function Image({ src, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(() => getProductImageUrl(src));

  const handleError = () => {
    setImgSrc(getProductImageUrl(null));
  };

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={imgSrc.startsWith('https://')}
    />
  );
}