'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  center?: number[];
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    [key: string]: any;
  }>;
}

const Map: React.FC<MapProps> = ({
  center = [46.6753, 24.7136], // الرياض
  zoom = 9,
  markers = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Create a default marker SVG as fallback
  const createDefaultMarker = () => {
    const svgMarker = document.createElement('div');
    svgMarker.innerHTML = `
      <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF5A5F" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;
    return svgMarker;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Set Mapbox token directly
      mapboxgl.accessToken = 'pk.eyJ1IjoibmFqaXgiLCJhIjoiY2x0MndwNjVuMHZtYzJqcno4M2E3ejlmZyJ9.8TdM1VtE4z9PnvOA21Y6-w';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center as [number, number],
        zoom: zoom,
        attributionControl: false
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        console.log('Map style loaded successfully');
      });

      map.current.on('error', (e: Error) => {
        console.error('Map error:', e);
      });
    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    try {
      // إزالة العلامات القديمة
      const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
      Array.from(existingMarkers).forEach(marker => marker.remove());

      // إضافة العلامات الجديدة
      markers.forEach((marker) => {
        if (marker.lat && marker.lng) {
          // Use our default SVG marker instead of an image that might be missing
          const el = createDefaultMarker();
          el.className = 'marker';
          el.style.width = '32px';
          el.style.height = '32px';
          el.style.cursor = 'pointer';

          new mapboxgl.Marker(el)
            .setLngLat([marker.lng, marker.lat])
            .addTo(map.current!);
        }
      });
    } catch (error) {
      console.error('Error adding markers:', error);
    }
  }, [markers, mapLoaded]);

  return (
    <div
      ref={mapContainer}
      className="h-[35vh] rounded-lg relative"
      style={{ width: '100%' }}
    />
  );
};

export default Map;