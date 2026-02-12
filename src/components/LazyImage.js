'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LazyImage({ 
  src, 
  alt, 
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUdk'
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const imageProps = fill 
    ? { fill: true }
    : { width, height };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-100 ${className} ${
        fill ? 'w-full h-full' : ''
      }`}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      {/* Плейсхолдер */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}