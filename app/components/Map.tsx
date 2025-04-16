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

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/streets-v11',
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

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // إزالة العلامات القديمة
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    Array.from(existingMarkers).forEach(marker => marker.remove());

    // إضافة العلامات الجديدة
    markers.forEach((marker) => {
      if (marker.lat && marker.lng) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundImage = 'url(/images/marker.png)';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';

        new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .addTo(map.current!);
      }
    });
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