'use client';

import { useEffect } from 'react';
import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import Categories from "@/app/components/navbar/Categories";
import { useMockListings } from "@/app/hooks/useMockData";
import { useSearchParams } from "next/navigation";

export default function ListingsPage() {
  const { listings, isLoading } = useMockListings();
  const params = useSearchParams();
  const category = params?.get('category');
  
  if (isLoading) {
    return (
      <ClientOnly>
        <div className="h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-500">جاري التحميل...</p>
          </div>
        </div>
      </ClientOnly>
    );
  }

  // Filter listings by category if a category is selected
  const filteredListings = category 
    ? listings.filter(listing => listing.category === category)
    : listings;

  return (
    <ClientOnly>
      <Container>
        <div className="pt-4">
          <Categories />
        </div>
        <div className="pt-6">
          <h1 className="text-3xl font-bold mb-6">جميع العقارات</h1>
          {filteredListings.length === 0 ? (
            <EmptyState 
              title="لا توجد عقارات متاحة" 
              subtitle="يبدو أنه لا توجد عقارات في هذه الفئة"
            />
          ) : (
            <div 
              className="
                pt-6
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
              {filteredListings.map((listing) => (
                <ListingCard
                  currentUser={null}
                  key={listing.id}
                  data={listing}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </ClientOnly>
  );
} 