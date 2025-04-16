'use client';

import Select from 'react-select'
import { SaudiCityValue } from '@/app/types';
import useSaudiCities from '@/app/hooks/useSaudiCities';

interface CitySelectProps {
  value?: SaudiCityValue;
  onChange: (value: SaudiCityValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useSaudiCities();

  return ( 
    <div>
      <Select
        placeholder="اختر المدينة"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value: any) => onChange(value as SaudiCityValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div className="w-8 h-8 relative overflow-hidden rounded-full">
              <img 
                src={option.image} 
                alt={option.label}
                className="object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div>
              {option.label}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme: any) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}

export default CitySelect; 