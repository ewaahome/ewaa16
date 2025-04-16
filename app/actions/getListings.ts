import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    // التحقق من اتصال قاعدة البيانات قبل تنفيذ الاستعلام
    try {
      await prisma.$connect();
      console.log('Connected to database in getListings');
    } catch (connectionError) {
      console.error('Failed to connect to database:', connectionError);
      throw new Error('فشل الاتصال بقاعدة البيانات');
    }

    // محاولة تنفيذ الاستعلام مع وضع حد زمني
    const listings = await Promise.race([
      prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('تجاوز وقت الاتصال بقاعدة البيانات')), 10000)
      )
    ]) as any;

    if (!listings || !Array.isArray(listings)) {
      console.error('No listings returned or invalid response format');
      return []; // Return empty array instead of throwing error
    }

    const safeListings = listings.map((listing: any) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.error('Error in getListings:', error);
    if (error.code === 'P1001' || error.message?.includes('connect')) {
      throw new Error('فشل الاتصال بقاعدة البيانات. يرجى التحقق من إعدادات الاتصال.');
    } else if (error.code === 'P2025') {
      console.log('No data found - returning empty array');
      return []; // Return empty array for "not found" errors
    } else {
      throw new Error('حدث خطأ أثناء جلب البيانات: ' + (error.message || 'خطأ غير معروف'));
    }
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting from database:', disconnectError);
    }
  }
}
