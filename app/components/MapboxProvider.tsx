'use client';

import { useEffect } from 'react';

// This component handles loading Mapbox CSS only on the client side
const MapboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple client-side only implementation
  useEffect(() => {
    // Only run once on client
    try {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(linkElement);
    } catch (error) {
      console.error('Failed to load Mapbox CSS:', error);
    }
  }, []);

  return <>{children}</>;
};

export default MapboxProvider; 