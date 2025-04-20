import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    price,
  } = body;

  // التحقق من أن المستخدم هو مالك العقار
  const existingListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    }
  });

  if (!existingListing) {
    return NextResponse.error();
  }

  if (existingListing.userId !== currentUser.id) {
    return NextResponse.error();
  }

  // تحديث العقار
  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(imageSrc && { imageSrc }),
      ...(price && { price: parseInt(price, 10) }),
    }
  });

  return NextResponse.json(updatedListing);
}
