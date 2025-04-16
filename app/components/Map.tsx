'use client';

import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// نقل استيراد CSS إلى globals.css
// import 'mapbox-gl/dist/mapbox-gl.css';
import useMapbox from '@/app/hooks/useMapbox';

// تفادي خطأ في جانب المتصفح
if (typeof window !== 'undefined') {
  // @ts-ignore - إضافة mapboxgl إلى الـ window
  window.mapboxgl = mapboxgl;
}

interface MapProps {
  center?: number[]
}

const Map: React.FC<MapProps> = ({ center }) => {
  const { mapboxToken, mapboxStyle } = useMapbox();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // تسجيل معلومات التصحيح فقط في بيئة التطوير
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Mapbox Token:", mapboxToken?.substring(0, 10) + "...");
      console.log("Mapbox Style:", mapboxStyle);
    }
  }, [mapboxToken, mapboxStyle]);
  
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // إنشاء الخريطة بعد تحميل المكون
  useEffect(() => {
    if (!isMounted || !mapContainer.current || map.current) return;
    
    // تحقق من وجود مفتاح Mapbox
    if (!mapboxToken) {
      setError("Mapbox token not found. Please check your environment variables.");
      return;
    }
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      // استخدم النمط الافتراضي إذا كان النمط المخصص غير متوفر
      const defaultStyle = 'mapbox://styles/mapbox/streets-v11';
      const style = mapboxStyle || defaultStyle;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: style,
        center: center ? [center[1], center[0]] : [0, 51],
        zoom: center ? 5 : 2,
        attributionControl: false,
        interactive: true
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));
      
      // معالجة أخطاء تحميل النمط
      map.current.on('style.load', () => {
        console.log('Map style loaded successfully');
      });
      
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        // إذا فشل تحميل النمط، حاول تحميل النمط الافتراضي
        if (e.error && 'status' in e.error && e.error.status === 404 && map.current && style !== defaultStyle) {
          console.log('Attempting to load default style');
          map.current.setStyle(defaultStyle);
        }
      });
      
    } catch (error) {
      console.error("Error initializing map:", error);
      setError(`Error initializing map: ${error}`);
    }
  }, [isMounted, center, mapboxStyle, mapboxToken]);

  // إضافة علامة عند تغيير center
  useEffect(() => {
    if (!map.current || !center) return;

    try {
      // إزالة العلامة السابقة إن وجدت
      if (marker.current) {
        marker.current.remove();
      }

      // إضافة علامة جديدة
      marker.current = new mapboxgl.Marker({ color: '#FF5A5F' })
        .setLngLat([center[1], center[0]])
        .addTo(map.current);

      // إعادة تركيز الخريطة
      map.current.flyTo({
        center: [center[1], center[0]],
        zoom: 5,
        essential: true
      });
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  }, [center]);

  if (!isMounted) {
    return <div className="h-[35vh] rounded-lg bg-neutral-200 flex items-center justify-center">Loading map...</div>;
  }
  
  if (error) {
    return (
      <div className="h-[35vh] rounded-lg bg-neutral-200 flex items-center justify-center flex-col p-4">
        <p className="text-red-500 text-sm mb-2">Error loading map</p>
        <p className="text-neutral-600 text-xs text-center">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="h-[35vh] rounded-lg relative">
      <div 
        ref={mapContainer} 
        className="h-full w-full rounded-lg"
      />
    </div>
  );
};

export default Map;