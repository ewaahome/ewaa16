'use client';

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import PropertyImage from "../PropertyImage";

// قاموس ترجمة فئات العقارات
const categoryTranslations: { [key: string]: string } = {
  'Beach': 'شاطئ',
  'Windmills': 'طواحين الهواء',
  'Modern': 'حديث',
  'Countryside': 'ريفي',
  'Pools': 'مسابح',
  'Islands': 'جزر',
  'Lake': 'بحيرة',
  'Skiing': 'تزلج',
  'Castles': 'قلاع',
  'Caves': 'كهوف',
  'Camping': 'تخييم',
  'Arctic': 'قطبي',
  'Desert': 'صحراء',
  'Barns': 'أكواخ',
  'Lux': 'فاخر',
  'Chalets': 'شاليهات',
  'Apartments': 'شقق',
  'Villas': 'فلل',
};

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    // تنسيق التاريخ بالعربية
    return `${format(start, 'dd', { locale: ar })} ${format(start, 'MMMM', { locale: ar })} - ${format(end, 'dd', { locale: ar })} ${format(end, 'MMMM', { locale: ar })}`;
  }, [reservation]);

  // ترجمة فئة العقار إن وجدت
  const translatedCategory = useMemo(() => {
    if (!data.category) return '';
    return categoryTranslations[data.category] || data.category;
  }, [data.category]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 sm:gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <PropertyImage
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc || '/images/placeholder.jpg'}
            alt={data.title || 'Listing'}
            priority
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-medium text-sm sm:text-base text-neutral-900 line-clamp-1 mt-1 sm:mt-2 text-center">
          {data.title || 'عقار بدون عنوان'}
        </div>
        <div className="font-light text-2xs sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 text-center">
          {location?.arabicLabel || location?.label || ''}{location?.region ? ` - ${location?.region}` : ''}
        </div>
        <div className="font-light text-2xs sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 text-center">
          {reservationDate || translatedCategory}
        </div>
        <div className="flex flex-row items-center gap-1 font-semibold mt-1 sm:mt-2 justify-center">
          <div className="text-rose-500 text-sm sm:text-base">
            ر.س. {price}
          </div>
          {!reservation && (
            <div className="font-light text-neutral-600 text-2xs sm:text-sm">/ الليلة</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;