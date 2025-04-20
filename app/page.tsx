import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import CitiesSection from "@/app/components/CitiesSection";
import SimplifiedCitiesSection from "@/app/components/SimplifiedCitiesSection";
import Categories from "@/app/components/navbar/Categories";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import { Suspense } from "react";

// إضافة خاصية revalidate لضمان تحديث البيانات
export const revalidate = 0;

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pb-10">
        {/* Cities Section */}
        <div className="mb-8">
          <Container>
            <div className="pt-8 pb-4">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6 text-center">
                تصفح حسب المدينة
              </h2>
            </div>
          </Container>
          <Suspense fallback={<SimplifiedCitiesSection />}>
            <CitiesSection />
          </Suspense>
        </div>
        
        {/* Categories Section */}
        <div className="pt-6">
          <Categories />
        </div>
      </div>
      
      {/* Listings Grid */}
      <div 
        className="
          pt-10
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
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </ClientOnly>
  )
}

export default Home;
