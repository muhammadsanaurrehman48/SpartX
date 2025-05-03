// src/utils/placeholder.js

// This is a utility to generate placeholder image URLs for development
export const getPlaceholderImage = (width, height, text = 'SPART-X') => {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
  };