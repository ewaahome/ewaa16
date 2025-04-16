import { NextRequest, NextResponse } from 'next/server';
import { optimizeCloudinaryUrl } from '@/app/libs/cloudinaryHelper';

/**
 * API route to proxy Cloudinary images for better performance and error handling
 */
export async function GET(request: NextRequest) {
  try {
    // Extract the URL from the query parameter
    const { searchParams } = new URL(request.url);
    let imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return new NextResponse('Missing image URL', { status: 400 });
    }
    
    // Check if it's a Cloudinary URL and optimize it
    if (imageUrl.includes('cloudinary.com')) {
      imageUrl = optimizeCloudinaryUrl(imageUrl);
    }
    
    // Fetch the image from Cloudinary
    const imageResponse = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });
    
    // If Cloudinary returns an error, return a fallback image
    if (!imageResponse.ok) {
      // Redirect to a default placeholder image
      return NextResponse.redirect(
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
        { status: 307 }
      );
    }
    
    // Get the image buffer and content type
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    // Return the image with the correct headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse('Error processing image', { status: 500 });
  }
} 