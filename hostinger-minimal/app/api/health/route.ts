import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET() {
  try {
    // Simple database connectivity check
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      dbConnected: true,
      userCount,
      version: process.env.npm_package_version || '0.1.0'
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      dbConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 