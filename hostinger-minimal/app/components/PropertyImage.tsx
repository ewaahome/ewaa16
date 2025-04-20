'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { optimizeCloudinaryUrl, getPlaceholderUrl, isDefaultCloudinaryImage } from '@/app/libs/cloudinaryHelper';

// Default fallback image - hosted on a reliable public URL
const DEFAULT_IMAGE = "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// Local placeholder for blur effect
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKYH/9k=";

interface PropertyImageProps {
  src: string;
  alt?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  height?: number;
  width?: number;
  priority?: boolean;
  onClick?: () => void;
}

const PropertyImage: React.FC<PropertyImageProps> = ({
  src,
  alt = "Property image",
  fill = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  height,
  width,
  priority = false,
  onClick
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [blurUrl, setBlurUrl] = useState<string>(BLUR_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState(true);

  // Process and optimize the image URL
  useEffect(() => {
    // Check if it's a default image that should be replaced
    if (!src || isDefaultCloudinaryImage(src)) {
      setImgSrc(DEFAULT_IMAGE);
      return;
    }

    // For Cloudinary URLs, use our proxy API
    if (src.includes('cloudinary.com')) {
      // Use our API route to proxy and optimize Cloudinary images
      const proxyUrl = `/api/cloudinary-image?url=${encodeURIComponent(src)}`;
      setImgSrc(proxyUrl);
      
      // Generate a blur placeholder for Cloudinary images
      const placeholderUrl = getPlaceholderUrl(src);
      if (placeholderUrl) {
        setBlurUrl(placeholderUrl);
      }
    } else {
      setImgSrc(src);
    }
  }, [src]);

  return (
    <div className={`relative ${fill ? 'h-full w-full' : ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        sizes={sizes}
        className={`${className} ${isLoading ? 'opacity-60 blur-sm' : 'opacity-100 blur-0'} transition-all duration-500`}
        placeholder="blur"
        blurDataURL={blurUrl}
        priority={priority}
        onError={() => {
          console.log(`Image error for ${src}, falling back to default`);
          setImgSrc(DEFAULT_IMAGE);
        }}
        onLoad={() => setIsLoading(false)}
        onClick={onClick}
        // Use Next.js image optimization for our proxy URLs
        unoptimized={false}
      />
    </div>
  );
};

export default PropertyImage; 