import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// المفاتيح الاحتياطية - يفضل استخدام متغيرات البيئة
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dzwkeydij";
const API_KEY = process.env.CLOUDINARY_API_KEY || "261241242864329";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "KS0GJUBWc5m5gyMXLC2yPPozVuA";

// تكوين Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
  
  // التحقق من توفر مفتاح API
  if (!API_KEY) {
    console.error('Cloudinary API Key is missing');
    return NextResponse.json(
      { error: 'Cloudinary API Key is required' },
      { status: 500 }
    );
  }

  // التحقق من توفر مفتاح السر
  if (!API_SECRET) {
    console.error('Cloudinary API Secret is missing');
    return NextResponse.json(
      { error: 'Cloudinary API Secret is required' },
      { status: 500 }
    );
  }
  
  try {
    // إنشاء توقيع
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      API_SECRET
    );
    
    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return NextResponse.json(
      { error: 'Error generating signature' },
      { status: 500 }
    );
  }
} 