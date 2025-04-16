'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");
      
      // إنشاء معاينة للصورة المختارة
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      
      // إذا نجحت المعاينة، ارسل URL إلى المكون الأب
      onChange(localPreview);
    } catch (error) {
      console.error("Error handling image:", error);
      setError("فشل في معالجة الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
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
            <p>جاري تحميل الصورة...</p>
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
              onError={() => {
                setError("فشل في تحميل الصورة");
              }}
            />
          </div>
        )}
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        ملاحظة: سيتم تخزين الصورة محليًا فقط لأغراض المعاينة
      </p>
    </div>
  );
};

export default ImageUpload;
