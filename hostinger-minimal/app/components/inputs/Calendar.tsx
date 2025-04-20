'use client';

import { Range, RangeKeyDict } from 'react-date-range';
import { ar } from 'date-fns/locale';
import dynamic from 'next/dynamic';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRange = dynamic(
  () => import('react-date-range').then((mod) => mod.DateRange),
  { ssr: false }
);

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={ar}
      months={1}
      weekStartsOn={6}
      monthDisplayFormat="MMMM yyyy"
    />
  );
}

export default DatePicker;
