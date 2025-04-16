'use client';

import { useSearchParams } from "next/navigation";
import Container from "./Container";
import CityCircle from "./CityCircle";
import useSaudiCities from "@/app/hooks/useSaudiCities";

const CitiesSection = () => {
  const params = useSearchParams();
  const locationValue = params?.get('locationValue');
  const { getAll } = useSaudiCities();
  
  const cities = getAll();

  return (
    <Container>
      <div className="pt-6 pb-2">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4 text-center">
          استكشف المدن السعودية
        </h2>
      </div>
      <div
        className="
          pt-2
          pb-6
          flex 
          flex-row 
          items-center 
          justify-center
          overflow-x-auto
          gap-6
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
    </Container>
  );
}

export default CitiesSection; 