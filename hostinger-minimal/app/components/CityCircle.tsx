'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";
import qs from 'query-string';

interface CityCircleProps {
  id: string;
  label: string;
  image: string;
  selected?: boolean;
}

const CityCircle: React.FC<CityCircleProps> = ({
  id,
  label,
  image,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: id
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    router.push(url);
  }, [id, router, params]);

  // تحديد ما إذا كانت الصورة خارجية أو محلية
  const isExternalImage = image.startsWith('http');

  return (
    <div 
      onClick={handleClick}
      className="
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        cursor-pointer
        transition
        transform
        hover:scale-105
      "
    >
      <div 
        className={`
          relative
          rounded-full 
          overflow-hidden
          w-24
          h-24
          md:w-28
          md:h-28
          lg:w-32
          lg:h-32
          transition
          duration-300
          border-2
          ${selected ? 'border-black shadow-lg' : 'border-neutral-200'}
          hover:border-black
          hover:shadow-md
        `}
      >
        {isExternalImage ? (
          <img 
            src={image}
            alt={label}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image 
            fill
            alt={label}
            src={image}
            className="object-cover"
          />
        )}
      </div>
      <div className={`
        font-medium 
        text-sm
        md:text-base
        transition
        ${selected ? 'text-black' : 'text-neutral-600'}
        hover:text-black
      `}>
        {label}
      </div>
    </div>
  );
}

export default CityCircle; 