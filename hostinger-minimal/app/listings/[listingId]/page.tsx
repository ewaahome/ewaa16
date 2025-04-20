/**
 * @deprecated This file is maintained for backward compatibility. 
 * Please use the modular version at app/modules/listings/[listingId]/page.tsx instead.
 */

import { redirect } from 'next/navigation';

interface IParams {
  listingId?: string;
}

export default function ListingPage({ params }: { params: IParams }) {
  // Perform a redirect to the new modular route
  redirect(`/modules/listings/${params.listingId}`);
}
