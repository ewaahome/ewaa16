'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useSaudiCities from '@/app/hooks/useSaudiCities';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useSaudiCities();

  const locationValue = params?.get('locationValue'); 
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'أي مدينة';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} يوم`;
    }

    return 'أي أسبوع'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ضيف`;
    }

    return 'إضافة ضيوف';
  }, [guestCount]);

  return ( 
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-1
        md:py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-xs
            md:text-sm 
            font-semibold 
            px-3
            md:px-6
            truncate
          "
        >
          {locationLabel}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-xs
            md:text-sm 
            font-semibold 
            px-3
            md:px-6 
            border-x-[1px] 
            flex-1 
            text-center
            whitespace-nowrap
          "
        >
          {durationLabel}
        </div>
        <div 
          className="
            text-xs
            md:text-sm 
            pl-3
            md:pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-1
            md:gap-3
          "
        >
          <div className="hidden sm:block truncate">{guestLabel}</div>
          <div 
            className="
              p-1.5 
              md:p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;