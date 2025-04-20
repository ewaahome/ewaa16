import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    // Test basic connection
    await prisma.$connect();
    
    // Ping the database to verify connectivity
    const pingResult = await prisma.$runCommandRaw({ ping: 1 });
    
    // Check if we can query data
    const dbStatus = {
      connected: true,
      ping: pingResult,
      usersCount: await prisma.user.count(),
      listingsCount: await prisma.listing.count(),
      reservationsCount: await prisma.reservation.count(),
      timestamp: new Date().toISOString()
    };
    
    // Disconnect properly
    await prisma.$disconnect();
    
    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      details: dbStatus
    });
  } catch (error: any) {
    console.error("Database test failed:", error);
    
    // Attempt to disconnect even if there was an error
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error during disconnect:", disconnectError);
    }
    
    return NextResponse.json({
      status: "error",
      message: "Database connection failed",
      error: error.message || "Unknown error",
      code: error.code,
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
    }, { status: 500 });
  }
} 