/**
 * @deprecated This file is maintained for backward compatibility. 
 * Please use the modular version at app/modules/reservations/api/route.ts instead.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Forward the request to the modular route
  const modularResponse = await fetch(new URL('/api/modules/reservations', request.url), {
    method: 'POST',
    headers: request.headers,
    body: request.body
  });
  
  return modularResponse;
}
