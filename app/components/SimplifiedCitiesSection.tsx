'use client';

import Container from "./Container";
import Link from "next/link";

const SimplifiedCitiesSection = () => {
  // Hardcoded cities to ensure display even if the hook fails
  const cities = [
    { id: 'riyadh', label: 'الرياض', value: 'riyadh' },
    { id: 'jeddah', label: 'جدة', value: 'jeddah' },
    { id: 'makkah', label: 'مكة', value: 'makkah' },
    { id: 'madinah', label: 'المدينة', value: 'madinah' },
    { id: 'dammam', label: 'الدمام', value: 'dammam' },
  ];

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
            <Link
              key={city.id}
              href={`/?locationValue=${city.value}`}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <div 
                className="
                  relative
                  rounded-full 
                  overflow-hidden
                  w-20
                  h-20
                  md:w-24
                  md:h-24
                  lg:w-28
                  lg:h-28
                  transition
                  duration-300
                  border-2
                  border-neutral-200
                  hover:border-black
                  hover:shadow-md
                  bg-neutral-100
                  flex
                  items-center
                  justify-center
                "
              >
                <div className="text-2xl font-bold text-neutral-800">{city.label.charAt(0)}</div>
              </div>
              <div className="font-medium text-sm md:text-base transition text-neutral-600 hover:text-black">
                {city.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default SimplifiedCitiesSection; 