'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import EditPropertyModal from "@/app/components/modals/EditPropertyModal";

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const editPropertyModal = useEditPropertyModal();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('تم حذف العقار');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error || 'حدث خطأ ما');
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  const onEdit = useCallback((listing: SafeListing) => {
    editPropertyModal.onOpen({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      imageSrc: listing.imageSrc,
      price: listing.price
    });
  }, [editPropertyModal]);

  return ( 
    <Container>
      <Heading
        title="عقاراتي"
        subtitle="قائمة بالعقارات التي قمت بنشرها"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <div key={listing.id} className="col-span-1">
            <ListingCard
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="حذف العقار"
              currentUser={currentUser}
            />
            <div className="mt-2">
              <button
                onClick={() => onEdit(listing)}
                className="
                  w-full
                  bg-white
                  border
                  border-black
                  text-black
                  font-semibold
                  py-2
                  rounded-lg
                  hover:opacity-80
                  transition
                "
              >
                تعديل العقار
              </button>
            </div>
          </div>
        ))}
      </div>
      {editPropertyModal.listingData && (
        <EditPropertyModal
          listingId={editPropertyModal.listingData.id}
          title={editPropertyModal.listingData.title}
          description={editPropertyModal.listingData.description}
          imageSrc={editPropertyModal.listingData.imageSrc}
          price={editPropertyModal.listingData.price}
        />
      )}
    </Container>
   );
}
 
export default PropertiesClient;