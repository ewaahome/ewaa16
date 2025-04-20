'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBuildingSkyscraper, TbBed, TbBrandAirbnb, TbPool } from 'react-icons/tb';
import { 
  GiFarmTractor,
  GiCampingTent,
  GiVillage,
  GiIsland
} from 'react-icons/gi';
import { FaHotel, FaHome } from 'react-icons/fa';
import { BiBuildingHouse } from 'react-icons/bi';
import { MdApartment, MdOutlineVilla, MdOutlineCabin } from 'react-icons/md';
import { useState } from 'react';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'شقق',
    icon: MdApartment,
    description: 'شقة سكنية مفروشة للإيجار',
  },
  {
    label: 'استوديو',
    icon: BiBuildingHouse,
    description: 'استوديو مفروش للإيجار',
  },
  {
    label: 'فلل',
    icon: MdOutlineVilla,
    description: 'فيلا فاخرة للإيجار'
  },
  {
    label: 'غرف',
    icon: TbBed,
    description: 'غرفة مفروشة للإيجار'
  },
  {
    label: 'شاليهات',
    icon: TbPool,
    description: 'شاليه مع مسبح خاص للإيجار'
  },
  {
    label: 'استراحات',
    icon: MdOutlineCabin,
    description: 'استراحة للإيجار اليومي'
  },
  {
    label: 'منتجعات',
    icon: FaHotel,
    description: 'منتجع فندقي فاخر'
  },
  {
    label: 'جزر',
    icon: GiIsland,
    description: 'إقامة على جزيرة خاصة'
  },
  {
    label: 'قرى',
    icon: GiVillage,
    description: 'إقامة في قرية ريفية'
  },
  {
    label: 'مزارع',
    icon: GiFarmTractor,
    description: 'مزرعة للإيجار'
  },
  {
    label: 'مخيمات',
    icon: GiCampingTent,
    description: 'مخيم للإيجار'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const [isLoading, setIsLoading] = useState(false);

  if (!isMainPage) {
    return null;
  }

  // Add error handling if categories fails to load
  if (isLoading) {
    return (
      <Container>
        <div className="pt-4 pb-4 flex flex-col items-center">
          <div className="text-neutral-500">جاري تحميل التصنيفات...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-4 pb-2">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4 text-center">
          تصفح حسب نوع الإقامة
        </h2>
      </div>
      <div
        className="
          pt-0
          pb-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.length > 0 ? (
          categories.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))
        ) : (
          <div className="text-center text-neutral-500">
            لا توجد تصنيفات متاحة حالياً
          </div>
        )}
      </div>
    </Container>
  );
}
 
export default Categories;