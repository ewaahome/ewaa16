import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Global flag to ensure we log configuration once
let hasLoggedConfig = false;

// Fallback image in case of upload failures
const FALLBACK_IMAGE = "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// تكوين Cloudinary
const configureCloudinary = () => {
  // Extract environment variables
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Validate required environment variables
  if (!cloudName || !apiKey || !apiSecret) {
    const missing = [];
    if (!cloudName) missing.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    if (!apiKey) missing.push('CLOUDINARY_API_KEY');
    if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');
    
    const errorMessage = `Missing required Cloudinary environment variables: ${missing.join(', ')}`;
    console.error(errorMessage);
    
    throw new Error(errorMessage);
  }

  if (!hasLoggedConfig) {
    console.log(`Configuring Cloudinary with cloud_name: ${cloudName}`);
    hasLoggedConfig = true;
  }
  
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
};

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    console.log('Starting upload process...');
    
    // Configure Cloudinary
    try {
      configureCloudinary();
    } catch (configError: any) {
      console.error('Cloudinary configuration failed:', configError.message);
      return NextResponse.json(
        { 
          error: 'خطأ في إعدادات Cloudinary',
          details: configError.message,
          fallback_url: FALLBACK_IMAGE
        },
        { status: 500 }
      );
    }
    
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('No file found in request');
      return NextResponse.json(
        { 
          error: 'لم يتم العثور على ملف',
          fallback_url: FALLBACK_IMAGE
        },
        { status: 400 }
      );
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    });

    // تحويل الملف إلى buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('File converted to buffer, size:', `${(buffer.length / 1024 / 1024).toFixed(2)}MB`);

    // Get the upload preset or use a default
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'property_upload';

    // رفع الصورة إلى Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        reject(new Error('Upload timed out after 20 seconds'));
      }, 20000);
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'property_images',
          upload_preset: uploadPreset,
          transformation: [
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          clearTimeout(timeout);
          
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else if (!result) {
            reject(new Error('No result from Cloudinary'));
          } else {
            console.log('Upload successful:', {
              public_id: result.public_id,
              url: result.secure_url,
              format: result.format,
              size: `${(result.bytes / 1024 / 1024).toFixed(2)}MB`
            });
            resolve(result as CloudinaryUploadResult);
          }
        }
      );

      // Handle upload stream errors
      uploadStream.on('error', (error) => {
        clearTimeout(timeout);
        console.error('Upload stream error:', error);
        reject(error);
      });

      uploadStream.end(buffer);
    });

    if (!result.secure_url) {
      throw new Error('فشل في الحصول على رابط الصورة من Cloudinary');
    }

    console.log('Upload completed successfully');
    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error: any) {
    console.error('Error in upload process:', error);
    return NextResponse.json(
      { 
        error: 'فشل في رفع الصورة',
        details: error.message || 'خطأ غير معروف',
        fallback_url: FALLBACK_IMAGE
      },
      { status: 500 }
    );
  }
} 