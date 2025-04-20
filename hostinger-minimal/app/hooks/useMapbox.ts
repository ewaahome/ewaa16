'use client';

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// Don't import CSS here, we're importing it in globals.css

// دالة بسيطة للحصول على مفتاح API ونمط Mapbox
const useMapbox = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
  const mapboxStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/streets-v11';
  
  useEffect(() => {
    // Set MapBox token
    if (typeof window !== 'undefined' && mapboxToken) {
      // تعيين مفتاح API في وقت التحميل
      mapboxgl.accessToken = mapboxToken;
    }
  }, [mapboxToken]);
  
  return {
    mapboxToken,
    mapboxStyle,
    mapboxgl
  };
};

export default useMapbox; 