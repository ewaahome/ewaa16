'use client';

import { useSearchParams } from "next/navigation";
import Container from "./Container";
import CityCircle from "./CityCircle";
import useSaudiCities from "@/app/hooks/useSaudiCities";
import { useState, useEffect } from "react";

const CitiesSection = () => {
  const params = useSearchParams();
  const locationValue = params?.get('locationValue');
  const { getAll } = useSaudiCities();
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("CitiesSection: Loading cities...");
      const allCities = getAll();
      console.log("CitiesSection: Cities loaded:", allCities?.length || 0);
      setCities(allCities || []);
      setError(null);
    } catch (err) {
      console.error("Error loading cities:", err);
      setError(String(err));
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, [getAll]);

  if (isLoading) {
    return (
      <Container>
        <div className="pt-6 pb-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4 text-center">
            جاري تحميل المدن...
          </h2>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="pt-6 pb-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-red-500 mb-4 text-center">
            حدث خطأ أثناء تحميل المدن
          </h2>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </Container>
    );
  }

  if (!cities || cities.length === 0) {
    return (
      <Container>
        <div className="pt-6 pb-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4 text-center">
            لا توجد مدن متاحة حالياً
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col w-full">
        <div className="w-full py-4">
          <h2 className="text-xl font-semibold text-neutral-800 text-center">
            تصفح حسب المدينة
          </h2>
        </div>
        <div
          className="
            w-full
            flex 
            flex-row 
            items-center 
            justify-center
            overflow-x-auto
            gap-4
            py-4
          "
        >
          {cities.map((city) => (
            <CityCircle
              key={city.id}
              id={city.value}
              label={city.label}
              image={city.image}
              selected={locationValue === city.value}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CitiesSection; 