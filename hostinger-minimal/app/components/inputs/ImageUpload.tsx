'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { TbPhotoPlus } from 'react-icons/tb';
import axios from 'axios';

// Default fallback image that's reliably accessible
const DEFAULT_IMAGE = "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  // Use the default image if the provided value is empty or references the missing image
  const initialValue = value && !value.includes("default_property_image.jpg") ? value : DEFAULT_IMAGE;
  
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(initialValue);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");
      
      // التحقق من نوع وحجم الملف
      if (!file.type.startsWith('image/')) {
        throw new Error('الملف المختار ليس صورة');
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        throw new Error('حجم الصورة كبير جداً. الحد الأقصى هو 5 ميجابايت');
      }
      
      // إنشاء معاينة للصورة المختارة
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      
      // رفع الصورة إلى الخادم
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Starting upload to server...');
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });
      
      console.log('Server response:', response.data);
      
      if (!response.data.secure_url) {
        throw new Error(response.data.error || 'فشل في رفع الصورة');
      }
      
      // استخدام URL الصورة من Cloudinary
      const cloudinaryUrl = response.data.secure_url;
      console.log('Upload successful, URL:', cloudinaryUrl);
      onChange(cloudinaryUrl);
      setPreview(cloudinaryUrl);
      setRetryCount(0); // إعادة تعيين عداد المحاولات عند النجاح
      
    } catch (error: any) {
      console.error("Error uploading image:", error);
      const errorMessage = error.response?.data?.error || error.message || "فشل في رفع الصورة";
      setError(errorMessage);
      // Don't clear the preview on error, keep the default
      setPreview(DEFAULT_IMAGE);
      onChange(DEFAULT_IMAGE);
      
      // إعادة المحاولة إذا كان الخطأ من الخادم وعدد المحاولات أقل من 3
      if (error.response?.status === 500 && retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          if (fileInputRef.current?.files?.length) {
            const event = { target: { files: fileInputRef.current.files } } as React.ChangeEvent<HTMLInputElement>;
            handleManualUpload(event);
          }
        }, 1000 * retryCount); // زيادة وقت الانتظار مع كل محاولة
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  // Handle image load error
  const handleImageError = () => {
    console.log("Image failed to load, using default");
    setPreview(DEFAULT_IMAGE);
    onChange(DEFAULT_IMAGE);
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          <p className="text-sm">{error}</p>
          {retryCount > 0 && (
            <p className="text-xs mt-1">جاري إعادة المحاولة ({retryCount}/3)...</p>
          )}
        </div>
      )}
      
      <div
        onClick={handleClick}
        className={`
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed 
          border-2 
          p-20 
          border-neutral-300
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
          ${isUploading ? 'opacity-50' : ''}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleManualUpload} 
          accept="image/*" 
          className="hidden" 
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="text-center z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p>جاري رفع الصورة...</p>
          </div>
        ) : !preview ? (
          <>
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              انقر لرفع الصورة
            </div>
          </>
        ) : null}
        
        {preview && !isUploading && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              fill 
              style={{ objectFit: 'cover' }} 
              src={preview} 
              alt="صورة العقار"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        ملاحظة: يمكنك رفع صورة بحجم أقصى 5 ميجابايت
      </p>
    </div>
  );
};

export default ImageUpload;
