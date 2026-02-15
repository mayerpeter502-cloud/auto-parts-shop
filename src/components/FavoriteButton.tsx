import React from 'react';
import { Heart } from 'lucide-react';

export const FavoriteButton = ({ isFavorite, onClick, className = '' }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${className} ${
        isFavorite 
          ? 'bg-red-50 text-red-500' 
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-current' : ''}`} 
      />
    </button>
  );
};